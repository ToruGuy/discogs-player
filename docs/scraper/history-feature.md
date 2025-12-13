# Scraper History Feature

## Overview
Implemented persistent scraping history that saves all scrape jobs to the database. Now when you hit "+" to start a new scrape, previous scraping history is preserved and displayed.

## Changes Made

### 1. Database Schema (Migration v5)
**File**: `src-tauri/src/lib.rs`

Added new `scrape_jobs` table to store scraping history:

```sql
CREATE TABLE IF NOT EXISTS scrape_jobs (
  id TEXT PRIMARY KEY,
  seller TEXT NOT NULL,
  status TEXT NOT NULL,
  albums_added INTEGER DEFAULT 0,
  albums_updated INTEGER DEFAULT 0,
  total_items INTEGER DEFAULT 0,
  error_message TEXT,
  started_at DATETIME NOT NULL,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scrape_jobs_started_at ON scrape_jobs(started_at DESC);
```

### 2. Rust Backend

#### Database Writer (`src-tauri/src/scraper/db.rs`)
Added functions to manage scrape jobs:
- `create_scrape_job()` - Create a new job record when scraping starts
- `update_scrape_job_completed()` - Update job with results when completed
- `update_scrape_job_error()` - Update job with error message on failure
- `update_scrape_job_cancelled()` - Update job status when cancelled

#### Scraper Runner (`src-tauri/src/scraper/runner.rs`)
- Added `job_id` field to `ScrapeJob` struct (generated using timestamp)
- Saves job to database when starting
- Updates job status on completion
- Added `job_id()` getter method

#### Commands (`src-tauri/src/commands/scraper_commands.rs`)
- Updated `start_scrape` to save errors to database
- Updated `cancel_scrape` to save cancelled status to database
- Fixed thread safety issue by releasing mutex before async operations

#### Dependencies (`src-tauri/Cargo.toml`)
- Added `chrono = "0.4"` for timestamp generation

### 3. TypeScript Frontend

#### Types (`src/types.ts`)
Added new `ScrapeJob` type:
```typescript
export type ScrapeJob = {
  id: string;
  seller: string;
  status: 'running' | 'completed' | 'error' | 'cancelled';
  albums_added: number;
  albums_updated: number;
  total_items: number;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
};
```

#### Database Service (`src/services/db.ts`)
Added `getScrapeJobs()` method to load scraping history from database.

#### Scraping View (`src/views/ScrapingView.tsx`)
- Added `useEffect` hook to load scrape history from database
- Updated table to display all historical jobs (not just current one)
- Shows proper status badges for running/completed/error/cancelled states
- Automatically refreshes history when a job completes
- Includes rescrape action buttons for completed jobs

## User Experience

### Before
- Scraping history was only kept in memory
- When hitting "+" to start a new scrape, previous history was lost
- No way to see past scraping jobs

### After
- All scraping jobs are persisted to the database
- History is preserved across app restarts
- Scraping view shows complete history of all jobs
- Each job shows:
  - Status (running/completed/error/cancelled)
  - Seller name
  - Time started (relative, e.g., "2 hours ago")
  - Number of items processed
  - Rescrape button for completed jobs

## Testing
- TypeScript compilation: ✅ Passed
- Rust compilation: ✅ Passed
- Ready for testing in the running application
