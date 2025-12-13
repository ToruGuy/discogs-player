# Discogs API Documentation Scraper

This directory contains scripts to scrape the Discogs API documentation from https://www.discogs.com/developers and convert it to markdown files.

## Files

- `scrape_discogs_docs.py` - Main scraper script that fetches HTML and converts to markdown
- `split_existing_docs.py` - Script to split an existing markdown file into separate sections
- `docs/` - Output directory containing the scraped markdown files

## Usage

### Scraping Fresh Content

```bash
cd /Users/tako/GitRepos/ai-docs
source venv/bin/activate
python3 discogs/scrape_discogs_docs.py
```

This will:
1. Fetch the Discogs API documentation page
2. Convert HTML to markdown
3. Split content by h1 headings into separate files
4. Save all files to `discogs/docs/`

### Splitting Existing Markdown

If you already have an `index.md` file and want to split it:

```bash
cd /Users/tako/GitRepos/ai-docs
source venv/bin/activate
python3 discogs/split_existing_docs.py
```

## Output Structure

The scraper creates separate markdown files for each major section:

- `home.md` - Introduction and getting started
- `authentication.md` - Authentication methods
- `database.md` - Database API endpoints
- `images.md` - Image handling
- `marketplace.md` - Marketplace API
- `inventory-export.md` - Inventory export
- `inventory-upload.md` - Inventory upload
- `user-identity.md` - User identity endpoints
- `user-collection.md` - User collection management
- `user-wantlist.md` - User wantlist
- `user-lists.md` - User lists

## Notes

- The Discogs site may use Cloudflare protection, which can block automated requests
- If scraping fails, you can manually download the page and use `split_existing_docs.py` to process it
- All markdown files include a source URL reference at the top
