export async function fetchYoutubeTitle(url: string): Promise<string | null> {
  try {
    // Using noembed.com as a CORS-friendly proxy for OEmbed data
    const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.title || null;
  } catch (error) {
    console.warn(`Failed to fetch title for ${url}`, error);
    return null;
  }
}

