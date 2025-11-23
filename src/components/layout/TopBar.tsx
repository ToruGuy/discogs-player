import { Play, Pause, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Plus, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ImportDialog } from "@/components/ImportDialog";

export function TopBar() {
  return (
    <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 justify-between select-none drag-region">
      {/* Left: App Title / Home */}
      <div className="flex items-center gap-2 w-64">
        <div className="font-bold text-xl tracking-tight">Discogs Player</div>
      </div>

      {/* Center: Player Controls (The Deck) */}
      <div className="flex-1 flex items-center justify-center gap-6">
        
        {/* Track Info (Mini) */}
        <div className="flex items-center gap-3 w-64 justify-end text-right hidden md:flex">
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate max-w-[150px]">Good Song Title</span>
            <span className="text-xs text-muted-foreground truncate max-w-[150px]">Famous Artist</span>
          </div>
          <div className="h-10 w-10 bg-muted rounded-md border border-border/50" />
        </div>

        {/* Transport */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button variant="default" size="icon" className="h-12 w-12 rounded-full shadow-md">
            <Play className="h-6 w-6 ml-1" />
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Feedback */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive">
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrubber (Visual only for now) */}
        <div className="w-24 hidden lg:block">
           <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
        </div>
         <span className="text-xs font-mono text-muted-foreground hidden lg:block">0:45 / 3:19</span>

      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 w-64 justify-end">
        <ImportDialog 
          trigger={
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
        <Separator orientation="vertical" className="h-6 mx-1" />
         <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

