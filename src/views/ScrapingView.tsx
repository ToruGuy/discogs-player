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
import { RefreshCw, AlertCircle, CheckCircle2, PlayCircle } from "lucide-react";

const MOCK_JOBS = [
  { id: 1, source: "Hard Wax Berlin", date: "Today, 10:42 AM", status: "success", items: 142, errors: 0 },
  { id: 2, source: "Phonica Records", date: "Yesterday, 4:15 PM", status: "warning", items: 89, errors: 3 },
  { id: 3, source: "My 90s Techno", date: "2 days ago", status: "error", items: 0, errors: 1 },
  { id: 4, source: "Hard Wax Berlin", date: "3 days ago", status: "success", items: 56, errors: 0 },
];

export function ScrapingView() {
  return (
    <div className="h-full overflow-y-auto p-6 pb-safe">
      <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scraper History</h1>
          <p className="text-muted-foreground text-sm">Monitor your sync jobs and system health.</p>
        </div>
        <Button variant="secondary" className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Run Manual Sync
        </Button>
      </div>

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
            {MOCK_JOBS.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  {job.status === "success" && (
                    <Badge variant="outline" className="border-green-500 text-green-500 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Success
                    </Badge>
                  )}
                   {job.status === "warning" && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500 gap-1">
                        <AlertCircle className="h-3 w-3" /> Warning
                    </Badge>
                  )}
                   {job.status === "error" && (
                    <Badge variant="outline" className="border-red-500 text-red-500 gap-1">
                        <AlertCircle className="h-3 w-3" /> Failed
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">{job.source}</TableCell>
                <TableCell className="text-muted-foreground">{job.date}</TableCell>
                <TableCell>
                    {job.items} <span className="text-muted-foreground text-xs ml-1">({job.errors} errors)</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                    <RefreshCw className="h-3 w-3" /> Rescrape
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
}

