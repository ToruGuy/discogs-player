import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useScraper } from "@/hooks/useScraper";
import { useData } from "@/context/DataContext";

interface ImportDialogProps {
  trigger?: React.ReactNode;
}

export function ImportDialog({ trigger }: ImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { jobState, startScrapeFromUrl, cancelScrape, resetJobState, extractSellerFromUrl } = useScraper();
  const { refresh } = useData();

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setUrl("");
      setSellerName(null);
      setValidationError(null);
      if (!jobState.isRunning) {
        resetJobState();
      }
    }
  }, [open, jobState.isRunning, resetJobState]);

  // Refresh data when scrape completes
  useEffect(() => {
    if (jobState.result && !jobState.isRunning) {
      refresh();
    }
  }, [jobState.result, jobState.isRunning, refresh]);

  const handleValidate = () => {
    setValidationError(null);
    const seller = extractSellerFromUrl(url);
    if (seller) {
      setSellerName(seller);
    } else {
      setValidationError("Invalid Discogs URL. Please provide a seller profile or collection URL.");
      setSellerName(null);
    }
  };

  const handleStartImport = async () => {
    if (!sellerName) return;
    
    try {
      await startScrapeFromUrl(url);
    } catch (error) {
      // Error is already handled by the hook (toast + state)
      console.error("Failed to start scrape:", error);
    }
  };

  const handleCancel = async () => {
    if (jobState.isRunning) {
      await cancelScrape();
    }
    setOpen(false);
  };

  const progressPercent = jobState.progress
    ? Math.round((jobState.progress.current / jobState.progress.total) * 100)
    : 0;

  const status = jobState.isRunning
    ? "scraping"
    : jobState.result
    ? "complete"
    : jobState.error
    ? "error"
    : "idle";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Import Collection</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import from Discogs</DialogTitle>
          <DialogDescription>
            Add a Discogs shop or user collection to your library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Discogs URL</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://www.discogs.com/seller/HardWax/profile"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={status === "scraping"}
              />
              <Button
                variant="outline"
                onClick={handleValidate}
                disabled={!url || status === "scraping" || status === "validating"}
              >
                {status === "validating" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Validate"
                )}
              </Button>
            </div>
          </div>

          {/* Collection Info */}
          {sellerName && status !== "error" && !validationError && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{sellerName}</div>
                  {jobState.progress && (
                    <div className="text-sm text-muted-foreground">
                      {jobState.progress.total} items found
                    </div>
                  )}
                </div>
                <Badge variant="secondary">Seller</Badge>
              </div>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                <span className="font-medium">Invalid URL</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {validationError}
              </p>
            </div>
          )}

          {/* Scraper Error */}
          {jobState.error && status === "error" && (
            <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                <span className="font-medium">Scrape Failed</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {jobState.error}
              </p>
            </div>
          )}

          {/* Scraping Progress */}
          {(status === "scraping" || status === "complete") && (
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {jobState.progress?.phase === "inventory" ? "Fetching inventory..." : "Enriching releases..."}
                  </span>
                  <span className="text-muted-foreground">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                {jobState.progress && (
                  <div className="text-xs text-muted-foreground text-center">
                    {jobState.progress.current} / {jobState.progress.total} items
                  </div>
                )}
              </div>

              {/* Stats */}
              {jobState.result && (
                <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{jobState.result.albums_added}</div>
                    <div className="text-xs text-muted-foreground">Added</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{jobState.result.albums_updated}</div>
                    <div className="text-xs text-muted-foreground">Updated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground">{jobState.result.total_items}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              )}

              {/* Log Console */}
              {jobState.logs.length > 0 && (
                <ScrollArea className="h-[150px] w-full rounded border bg-black/90 p-3">
                  <div className="space-y-1 font-mono text-xs">
                    {jobState.logs.map((log, idx) => {
                      const isError = log.includes("Error") || log.includes("Failed");
                      const isWarning = log.includes("⚠️");
                      const isSuccess = log.includes("✅") || log.includes("Completed");
                      return (
                        <div
                          key={idx}
                          className={
                            isError
                              ? "text-red-400"
                              : isWarning
                              ? "text-yellow-400"
                              : isSuccess
                              ? "text-green-500 font-bold"
                              : "text-green-400"
                          }
                        >
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>
          )}

          {/* Complete State */}
          {status === "complete" && jobState.result && (
            <div className="p-4 border border-green-500 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">Import Complete!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Successfully added {jobState.result.albums_added} albums and updated {jobState.result.albums_updated} albums from {sellerName}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {status === "complete" ? (
            <Button onClick={() => setOpen(false)} className="w-full">
              Done
            </Button>
          ) : (
            <>
              {jobState.isRunning ? (
                <Button variant="destructive" onClick={handleCancel} className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Cancel Scrape
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStartImport}
                    disabled={!sellerName || status === "scraping"}
                  >
                    {status === "scraping" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      "Start Import"
                    )}
                  </Button>
                </>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

