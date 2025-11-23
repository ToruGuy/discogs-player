import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SettingsView() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
        
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your collections and preferences.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Sync New Collection</CardTitle>
                <CardDescription>Add a Discogs Shop or User Profile to your feed.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input placeholder="https://www.discogs.com/seller/HardWax/profile" className="flex-1" />
                    <Button>Preview</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Paste any full URL to a Discogs Seller or Collection page.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the player vibe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Theme Mode</span>
                    <div className="flex gap-2 bg-muted p-1 rounded-lg">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Light</Button>
                        <Button variant="secondary" size="sm" className="h-7 text-xs shadow-sm">Dark</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">System</Button>
                    </div>
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Grid Density</span>
                    <div className="flex gap-2 bg-muted p-1 rounded-lg">
                        <Button variant="secondary" size="sm" className="h-7 text-xs shadow-sm">Comfortable</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Compact</Button>
                    </div>
                 </div>
            </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground pt-10">
            Discogs Player v0.1.0 • Built with Tauri v2
        </div>

    </div>
  );
}

