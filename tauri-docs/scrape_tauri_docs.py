#!/usr/bin/env python3
"""
Script to scrape Tauri v2 documentation and save as markdown files.
This script preserves the exact file structure of the documentation site.
"""

import sys

# Ensure Python 3 is being used
if sys.version_info < (3, 7):
    print("Error: This script requires Python 3.7 or higher")
    sys.exit(1)

import os
import re
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
import html2text
from pathlib import Path

BASE_URL = "https://v2.tauri.app"
OUTPUT_DIR = "docs"

# Headers to mimic a browser request
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Starting point - we'll discover all sections from the main navigation
START_URL = f"{BASE_URL}/"

def sanitize_filename(filename):
    """Convert a string to a valid filename."""
    # Remove or replace invalid characters
    filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
    # Remove leading/trailing spaces and dots
    filename = filename.strip(' .')
    # Replace spaces with underscores
    filename = re.sub(r'\s+', '_', filename)
    # Limit length
    if len(filename) > 200:
        filename = filename[:200]
    return filename or "index"

def extract_path_from_url(url):
    """Extract the path from URL to create directory structure."""
    parsed = urlparse(url)
    path = parsed.path.strip('/')
    
    # Remove trailing slashes and handle empty paths
    if not path:
        return "index"
    
    # Decode URL encoding
    path = unquote(path)
    
    return path

def discover_navigation_links(url):
    """Discover all main navigation links from the site."""
    print(f"Discovering site structure from: {url}")
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        links = set()
        base_domain = urlparse(BASE_URL).netloc
        
        # Find the main navigation area
        nav = soup.find('nav', {'class': lambda x: x and 'Main' in str(x)}) or soup.find('navigation')
        if not nav:
            # Fallback to all navigation elements
            nav = soup
        
        # Extract all links from navigation
        for link in nav.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(url, href)
            parsed = urlparse(full_url)
            
            if parsed.netloc == base_domain:
                # Remove fragment and trailing slash
                clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}".rstrip('/')
                
                # Only include documentation paths (not external resources)
                path = parsed.path.lower()
                if path and not any(exclude in path for exclude in ['github.com', 'docs.rs', '.png', '.jpg', '.svg']):
                    links.add(clean_url)
        
        print(f"Discovered {len(links)} initial links from navigation")
        return sorted(list(links))
    
    except Exception as e:
        print(f"Error discovering navigation: {e}")
        # Fallback to some common starting points
        return [
            f"{BASE_URL}/start/",
            f"{BASE_URL}/reference/",
            f"{BASE_URL}/blog/",
        ]

def html_to_markdown(soup, url):
    """Convert HTML content to markdown format."""
    # Find the main content area - try multiple selectors
    content_selectors = [
        'main',
        'article',
        '.content',
        '#content',
        '.main-content',
        '[role="main"]'
    ]
    
    content = None
    for selector in content_selectors:
        content = soup.select_one(selector)
        if content:
            break
    
    if not content:
        content = soup.find('body')
    
    if not content:
        return "# Documentation\n\nContent not found."
    
    # Remove unwanted elements (navigation, footer, header, sidebar, ads, etc.)
    for elem in content.find_all(['nav', 'footer', 'header', 'aside', 'script', 'style', 'iframe', 'noscript']):
        elem.decompose()
    
    # Remove elements with common navigation/sidebar classes
    for elem in content.select('.sidebar, .navigation, .nav, .toc, .breadcrumb, .pagination'):
        elem.decompose()
    
    # Configure html2text converter
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.body_width = 0  # Don't wrap lines
    h.unicode_snob = True
    h.skip_internal_links = False
    h.ignore_emphasis = False
    h.mark_code = True
    
    # Convert to markdown
    markdown_content = h.handle(str(content))
    
    # Add title at the top if available and not already present
    title = soup.find('title')
    if title:
        title_text = title.get_text().strip()
        # Remove site name from title (e.g., "| Tauri")
        title_text = re.sub(r'\s*\|\s*Tauri\s*$', '', title_text)
        if title_text and not markdown_content.startswith('#'):
            markdown_content = f"# {title_text}\n\n{markdown_content}"
    
    # Clean up excessive newlines (more than 3 in a row)
    markdown_content = re.sub(r'\n{4,}', '\n\n\n', markdown_content)
    
    # Add source URL at the bottom
    markdown_content += f"\n\n---\n\n**Source:** [{url}]({url})\n"
    
    return markdown_content.strip()

