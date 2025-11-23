import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Library, ExternalLink, RefreshCw, Trash2, Calendar } from "lucide-react";
import { MOCK_ALBUMS } from "@/lib/mockData";
import { ImportDialog } from "@/components/ImportDialog";

export function CollectionView() {
  // Group albums by collection_id to create collection summaries
  const collections = new Map<number, {
    id: number;
    name: string;
    itemCount: number;
    lastUpdated: string;
    albums: typeof MOCK_ALBUMS;
  }>();

  // Mock collection names (in real app, these would come from DB)
  const collectionNames: Record<number, string> = {
    9: "Repeat Repeat Repeat Records",
    12: "Robot Ranch Collection",
    45: "Vintage Soul Singles",
    48: "Hard Wax Berlin"
  };

  MOCK_ALBUMS.forEach(album => {
    album.collection_items?.forEach(item => {
      const collId = item.collection_id;
      if (!collections.has(collId)) {
        collections.set(collId, {
          id: collId,
          name: collectionNames[collId] || `Collection ${collId}`,
          itemCount: 0,
          lastUpdated: album.updated_at,
          albums: []
        });
      }
      const coll = collections.get(collId)!;
      coll.itemCount++;
      coll.albums.push(album);
      // Update last updated date
      if (new Date(album.updated_at) > new Date(coll.lastUpdated)) {
        coll.lastUpdated = album.updated_at;
      }
    });
  });

  const collectionList = Array.from(collections.values());

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>
          <p className="text-muted-foreground">
            {collectionList.length} sources • {MOCK_ALBUMS.length} total items
          </p>
        </div>
        <ImportDialog 
          trigger={
            <Button className="gap-2">
              <Library className="h-4 w-4" />
              Add Collection
            </Button>
          }
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_ALBUMS.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{collectionList.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">With Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {MOCK_ALBUMS.filter(a => a.youtube_videos?.length > 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionList.map((collection) => (
          <Card key={collection.id} className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{collection.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Updated {new Date(collection.lastUpdated).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {collection.itemCount}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Preview Grid */}
              <div className="grid grid-cols-4 gap-2">
                {collection.albums.slice(0, 4).map((album, idx) => (
                  <div key={idx} className="aspect-square rounded overflow-hidden bg-muted">
                    <img 
                      src={album.image_url} 
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                  <Link to={`/collection/${collection.id}`}>
                    <Library className="h-3 w-3" />
                    Browse
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <RefreshCw className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
