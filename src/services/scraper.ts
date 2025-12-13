import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export interface ScrapeProgress {
  phase: "inventory" | "enrichment";
  current: number;
  total: number;
  batch_info?: string;
}

export interface ScrapeStarted {
  seller: string;
  limit?: number;
}

export interface ScrapeItemSaved {
  release_id: number;
  title: string;
}

export interface ScrapeError {
  message: string;
}

export interface ScrapeResult {
  albums_added: number;
  albums_updated: number;
  total_items: number;
}

export interface ScrapeJob {
  id: string;
  seller: string;
  startedAt: Date;
  completedAt?: Date;
  status: "running" | "completed" | "error" | "cancelled";
  progress?: ScrapeProgress;
  result?: ScrapeResult;
  error?: string;
  logs: string[];
}

/**
 * Extract seller username from Discogs URL
 * Supports formats:
 * - https://www.discogs.com/seller/{seller}/profile
 * - https://www.discogs.com/user/{seller}/collection
 */
export function extractSellerFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    
    // Check for seller profile: /seller/{seller}/profile
    const sellerIndex = pathParts.indexOf("seller");
    if (sellerIndex !== -1 && pathParts[sellerIndex + 1]) {
      return pathParts[sellerIndex + 1];
    }
    
    // Check for user collection: /user/{user}/collection
    const userIndex = pathParts.indexOf("user");
    if (userIndex !== -1 && pathParts[userIndex + 1]) {
      return pathParts[userIndex + 1];
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Start a scrape job
 */
export async function startScrape(
  seller: string,
  limit?: number,
  batchSize?: number
): Promise<ScrapeResult> {
  return await invoke<ScrapeResult>("start_scrape", {
    seller,
    limit,
    batch_size: batchSize,
  });
}

/**
 * Cancel the current scrape job
 */
export async function cancelScrape(): Promise<void> {
  return await invoke<void>("cancel_scrape");
}

/**
 * Set up event listeners for scraper events
 */
export function setupScraperListeners(
  callbacks: {
    onStarted?: (data: ScrapeStarted) => void;
    onProgress?: (data: ScrapeProgress) => void;
    onItemSaved?: (data: ScrapeItemSaved) => void;
    onError?: (data: ScrapeError) => void;
    onCompleted?: (data: ScrapeResult) => void;
  }
): () => void {
  const unlistenPromises: Promise<() => void>[] = [];

  if (callbacks.onStarted) {
    unlistenPromises.push(
      listen<ScrapeStarted>("scraper:started", (event) => {
        callbacks.onStarted?.(event.payload);
      })
    );
  }

  if (callbacks.onProgress) {
    unlistenPromises.push(
      listen<ScrapeProgress>("scraper:progress", (event) => {
        callbacks.onProgress?.(event.payload);
      })
    );
  }

  if (callbacks.onItemSaved) {
    unlistenPromises.push(
      listen<ScrapeItemSaved>("scraper:item_saved", (event) => {
        callbacks.onItemSaved?.(event.payload);
      })
    );
  }

  if (callbacks.onError) {
    unlistenPromises.push(
      listen<ScrapeError>("scraper:error", (event) => {
        callbacks.onError?.(event.payload);
      })
    );
  }

  if (callbacks.onCompleted) {
    unlistenPromises.push(
      listen<ScrapeResult>("scraper:completed", (event) => {
        callbacks.onCompleted?.(event.payload);
      })
    );
  }

  // Return cleanup function that unlistens all
  return () => {
    Promise.all(unlistenPromises).then((unlisteners) => {
      unlisteners.forEach((unlisten) => unlisten());
    });
  };
}