def scrape_page(url, visited_urls):
    """Scrape a single page and return its content and links."""
    if url in visited_urls:
        return None, []
    
    print(f"Scraping: {url}")
    visited_urls.add(url)
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract markdown content
        markdown_content = html_to_markdown(soup, url)
        
        # Find all documentation links
        doc_links = set()
        base_domain = urlparse(BASE_URL).netloc
        
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(url, href)
            parsed = urlparse(full_url)
            
            # Only include links from the same domain
            if parsed.netloc == base_domain:
                # Remove fragment
                clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
                # Remove trailing slash for consistency
                clean_url = clean_url.rstrip('/')
                
                # Include all documentation paths from the same domain
                path = parsed.path
                
                # Exclude external links, assets, releases, and non-documentation pages
                exclude_patterns = [
                    '/authors/', '/release/', 'github.com', 'docs.rs', '.png', '.jpg', '.svg', 
                    '.ico', '.css', '.js', 'twitter.com', 'discord.com', 
                    'opencollective.com', 'fosstodon.org', 'bsky.app'
                ]
                
                # Only include if it's a documentation page (has a path)
                if path and path != '/' and not any(exclude in full_url.lower() for exclude in exclude_patterns):
                    doc_links.add(clean_url)
        
        return markdown_content, list(doc_links)
    
    except requests.exceptions.RequestException as e:
        print(f"Error scraping {url}: {e}")
        return None, []
    except Exception as e:
        print(f"Unexpected error scraping {url}: {e}")
        return None, []

def categorize_url(url):
    """Categorize URL into guides, references, or blog."""
    path = urlparse(url).path.lower()
    
    # Map paths to main categories
    if any(section in path for section in ['/start/', '/concept/', '/security/', '/develop/', 
                                           '/distribute/', '/learn/', '/plugin/', '/about/']):
        return 'guides'
    elif '/reference/' in path:
        return 'references'
    elif '/blog/' in path:
        return 'blog'
    else:
        return 'guides'  # Default to guides

def save_markdown(content, url, output_dir):
    """Save markdown content to a file, preserving directory structure under main categories."""
    # Extract path from URL
    path = extract_path_from_url(url)
    
    # Determine main category
    category = categorize_url(url)
    
    # Handle special cases
    if path == 'index' or path == '':
        filepath = os.path.join(output_dir, category, 'index.md')
    else:
        # Split path into parts
        parts = path.split('/')
        
        # Create directory structure under category
        if len(parts) > 1:
            dir_path = os.path.join(output_dir, category, *parts[:-1])
            os.makedirs(dir_path, exist_ok=True)
            filename = sanitize_filename(parts[-1]) + '.md'
            filepath = os.path.join(dir_path, filename)
        else:
            dir_path = os.path.join(output_dir, category)
            os.makedirs(dir_path, exist_ok=True)
            filename = sanitize_filename(parts[0]) + '.md'
            filepath = os.path.join(dir_path, filename)
    
    # Ensure parent directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Write content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Saved: {filepath}")
    return filepath

def save_progress(visited_urls, to_visit, filename='scraper_progress.json'):
    """Save scraping progress to a JSON file."""
    progress = {
        'visited_urls': list(visited_urls),
        'to_visit': to_visit
    }
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2)

def load_progress(filename='scraper_progress.json'):
    """Load scraping progress from a JSON file."""
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            progress = json.load(f)
            return set(progress['visited_urls']), progress['to_visit']
    return set(), []

def main():
    """Main scraping function."""
    print("=" * 80)
    print("Tauri v2 Documentation Scraper")
    print("=" * 80)
    print()
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Try to load previous progress
    visited_urls, to_visit = load_progress()
    
    # If no progress, start fresh by discovering the site structure
    if not to_visit:
        print("Starting fresh scrape...")
        print("Step 1: Discovering site structure from main page...")
        to_visit = discover_navigation_links(START_URL)
        print(f"Found {len(to_visit)} starting points")
        print()
    else:
        print(f"Resuming from previous progress...")
        print(f"Already visited: {len(visited_urls)} URLs")
        print(f"Remaining: {len(to_visit)} URLs")
    
    print()
    
    pages_scraped = 0
    errors = 0
    
    try:
        while to_visit:
            url = to_visit.pop(0)
            
            if url in visited_urls:
                continue
            
            content, links = scrape_page(url, visited_urls)
            
            if content:
                save_markdown(content, url, OUTPUT_DIR)
                pages_scraped += 1
            else:
                errors += 1
            
            # Add new links to visit
            for link in links:
                if link not in visited_urls and link not in to_visit:
                    to_visit.append(link)
            
            # Save progress every 10 pages
            if pages_scraped % 10 == 0:
                save_progress(visited_urls, to_visit)
                print(f"\nProgress: {pages_scraped} pages scraped, {len(to_visit)} remaining\n")
            
            # Be polite - small delay between requests
            time.sleep(0.3)
    
    except KeyboardInterrupt:
        print("\n\nScraping interrupted by user. Saving progress...")
        save_progress(visited_urls, to_visit)
        print(f"Progress saved. Resume by running the script again.")
    except Exception as e:
        print(f"\n\nUnexpected error: {e}")
        save_progress(visited_urls, to_visit)
    
    print()
    print("=" * 80)
    print(f"Scraping complete!")
    print(f"Total pages scraped: {pages_scraped}")
    print(f"Errors encountered: {errors}")
    print(f"Files saved to: {OUTPUT_DIR}/")
    print("=" * 80)
    
    # Clean up progress file
    if os.path.exists('scraper_progress.json'):
        os.remove('scraper_progress.json')

if __name__ == "__main__":
    main()

