#!/usr/bin/env python3
"""
Split existing Discogs documentation markdown file into separate files by h1 sections.
"""

import os
import re

INPUT_FILE = "discogs/docs/index.md"
OUTPUT_DIR = "discogs/docs"

def sanitize_filename(title):
    """Convert a title to a safe filename."""
    # Remove special characters and replace spaces with hyphens
    filename = re.sub(r'[^\w\s-]', '', title)
    filename = re.sub(r'[-\s]+', '-', filename)
    return filename.lower().strip('-')

def split_markdown_by_h1(input_file, output_dir):
    """Split markdown file by h1 headings."""
    os.makedirs(output_dir, exist_ok=True)
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by h1 headings (lines starting with "# " but not "##")
    # Pattern: line starting with "# " followed by text (not "##")
    sections = []
    current_section_title = None
    current_section_lines = []
    
    lines = content.split('\n')
    
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
            elif not current_section_title and line.strip():
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
    
    print(f"Found {len(sections)} sections")
    print("-" * 50)
    
    scraped_count = 0
    failed_count = 0
    
    for title, markdown_content in sections:
        # Create filename from title
        filename = sanitize_filename(title)
        if not filename:
            filename = "untitled"
        
        full_path = os.path.join(output_dir, f"{filename}.md")
        
        print(f"Saving section: {title}")
        print(f"  File: {full_path}")
        
        try:
            # Write markdown file
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            print(f"  Saved: {full_path}")
            scraped_count += 1
        except Exception as e:
            print(f"  ERROR: Failed to save {full_path}: {e}")
            failed_count += 1
    
    print("-" * 50)
    print(f"Splitting complete!")
    print(f"  Successfully saved: {scraped_count} sections")
    print(f"  Failed: {failed_count} sections")
    print(f"  Output directory: {output_dir}/")

if __name__ == "__main__":
    split_markdown_by_h1(INPUT_FILE, OUTPUT_DIR)
