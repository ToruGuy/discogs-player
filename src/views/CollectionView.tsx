import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function CollectionView() {
  // In a real app, this would come from context
  const collections = [
      { id: 1, name: "Hard Wax Berlin", type: "Shop", count: 1204 },
      { id: 2, name: "Phonica Records", type: "Shop", count: 850 },
      { id: 3, name: "My 90s Techno", type: "User List", count: 45 },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 pb-safe">
       <h1 className="text-2xl font-bold tracking-tight mb-6">Collections</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {collections.map(col => (
               <Card key={col.id} className="hover:bg-muted/50 transition-colors">
                   <CardHeader>
                       <CardTitle>{col.name}</CardTitle>
                       <CardDescription>{col.type} • {col.count} items</CardDescription>
                   </CardHeader>
                   <CardContent>
                       <Button asChild variant="secondary" className="w-full">
                           <Link to={`/collection/${col.id}`}>
                                Browse Collection <ExternalLink className="ml-2 h-4 w-4" />
                           </Link>
                       </Button>
                   </CardContent>
               </Card>
           ))}
       </div>
    </div>
  );
}
