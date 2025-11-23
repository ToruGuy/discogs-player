import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export function SettingsView() {
  const { scrapeUrl } = useData();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
        scrapeUrl(url);
        setUrl("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Settings</h1>

      <div className="space-y-6">
          {/* Source Management */}
          <Card>
              <CardHeader>
                  <CardTitle>Content Sources</CardTitle>
                  <CardDescription>Add Discogs shops or user collections to sync.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                      <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="url">Discogs URL</Label>
                          <Input 
                            id="url" 
                            placeholder="https://www.discogs.com/seller/HardWax/profile" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                      </div>
                      <Button type="submit" className="mt-auto">
                          <Plus className="mr-2 h-4 w-4" /> Add
                      </Button>
                  </form>

                  <div className="space-y-2 mt-4">
                      <div className="text-sm font-medium">Active Sources</div>
                      {/* Mock List */}
                      <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex flex-col">
                              <span className="font-medium">Hard Wax Berlin</span>
                              <span className="text-xs text-muted-foreground">Last synced: 1 hour ago</span>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                              <Trash2 className="h-4 w-4" />
                          </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex flex-col">
                              <span className="font-medium">Phonica Records</span>
                              <span className="text-xs text-muted-foreground">Last synced: 2 days ago</span>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                              <Trash2 className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              </CardContent>
          </Card>
          
          {/* App Preferences */}
          <Card>
              <CardHeader>
                  <CardTitle>Application</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center justify-between">
                      <Label>Dark Mode</Label>
                       {/* Toggle would go here */}
                       <span className="text-sm text-muted-foreground">Enabled (System)</span>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
