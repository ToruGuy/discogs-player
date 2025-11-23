import { MOCK_ALBUMS } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Play, Clock, Disc, Heart, ExternalLink, DollarSign, ShoppingCart, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";

export function FocusView() {
  const { id } = useParams();
  // For now, use the first album. Later we'll use the id from URL params
  const album = MOCK_ALBUMS[0];
  
  const hasYoutubeVideos = album.youtube_videos && album.youtube_videos.length > 0;
  const isLiked = album.user_interactions?.some(i => i.interaction_type === 'liked');

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left: The Visual (Cover Art) */}
      <div className="lg:w-1/2 h-[50vh] lg:h-full p-8 flex items-center justify-center bg-black/5">
        <div className="relative aspect-square w-full max-w-xl shadow-2xl rounded-lg overflow-hidden group">
            <img 
                src={album.image_url} 
                alt={album.title} 
                className="object-cover w-full h-full"
            />
             {/* Big Play Overlay */}
             {hasYoutubeVideos && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="h-20 w-20 rounded-full shadow-2xl text-white bg-primary/90 hover:bg-primary hover:scale-105 transition-all">
                      <Play className="h-10 w-10 ml-1" />
                  </Button>
               </div>
             )}
        </div>
      </div>

      {/* Right: The Metadata (Liner Notes) */}
      <div className="lg:w-1/2 h-full bg-background flex flex-col border-l">
        <ScrollArea className="flex-1">
            <div className="p-8 space-y-8">
                
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <Badge variant="secondary" className="text-xs tracking-wider font-mono">
                            {album.catalog_number}
                        </Badge>
                        {album.released_year && (
                             <Badge variant="outline" className="text-xs tracking-wider font-mono">
                                {album.released_year}
                            </Badge>
                        )}
                        <Badge variant="outline" className="text-xs tracking-wider font-mono">
                            {album.country}
                        </Badge>
                        {album.last_sold_date && (
                            <Badge variant="outline" className="text-xs">
                                Last sold: {album.last_sold_date}
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight mb-2 leading-tight">
                        {album.title}
                    </h1>
                    <div className="text-2xl text-muted-foreground font-light">
                        {album.artist}
                    </div>
                </div>

                <div className="flex gap-2">
                     <Button className="gap-2 flex-1" disabled={!hasYoutubeVideos}>
                        <Play className="h-4 w-4" /> Play Album
                     </Button>
                     <Button variant="outline" className={`gap-2 flex-1 ${isLiked ? 'border-primary text-primary' : ''}`}>
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} /> {isLiked ? 'Liked' : 'Like'}
                     </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <a href={album.release_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                     </Button>
                </div>

                {!hasYoutubeVideos && (
                  <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                    <p className="text-sm text-destructive">⚠️ No audio available for this release</p>
                  </div>
                )}

                <Separator />

                {/* YouTube Videos / Tracklist */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                        <Clock className="h-4 w-4" /> {hasYoutubeVideos ? 'Available Audio' : 'Tracklist'}
                    </h3>
                    
                    {hasYoutubeVideos ? (
                      <div className="space-y-2">
                        {album.youtube_videos.map((video, index) => (
                          <div key={index} className="group flex items-center justify-between p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-primary/20">
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-xs text-muted-foreground w-6 text-center">{index + 1}</span>
                              <div className="flex flex-col">
                                <span className="font-medium group-hover:text-primary transition-colors text-sm">
                                  Video {index + 1}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">{video.youtube_video_id}</span>
                              </div>
                            </div>
                            <Play className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {album.tracklist.map((track, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-xs text-muted-foreground w-6 text-center">{track.position}</span>
                              <span className="font-medium text-sm">{track.title}</span>
                            </div>
                            {track.duration && (
                              <span className="font-mono text-xs text-muted-foreground">{track.duration}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <Separator />

                 {/* Collection Items (Where to Buy) */}
                 {album.collection_items && album.collection_items.length > 0 && (
                   <>
                     <div>
                       <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                         <ShoppingCart className="h-4 w-4" /> Available Listings ({album.collection_items.length})
                       </h3>
                       <div className="space-y-3">
                         {album.collection_items.map((item, idx) => (
                           <div key={idx} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                             <div className="flex justify-between items-start mb-2">
                               <div className="flex items-center gap-2">
                                 <Badge variant={item.is_new === 1 ? "default" : "secondary"}>
                                   {item.is_new === 1 ? 'New Arrival' : 'In Stock'}
                                 </Badge>
                                 {item.seller_condition && (
                                   <Badge variant="outline" className="font-mono text-xs">
                                     {item.seller_condition}
                                   </Badge>
                                 )}
                               </div>
                               <div className="text-lg font-bold">€{item.seller_price.toFixed(2)}</div>
                             </div>
                             {item.seller_notes && (
                               <p className="text-xs text-muted-foreground mb-2">{item.seller_notes}</p>
                             )}
                             <Button size="sm" variant="outline" className="w-full gap-2" asChild>
                               <a href={item.item_url} target="_blank" rel="noopener noreferrer">
                                 <ExternalLink className="h-3 w-3" /> View on Discogs
                               </a>
                             </Button>
                           </div>
                         ))}
                       </div>
                     </div>
                     <Separator />
                   </>
                 )}

                 {/* Deep Dive Details */}
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                         <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                            <Disc className="h-4 w-4" /> Pressing Info
                         </h3>
                         <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Label</dt>
                                <dd className="font-medium text-right">{album.label}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Format</dt>
                                <dd className="font-medium text-right">{album.format || "Vinyl, 12\""}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Genres</dt>
                                <dd className="font-medium text-right">{album.genres.join(", ")}</dd>
                            </div>
                            {album.styles && album.styles.length > 0 && (
                              <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Styles</dt>
                                  <dd className="font-medium text-right">{album.styles.join(", ")}</dd>
                              </div>
                            )}
                         </dl>
                    </div>

                    <div>
                         <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" /> Market Data
                         </h3>
                         <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Low / Med / High</dt>
                                <dd className="font-medium text-right">
                                  €{album.price_low} / €{album.price_median} / €{album.price_high}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Have / Want</dt>
                                <dd className="font-medium text-right">{album.have_count} / {album.want_count}</dd>
                            </div>
                             <div className="flex justify-between">
                                <dt className="text-muted-foreground">Rating</dt>
                                <dd className="font-medium text-right">{album.avg_rating} / 5 ({album.ratings_count} votes)</dd>
                            </div>
                         </dl>
                    </div>
                 </div>

                 {/* User Interactions History */}
                 {album.user_interactions && album.user_interactions.length > 0 && (
                   <>
                     <Separator />
                     <div>
                       <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                         Your History
                       </h3>
                       <div className="space-y-2">
                         {album.user_interactions.map((interaction, idx) => (
                           <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                             <span className="capitalize">{interaction.interaction_type}</span>
                             <span className="text-xs text-muted-foreground">{new Date(interaction.created_at).toLocaleString()}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   </>
                 )}

            </div>
        </ScrollArea>
      </div>
    </div>
  );
}
