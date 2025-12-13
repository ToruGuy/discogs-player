import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, AlertCircle, CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import { useScraper } from "@/hooks/useScraper";
import { ImportDialog } from "@/components/ImportDialog";
import { formatDistanceToNow } from "date-fns";

export function ScrapingView() {
  const { jobState } = useScraper();

  const currentJob = jobState.isRunning || jobState.result
    ? {
        id: "current",
        seller: jobState.seller || "Unknown",
        startedAt: jobState.startedAt,
        status: jobState.isRunning
          ? ("running" as const)
          : jobState.error
          ? ("error" as const)
          : ("completed" as const),
        progress: jobState.progress,
        result: jobState.result,
        error: jobState.error,
      }
    : null;

  return (
    <div className="h-full overflow-y-auto p-6 pb-safe">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Scraper History</h1>
            <p className="text-muted-foreground text-sm">Monitor your sync jobs and system health.</p>
          </div>
          <ImportDialog
            trigger={
              <Button variant="secondary" className="gap-2">
                <PlayCircle className="h-4 w-4" />
                Run Manual Sync
              </Button>
            }
          />
        </div>

        {currentJob && (
          <div className="mb-6 border rounded-lg bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Current Job: {currentJob.seller}</h2>
                {currentJob.startedAt && (
                  <p className="text-sm text-muted-foreground">
                    Started {formatDistanceToNow(currentJob.startedAt, { addSuffix: true })}
                  </p>
                )}
              </div>
              <div>
                {currentJob.status === "running" && (
                  <Badge variant="outline" className="border-blue-500 text-blue-500 gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" /> Running
                  </Badge>
                )}
                {currentJob.status === "completed" && (
                  <Badge variant="outline" className="border-green-500 text-green-500 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </Badge>
                )}
                {currentJob.status === "error" && (
                  <Badge variant="outline" className="border-red-500 text-red-500 gap-1">
                    <AlertCircle className="h-3 w-3" /> Failed
                  </Badge>
                )}
              </div>
            </div>

            {currentJob.progress && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">{currentJob.progress.phase}</span>
                  <span className="text-muted-foreground">
                    {currentJob.progress.current} / {currentJob.progress.total} (
                    {Math.round((currentJob.progress.current / currentJob.progress.total) * 100)}%)
                  </span>
                </div>
                <Progress
                  value={(currentJob.progress.current / currentJob.progress.total) * 100}
                  className="h-2"
                />
              </div>
            )}

            {currentJob.result && (
              <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {currentJob.result.albums_added}
                  </div>
                  <div className="text-xs text-muted-foreground">Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {currentJob.result.albums_updated}
                  </div>
                  <div className="text-xs text-muted-foreground">Updated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {currentJob.result.total_items}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            )}

            {currentJob.error && (
              <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{currentJob.error}</p>
              </div>
            )}
          </div>
        )}

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items Found</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJob ? (
                <TableRow>
                  <TableCell>
                    {currentJob.status === "running" && (
                      <Badge variant="outline" className="border-blue-500 text-blue-500 gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> Running
                      </Badge>
                    )}
                    {currentJob.status === "completed" && (
                      <Badge variant="outline" className="border-green-500 text-green-500 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Success
                      </Badge>
                    )}
                    {currentJob.status === "error" && (
                      <Badge variant="outline" className="border-red-500 text-red-500 gap-1">
                        <AlertCircle className="h-3 w-3" /> Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{currentJob.seller}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {currentJob.startedAt
                      ? formatDistanceToNow(currentJob.startedAt, { addSuffix: true })
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {currentJob.result?.total_items || currentJob.progress?.total || 0}{" "}
                    {currentJob.error && (
                      <span className="text-muted-foreground text-xs ml-1">(error)</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {currentJob.status === "completed" && (
                      <ImportDialog
                        trigger={
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                            <RefreshCw className="h-3 w-3" /> Rescrape
                          </Button>
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No scraping jobs yet. Start a new sync to see history here.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

