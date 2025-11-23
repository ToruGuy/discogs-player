import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";

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
        <main className="flex-1 overflow-y-auto bg-muted/10 relative">
          {children}
        </main>

        {/* Navigation Sidebar (Right) */}
        <RightSidebar />
      </div>
    </div>
  );
}

