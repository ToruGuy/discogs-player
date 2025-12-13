# Discogs Player

A desktop music player that integrates with your Discogs collection, featuring a scraper for inventory data and YouTube playback.

## Prerequisites

### macOS

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

Restart your terminal after installing Rust.

### Other Platforms

- **Rust**: Install from [rustup.rs](https://rustup.rs/)
- **Node.js**: Version 18 or higher recommended

## Quick Start

```bash
# Install dependencies
npm install

# Run development server (web only)
npm run dev

# Run Tauri desktop app
npm run tauri dev

# Build for production
npm run build
```

## Features

- 🎵 **YouTube Playback**: Play full albums from YouTube
- 📦 **Discogs Integration**: Scrape and sync your collection
- 🎨 **Modern UI**: Beautiful interface with React + TailwindCSS
- 💾 **Local Database**: SQLite-based storage
- 🔍 **Advanced Filtering**: Search by artist, year, genre, etc.

## Project Structure

- `src/` - React frontend (TypeScript)
- `src-tauri/` - Rust backend (see [src-tauri/README.md](src-tauri/README.md))
- `docs/` - Documentation and design specs

## Development

This project is pre-configured with SQLx query cache, so it builds without requiring a database connection during compilation.

For backend development details, see [src-tauri/README.md](src-tauri/README.md).

## Troubleshooting

### Build Error: "set `DATABASE_URL` to use query macros"

This means the SQLx query cache is missing. Pull the latest changes from git - the `.sqlx/` directory should be included in the repository. If you're a maintainer who modified database queries, see the backend README for regeneration instructions.
