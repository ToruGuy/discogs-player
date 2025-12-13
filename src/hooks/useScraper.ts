import { useState, useEffect, useCallback, useRef } from "react";
import {
  startScrape,
  cancelScrape,
  setupScraperListeners,
  extractSellerFromUrl,
  type ScrapeProgress,
  type ScrapeResult,
} from "@/services/scraper";
import { toast } from "sonner";

export interface ScrapeJobState {
  isRunning: boolean;
  seller?: string;
  progress?: ScrapeProgress;
  result?: ScrapeResult;
  error?: string;
  logs: string[];
  startedAt?: Date;
}

export function useScraper() {
  const [jobState, setJobState] = useState<ScrapeJobState>({
    isRunning: false,
    logs: [],
  });
  const unlistenRef = useRef<(() => void) | null>(null);

  // Set up event listeners
  useEffect(() => {
    const cleanup = setupScraperListeners({
      onStarted: (data) => {
        setJobState((prev) => ({
          ...prev,
          isRunning: true,
          seller: data.seller,
          startedAt: new Date(),
          logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Started scraping ${data.seller}${data.limit ? ` (limit: ${data.limit})` : ""}`],
          error: undefined,
        }));
      },
      onProgress: (data) => {
        setJobState((prev) => ({
          ...prev,
          progress: data,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] ${data.phase}: ${data.current}/${data.total} (${Math.round((data.current / data.total) * 100)}%)${data.batch_info ? ` - ${data.batch_info}` : ""}`,
          ],
        }));
      },
      onItemSaved: (data) => {
        setJobState((prev) => ({
          ...prev,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] Saved: ${data.title}`,
          ],
        }));
      },
      onError: (data) => {
        setJobState((prev) => ({
          ...prev,
          error: data.message,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] ⚠️ Error: ${data.message}`,
          ],
        }));
        toast.error(data.message);
      },
      onCompleted: (data) => {
        setJobState((prev) => ({
          ...prev,
          isRunning: false,
          result: data,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] ✅ Completed! Added: ${data.albums_added}, Updated: ${data.albums_updated}, Total: ${data.total_items}`,
          ],
        }));
        toast.success(
          `Scrape completed! Added ${data.albums_added} albums, updated ${data.albums_updated}`
        );
      },
    });

    unlistenRef.current = cleanup;

    return () => {
      cleanup();
    };
  }, []);

  const startScrapeJob = useCallback(
    async (seller: string, limit?: number, batchSize?: number) => {
      try {
        setJobState({
          isRunning: true,
          seller,
          logs: [],
          startedAt: new Date(),
        });

        const result = await startScrape(seller, limit, batchSize);
        
        // If completed event didn't fire (shouldn't happen, but safety)
        if (!jobState.result) {
          setJobState((prev) => ({
            ...prev,
            isRunning: false,
            result,
          }));
        }

        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setJobState((prev) => ({
          ...prev,
          isRunning: false,
          error: errorMessage,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] ❌ Failed: ${errorMessage}`,
          ],
        }));
        toast.error(`Scrape failed: ${errorMessage}`);
        throw error;
      }
    },
    [jobState.result]
  );

  const cancelScrapeJob = useCallback(async () => {
    try {
      await cancelScrape();
      setJobState((prev) => ({
        ...prev,
        isRunning: false,
        logs: [
          ...prev.logs,
          `[${new Date().toLocaleTimeString()}] ⏹️ Cancelled by user`,
        ],
      }));
      toast.info("Scrape cancelled");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Failed to cancel: ${errorMessage}`);
    }
  }, []);

  const resetJobState = useCallback(() => {
    setJobState({
      isRunning: false,
      logs: [],
    });
  }, []);

  const startScrapeFromUrl = useCallback(
    async (url: string, limit?: number, batchSize?: number) => {
      const seller = extractSellerFromUrl(url);
      if (!seller) {
        throw new Error("Invalid Discogs URL. Please provide a seller profile or collection URL.");
      }
      return startScrapeJob(seller, limit, batchSize);
    },
    [startScrapeJob]
  );

  return {
    jobState,
    startScrape: startScrapeJob,
    startScrapeFromUrl,
    cancelScrape: cancelScrapeJob,
    resetJobState,
    extractSellerFromUrl,
  };
}
