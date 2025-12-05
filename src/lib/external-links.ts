import { openUrl } from '@tauri-apps/plugin-opener';

/**
 * Opens an external URL in the system's default browser
 * @param url - The URL to open
 */
export async function openExternalLink(url: string | null | undefined): Promise<void> {
  if (!url) {
    console.warn('Cannot open external link: URL is missing');
    return;
  }

  try {
    // Check if we're in Tauri context
    if (window.__TAURI__) {
      await openUrl(url);
    } else {
      // Fallback for web browser (development)
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    console.error('Failed to open external link:', error);
    // Fallback to window.open if Tauri fails
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

