# Discogs Player

## Prerequisites

### macOS

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

Restart your terminal after installing Rust.

## Setup

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
