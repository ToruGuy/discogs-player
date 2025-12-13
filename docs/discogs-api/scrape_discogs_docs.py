#!/usr/bin/env python3
"""
Scrape Discogs API documentation and save as markdown files.
Preserves the original documentation structure.
"""

import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import html2text
import time

BASE_URL = "https://www.discogs.com/developers"
OUTPUT_DIR = "discogs/docs"

# Configure html2text
h2t = html2text.HTML2Text()
h2t.ignore_links = False
h2t.ignore_images = False
h2t.body_width = 0  # Don't wrap lines
h2t.ignore_emphasis = False
h2t.single_line_break = False

# Headers to avoid Cloudflare blocking
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0',
}


def get_page_content(url):
    """Fetch page content with retry logic."""
    session = requests.Session()
    session.headers.update(HEADERS)
    
    for attempt in range(3):
        try:
            response = session.get(url, timeout=30, allow_redirects=True)
            response.raise_for_status()
            
            # Check if we got blocked by Cloudflare
            if 'just a moment' in response.text.lower() or 'challenge' in response.text.lower():
                print(f"  Cloudflare challenge detected, waiting longer...")
                time.sleep(5)
                continue
            
            return response.text
        except requests.RequestException as e:
            print(f"  Attempt {attempt + 1} failed for {url}: {e}")
            if attempt < 2:
                time.sleep(3)
    return None


def extract_doc_links(html_content, base_url):
    """Extract all documentation links from the page."""
    soup = BeautifulSoup(html_content, 'html.parser')
    links = []
    seen_urls = set()
    
    # Find all links that point to /developers pages
    for a in soup.find_all('a', href=True):
        href = a['href']
        
        # Skip anchors, external links, and non-developer links
        if href.startswith('#') or href.startswith('mailto:'):
            continue
        
        # Handle relative and absolute URLs
        if href.startswith('/developers'):
            full_url = urljoin('https://www.discogs.com', href)
        elif href.startswith('http') and 'discogs.com/developers' in href:
            full_url = href
        elif href.startswith('/') and '/developers' not in href:
            continue
        else:
            continue
        
        # Normalize URL
        full_url = full_url.split('#')[0].rstrip('/')
        
        if full_url not in seen_urls and full_url.startswith('https://www.discogs.com/developers'):
            seen_urls.add(full_url)
            title = a.get_text(strip=True) or full_url.split('/')[-1] or 'Untitled'
            links.append((full_url, title))
    
    return links


def extract_main_content(html_content):
    """Extract the main documentation content from the page."""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Try various selectors for main content
    content = None
    
    # Common content selectors
    selectors = [
        ('main', {}),
        ('article', {}),
        ('div', {'class': 'content'}),
        ('div', {'class': 'main-content'}),
        ('div', {'class': 'documentation'}),
        ('div', {'id': 'content'}),
        ('div', {'id': 'main'}),
        ('div', {'role': 'main'}),
    ]
    
    for tag, attrs in selectors:
        content = soup.find(tag, attrs)
        if content:
            break
    
    # Fallback: find the largest div that's not nav/footer/header
    if not content:
        all_divs = soup.find_all('div')
        for div in all_divs:
            if div.find_parent(['nav', 'header', 'footer']):
                continue
            if len(div.get_text(strip=True)) > 500:  # Substantial content
                content = div
                break
    
    if content:
        # Remove navigation elements, scripts, styles
        for element in content.find_all(['nav', 'script', 'style', 'header', 'footer']):
            element.decompose()
        
        # Remove common UI elements
        for element in content.find_all(['button', 'aside'], class_=lambda x: x and ('nav' in str(x).lower() or 'sidebar' in str(x).lower())):
            element.decompose()
        
        return str(content)
    
    # Last resort: return body without nav/header/footer
    body = soup.find('body')
    if body:
        for element in body.find_all(['nav', 'header', 'footer', 'script', 'style']):
            element.decompose()
        return str(body)
    
    return None


def html_to_markdown(html_content):
    """Convert HTML content to Markdown."""
    if not html_content:
        return ""
    
    markdown = h2t.handle(html_content)
    
    # Clean up excessive newlines
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    
    # Clean up common markdown artifacts
    markdown = re.sub(r'\[([^\]]+)\]\(#\)', r'\1', markdown)  # Remove empty anchor links
    
    return markdown.strip()


def url_to_filepath(url):
    """Convert URL to local file path."""
    parsed = urlparse(url)
    path = parsed.path
    
    # Remove /developers prefix
    if path.startswith('/developers'):
        path = path[11:]  # Remove '/developers'
    
    # Handle trailing slash or empty path
    if not path or path == '/':
        return 'index.md'
    
    # Remove leading/trailing slashes
    path = path.strip('/')
    
    # Replace slashes with directory separators
    if '/' in path:
        parts = path.split('/')
        filename = parts[-1]
        if not filename.endswith('.md'):
            filename += '.md'
        return '/'.join(parts[:-1] + [filename])
    
    # Add .md extension if not present
    if not path.endswith('.md'):
        path = path + '.md'
    
    return path


def ensure_dir(filepath):
    """Ensure the directory for a file exists."""
    directory = os.path.dirname(filepath)
    if directory:
        os.makedirs(directory, exist_ok=True)


