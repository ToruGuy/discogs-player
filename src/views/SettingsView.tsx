import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Activity, Key, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function SettingsView() {
  const { scrapeUrl } = useData();
  const [url, setUrl] = useState("");
  const [pingResult, setPingResult] = useState<string>("");
  const [discogsToken, setDiscogsToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
        scrapeUrl(url);
        setUrl("");
    }
  };

  const handlePing = async () => {
    try {
        const result = await invoke<string>('test_ipc_ping', { payload: 'Hello from React' });
        setPingResult(result);
    } catch (error) {
        setPingResult(`Error: ${error}`);
    }
  };

  // Load token on mount
  useEffect(() => {
    loadDiscogsToken();
  }, []);

  const loadDiscogsToken = async () => {
    try {
      const token = await invoke<string | null>('get_discogs_token');
      if (token) {
        setDiscogsToken(token);
      }
    } catch (error) {
      console.error('Failed to load Discogs token:', error);
    }
  };

  const handleSaveToken = async () => {
    try {
      await invoke('set_discogs_token', { token: discogsToken });
      setTokenSaved(true);
      toast.success('Discogs token saved successfully');
      setTimeout(() => setTokenSaved(false), 2000);
    } catch (error) {
      toast.error(`Failed to save token: ${error}`);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 pb-safe">
      <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Settings</h1>

      <div className="space-y-6">
          
          {/* Discogs API Token */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Discogs API Token
                  </CardTitle>
                  <CardDescription>
                    Your personal access token from Discogs. Get one at{" "}
                    <a 
                      href="https://www.discogs.com/settings/developers" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      discogs.com/settings/developers
                    </a>
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discogs-token">Token</Label>
                    <div className="flex gap-2">
                      <Input
                        id="discogs-token"
                        type="password"
                        placeholder="Enter your Discogs API token"
                        value={discogsToken}
                        onChange={(e) => setDiscogsToken(e.target.value)}
                        className="font-mono"
                      />
                      <Button 
                        onClick={handleSaveToken}
                        disabled={!discogsToken || tokenSaved}
                        variant={tokenSaved ? "outline" : "default"}
                      >
                        {tokenSaved ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Required for scraping. Token is stored securely in your local database.
                    </p>
                  </div>
              </CardContent>
          </Card>

          {/* IPC Connectivity Test */}
          <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    IPC Connectivity Check
                  </CardTitle>
                  <CardDescription>
                    Verify that the React frontend can talk to the Rust backend.
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Button onClick={handlePing} variant="secondary">
                        Ping Backend
                    </Button>
                    {pingResult && (
                        <div className="text-sm font-mono bg-muted p-2 rounded border">
                            {pingResult}
                        </div>
                    )}
                  </div>
              </CardContent>
          </Card>

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
    </div>
  );
}
