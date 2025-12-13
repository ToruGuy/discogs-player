# Discogs Player - Rust Backend

This is the Tauri backend for the Discogs Player application.

## Building the Project

The project uses SQLx with compile-time query verification. The `.sqlx/` directory contains pre-generated query metadata, allowing the project to build **without** needing a database connection.

### Quick Start

```bash
# Build the project
cargo build

# Run the app (from project root)
npm run tauri dev
```

### For Developers: Updating Database Queries

If you modify SQL queries in the code, you need to regenerate the SQLx query cache:

1. **Run the preparation script:**

```bash
cd src-tauri
./prepare-sqlx.sh
```

2. **Commit the updated `.sqlx/` directory:**

```bash
git add .sqlx/
git commit -m "Update SQLx query cache"
```

### Manual SQLx Cache Generation

If the script doesn't work, you can manually generate the cache:

```bash
cd src-tauri

# Create temporary database
sqlite3 temp_sqlx_prepare.db < schema.sql

# Set DATABASE_URL and run cargo sqlx prepare
export DATABASE_URL="sqlite:temp_sqlx_prepare.db"
cargo sqlx prepare

# Clean up
rm temp_sqlx_prepare.db
```

## Project Structure

```
src-tauri/
├── src/
│   ├── commands/          # Tauri commands (API for frontend)
│   ├── scraper/          # Discogs scraping functionality
│   │   ├── client.rs     # HTTP client
│   │   ├── db.rs         # Database operations
│   │   ├── inventory.rs  # Inventory scraping
│   │   ├── release.rs    # Release detail scraping
│   │   ├── runner.rs     # Scraper orchestration
│   │   └── types.rs      # Type definitions
│   ├── lib.rs            # Library entry point
│   ├── main.rs           # App entry point
│   └── player_server.rs  # Local server for player
├── schema.sql            # Database schema
├── prepare-sqlx.sh       # SQLx cache generation script
└── .sqlx/                # Pre-generated query cache (DO NOT DELETE)
```

## Dependencies

- **Tauri**: Desktop app framework
- **SQLx**: Async SQL with compile-time verification
- **Reqwest**: HTTP client for Discogs API
- **Tokio**: Async runtime

## Troubleshooting

### Build fails with "set `DATABASE_URL` to use query macros"

This means the `.sqlx/` directory is missing or out of date. Run `./prepare-sqlx.sh` to regenerate it.

### Database schema mismatch errors

The database schema in your running app doesn't match the code. This usually happens during development. The app should auto-migrate on startup, but if issues persist:

1. Close the app
2. Delete the database file (location depends on OS)
3. Restart the app (it will recreate the database)

### "table X has no column Y" during `cargo sqlx prepare`

The `schema.sql` file is out of date with your code changes. Update `schema.sql` to match the queries in your code, then run `./prepare-sqlx.sh` again.
