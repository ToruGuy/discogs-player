import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";
import { PlayerOverlay } from "@/components/player/PlayerOverlay";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Header / Deck */}
      <TopBar />

      {/* Content Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area (The Crate) */}
        <main className="flex-1 overflow-hidden bg-muted/10 relative">
          {children}
        </main>

        {/* Navigation Sidebar (Right) - Hidden on mobile */}
        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </div>

      {/* Player Overlay */}
      <PlayerOverlay />
    </div>
  );
}
