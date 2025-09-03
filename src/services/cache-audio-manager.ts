const AUDIO_CACHE = "audio-tracks-v1";

class AudioCacheManager {
  async saveBlobToCache(url: string, blob: Blob): Promise<void> {
    const cache = await caches.open(AUDIO_CACHE);

    const response = new Response(blob, {
      headers: { "Content-Type": "audio/mp3" },
    });

    await cache.put(url, response);
  }

  async getBlobFromCache(url: string): Promise<Blob | null> {
    const cache = await caches.open(AUDIO_CACHE);
    const response = await cache.match(url);

    if (!response) {
      return null;
    }

    return response.blob();
  }

  async isFileInCache(url: string): Promise<boolean> {
    const cache = await caches.open(AUDIO_CACHE);
    const response = await cache.match(url);

    return !!response;
  }
}

export const audioCacheManager = new AudioCacheManager();
