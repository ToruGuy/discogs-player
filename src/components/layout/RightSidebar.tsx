import { Disc, Heart, Library, Settings, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function RightSidebar() {
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

  return (
    <div className="w-64 border-l bg-background flex flex-col h-full">
      <div className="p-4">
        <h3 className="mb-2 px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Menu
        </h3>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Separator />

      <div className="p-4 flex-1">
         <h3 className="mb-2 px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Sources
        </h3>
        <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-1 px-1">
                {sources.map((source) => (
                    <NavLink
                        key={source.id}
                        to={`/collection/${source.id}`}
                        className={({ isActive }) =>
                            `block w-full text-left rounded-md px-4 py-2 text-sm transition-colors ${
                                isActive
                                    ? "bg-secondary font-medium text-foreground"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            }`
                        }
                    >
                        <div className="truncate">{source.name}</div>
                    </NavLink>
                ))}
            </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <NavLink to="/settings">
            {({ isActive }) => (
                 <Button variant={isActive ? "secondary" : "outline"} className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
            )}
        </NavLink>
      </div>
    </div>
  );
}