def split_by_sections(html_content, base_url):
    """Split HTML content by h1 headings into separate sections."""
    sections = []
    
    # Extract main content first
    main_content = extract_main_content(html_content)
    if not main_content:
        return []
    
    soup_content = BeautifulSoup(main_content, 'html.parser')
    
    # Find all h1 headings
    h1_tags = soup_content.find_all('h1')
    
    if not h1_tags:
        # If no h1 tags, treat entire content as one section
        markdown = html_to_markdown(main_content)
        if markdown and len(markdown.strip()) > 50:
            sections.append(("Home", markdown))
        return sections
    
    # Process each section
    for i, h1 in enumerate(h1_tags):
        section_title = h1.get_text(strip=True)
        
        # Find all content until the next h1 (or end)
        section_elements = [h1]
        current = h1.next_sibling
        
        while current:
            # Stop if we hit another h1
            if hasattr(current, 'name') and current.name == 'h1':
                break
            
            # Add element to section
            if hasattr(current, 'name') or (isinstance(current, str) and current.strip()):
                section_elements.append(current)
            
            current = current.next_sibling
        
        # Convert section to HTML and then markdown
        section_html = ''.join([str(e) if hasattr(e, '__str__') else e if isinstance(e, str) else '' for e in section_elements])
        section_markdown = html_to_markdown(section_html)
        
        if section_markdown and len(section_markdown.strip()) > 50:
            sections.append((section_title, section_markdown))
    
    return sections


def sanitize_filename(title):
    """Convert a title to a safe filename."""
    # Remove special characters and replace spaces with hyphens
    filename = re.sub(r'[^\w\s-]', '', title)
    filename = re.sub(r'[-\s]+', '-', filename)
    return filename.lower().strip('-')


def split_markdown_file(markdown_content, base_url):
    """Split markdown content by h1 headings."""
    sections = []
    current_section_title = None
    current_section_lines = []
    
    lines = markdown_content.split('\n')
    
    for line in lines:
        # Check if this is an h1 heading (starts with "# " but not "##")
        if line.startswith('# ') and not line.startswith('##'):
            # Save previous section
            if current_section_title and current_section_lines:
                section_content = '\n'.join(current_section_lines)
                if section_content.strip():
                    sections.append((current_section_title, section_content))
            
            # Start new section
            current_section_title = line[2:].strip()  # Remove "# " prefix
            # Remove trailing markers like "__"
            current_section_title = re.sub(r'\s+__\s*$', '', current_section_title)
            current_section_lines = [line]
        else:
            # Add to current section
            if current_section_title:
                current_section_lines.append(line)
            elif not current_section_title and line.strip() and not line.startswith('Source:'):
                # Content before first h1 - this is the intro/header
                if not current_section_title:
                    current_section_title = "Introduction"
                    current_section_lines = [f"# {current_section_title}", ""]
                current_section_lines.append(line)
    
    # Don't forget the last section
    if current_section_title and current_section_lines:
        section_content = '\n'.join(current_section_lines)
        if section_content.strip():
            sections.append((current_section_title, section_content))
    
    return sections


def scrape_docs():
    """Main function to scrape all documentation."""
    print(f"Starting scrape of {BASE_URL}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("-" * 50)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Get the main page
    print("Fetching main documentation page...")
    main_html = get_page_content(BASE_URL)
    
    if not main_html:
        print("Failed to fetch main page!")
        print("Note: If you have an existing index.md file, use split_existing_docs.py to split it.")
        return
    
    # Extract main content and convert to markdown
    print("Extracting and converting content...")
    main_content = extract_main_content(main_html)
    if not main_content:
        print("Failed to extract main content!")
        return
    
    markdown = html_to_markdown(main_content)
    if not markdown:
        print("Failed to convert to markdown!")
        return
    
    # First, save the complete file
    index_path = os.path.join(OUTPUT_DIR, 'index.md')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(f"# Discogs API Documentation\n\n")
        f.write(f"Source: {BASE_URL}\n\n")
        f.write(markdown)
    print(f"Saved complete documentation: {index_path}")
    
    # Split content by sections (h1 headings)
    print("Splitting content into sections...")
    sections = split_by_sections(main_html, BASE_URL)
    
    if not sections:
        # Fallback: try splitting the markdown directly
        print("Trying to split markdown directly...")
        sections = split_markdown_file(markdown, BASE_URL)
    
    if not sections:
        print("No sections found to split.")
        print("-" * 50)
        print(f"Scraping complete!")
        print(f"  Saved complete documentation: {index_path}")
        return
    
    print(f"Found {len(sections)} sections to save")
    print("-" * 50)
    
    scraped_count = 0
    failed_count = 0
    
    for title, markdown_content in sections:
        # Create filename from title
        filename = sanitize_filename(title)
        if not filename:
            filename = "untitled"
        
        full_path = os.path.join(OUTPUT_DIR, f"{filename}.md")
        
        print(f"Saving section: {title}")
        print(f"  File: {full_path}")
        
        try:
            # Write markdown file
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\n")
                f.write(f"Source: {BASE_URL}\n\n")
                f.write(markdown_content)
            
            print(f"  Saved: {full_path}")
            scraped_count += 1
        except Exception as e:
            print(f"  ERROR: Failed to save {full_path}: {e}")
            failed_count += 1
    
    print("-" * 50)
    print(f"Scraping complete!")
    print(f"  Successfully scraped: {scraped_count} sections")
    print(f"  Failed: {failed_count} sections")
    print(f"  Output directory: {OUTPUT_DIR}/")


if __name__ == "__main__":
    scrape_docs()
