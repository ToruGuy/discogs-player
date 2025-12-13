use app_lib::scraper::client::DiscogsClient;
use app_lib::scraper::release::fetch_release;
use app_lib::scraper::inventory::fetch_all_inventory;
use app_lib::scraper::Result;
use std::env;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize logging
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();

    // Get seller username from command line args
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: cargo run --bin test_scraper <seller_username> <token> [limit]");
        eprintln!("Example: cargo run --bin test_scraper secretspot-records YOUR_TOKEN 10");
        std::process::exit(1);
    }

    let seller = &args[1];
    let token = args.get(2).expect("Token is required").to_string();
    let limit = args.get(3).and_then(|s| s.parse::<u32>().ok());

    println!("🚀 Starting scraper test for seller: {}", seller);
    if let Some(limit) = limit {
        println!("📊 Limit: {} items", limit);
    }

    // Test 1: Create client
    println!("\n✅ Test 1: Creating Discogs client...");
    let client = DiscogsClient::new(token)?;
    println!("   ✓ Client created successfully");

    // Test 2: Fetch inventory (first page only for quick test)
    println!("\n✅ Test 2: Fetching inventory (first page)...");
    let inventory_response = client.get_inventory(seller, 1, 10).await?;
    println!("   ✓ Fetched {} listings from page 1", inventory_response.listings.len());
    
    if inventory_response.listings.is_empty() {
        println!("   ⚠️  No listings found for seller: {}", seller);
        return Ok(());
    }

    // Show first listing
    let first_listing = &inventory_response.listings[0];
    println!("   📦 Sample listing:");
    println!("      Release ID: {}", first_listing.release.id);
    println!("      Artist: {}", first_listing.release.artist);
    println!("      Title: {}", first_listing.release.title);
    println!("      Price: {} {}", first_listing.price.value, first_listing.price.currency);

    // Test 3: Fetch full inventory (with limit)
    if let Some(limit) = limit {
        println!("\n✅ Test 3: Fetching full inventory (limit: {})...", limit);
        let release_ids = fetch_all_inventory(&client, seller, Some(limit)).await?;
        println!("   ✓ Found {} release IDs", release_ids.len());
        
        if !release_ids.is_empty() {
            println!("   📋 First 5 release IDs: {:?}", &release_ids[..release_ids.len().min(5)]);
        }
    }

    // Test 4: Fetch a single release detail
    println!("\n✅ Test 4: Fetching release details...");
    let test_release_id = first_listing.release.id;
    let release = fetch_release(&client, test_release_id).await?;
    
    println!("   ✓ Fetched release: {} - {}", release.artists.first().map(|a| &a.name).unwrap_or(&"Unknown".to_string()), release.title);
    println!("   📀 Genres: {:?}", release.genres);
    println!("   🎨 Styles: {:?}", release.styles);
    println!("   🎵 Tracks: {} tracks", release.tracklist.len());
    println!("   🎬 Videos: {} videos", release.videos.len());
    
    if !release.tracklist.is_empty() {
        println!("   📝 Sample tracks:");
        for track in release.tracklist.iter().take(3) {
            println!("      {} - {} ({})", track.position, track.title, track.duration.as_deref().unwrap_or("unknown"));
        }
    }

    if !release.videos.is_empty() {
        println!("   🎥 Sample videos:");
        for video in release.videos.iter().take(2) {
            println!("      {} - {}", video.uri, video.title.as_deref().unwrap_or("No title"));
        }
    }

    println!("\n✅ All tests passed! Scraper is working correctly.");
    Ok(())
}
