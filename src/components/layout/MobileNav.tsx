import { useState } from "react";
import { Disc, Heart, Library, Settings, Activity, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Disc, label: "Digging", path: "/" },
    { icon: Heart, label: "The Bag", path: "/liked" },
    { icon: Library, label: "Collections", path: "/collections" },
    { icon: Activity, label: "Scraper", path: "/scraping" },
  ];

  const sources = [
    { id: 1, name: "Hard Wax Berlin" },
    { id: 2, name: "Phonica Records" },
    { id: 3, name: "My 90s Techno" },
  ];

  // Close sheet when navigating
  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0 safe-area-inset">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100%-60px)]">
          {/* Main Navigation */}
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground active:bg-muted"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Sources */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="mb-3 px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Sources
            </h3>
            <div className="space-y-1">
              {sources.map((source) => (
                <NavLink
                  key={source.id}
                  to={`/collection/${source.id}`}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block w-full text-left rounded-md px-4 py-3 text-base transition-colors ${
                      isActive
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground active:bg-muted"
                    }`
                  }
                >
                  <div className="truncate">{source.name}</div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="p-4 border-t mt-auto">
            <NavLink to="/settings" onClick={handleNavClick}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "outline"}
                  className="w-full justify-start gap-3 h-12 text-base"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              )}
            </NavLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

