# Discogs Player

## 🎯 The Problem
Music is more than audio. It's **history, artists, releases, years, stories, prices**.

Discogs has everything - collections, shops, rich metadata - but no way to easily listen before you buy. You want to explore vinyl shops, hear the records, then purchase what you love.

**What makes it special:** Every track connects to a real physical copy - someone's collection, a shop's shelf. Not just digital files, but records that actually exist somewhere in the world.

**Own your listening experience.**

## 💡 Solution
Simple desktop player for Discogs collections and shops.
- Listen to records from shops → discover → buy vinyls
- Browse with full context: artists, years, genres, releases, prices
- No algorithms
- Open source, fast, simple

## 🛠️ Tech Stack

**Tauri** - Rust-based application framework for fast, secure desktop apps (smaller, lighter than Electron)

**Vite** - Modern frontend build tool with instant hot reload and optimized production builds

**shadcn** - High-quality, customizable UI components built on Radix UI and Tailwind CSS

**SQLite** - Lightweight local database for fast offline-first data storage

### Architecture
```
Frontend → API → Logic → DB Handler → SQLite (Local)
                   ↓
                Scraper (parallel)
```

## ✨ MVP Features
1. **Independent Player:** Core music playback
2. **Source Management:**
   - Add Shop URLs
   - Add personal Collections
3. **Likes System:**
   - Like/Dislike tracks
   - Dedicated Liked tracks page
   - Generate YouTube playlist links (add to YouTube)
   - Direct links to vinyl shops (easy purchase from Discogs)
4. **Navigation:**
   - Browse collections via Sidebar
5. **Filtering:**
   - Genre
   - Year
   - Basic metadata

## 📋 Roadmap
1. ✅ Init Project (Tauri + Vite + shadcn)
2. Database & Handler
3. Scraper Design
4. Scraper Implementation
5. Frontend Development
6. Testing & Integration
7. Release (MacOS/Windows)
8. Landing Page
9. Publication

