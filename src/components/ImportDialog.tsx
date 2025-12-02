import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ImportDialogProps {
  trigger?: React.ReactNode;
}

export function ImportDialog({ trigger }: ImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "validating" | "scraping" | "complete" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [stats, setStats] = useState({ success: 0, skipped: 0, errors: 0 });

  const handleValidate = async () => {
    setStatus("validating");
    // Simulate validation
    setTimeout(() => {
      if (url.includes("discogs.com")) {
        setCollectionName("Hard Wax Berlin");
        setStatus("idle");
      } else {
        setStatus("error");
      }
    }, 1000);
  };

  const handleStartImport = async () => {
    setStatus("scraping");
    setProgress(0);
    setStats({ success: 0, skipped: 0, errors: 0 });

    // Simulate scraping progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("complete");
          setStats({ success: 142, skipped: 8, errors: 2 });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

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
          {collectionName && status !== "error" && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{collectionName}</div>
                  <div className="text-sm text-muted-foreground">~12,403 items available</div>
                </div>
                <Badge variant="secondary">Shop</Badge>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                <span className="font-medium">Invalid URL</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please enter a valid Discogs seller or collection URL.
              </p>
            </div>
          )}

          {/* Scraping Progress */}
          {(status === "scraping" || status === "complete") && (
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Syncing...</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{stats.success}</div>
                  <div className="text-xs text-muted-foreground">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{stats.skipped}</div>
                  <div className="text-xs text-muted-foreground">Skipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{stats.errors}</div>
                  <div className="text-xs text-muted-foreground">Errors</div>
                </div>
              </div>

              {/* Log Console */}
              <ScrollArea className="h-[150px] w-full rounded border bg-black/90 p-3">
                <div className="space-y-1 font-mono text-xs text-green-400">
                  <div>[00:12] Connecting to Discogs...</div>
                  <div>[00:13] Fetching collection metadata...</div>
                  <div>[00:15] Found 142 items</div>
                  <div>[00:16] Scraping item 1/142...</div>
                  <div>[00:17] Scraping item 2/142...</div>
                  <div className="text-yellow-400">[00:18] Warning: No audio found for item 15</div>
                  <div>[00:19] Scraping item 3/142...</div>
                  {status === "complete" && (
                    <div className="text-green-500 font-bold">[00:45] ✓ Import complete!</div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Complete State */}
          {status === "complete" && (
            <div className="p-4 border border-green-500 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">Import Complete!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Successfully added {stats.success} items from {collectionName}
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
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleStartImport}
                disabled={!collectionName || status === "scraping"}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

