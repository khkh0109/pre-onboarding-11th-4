const BASE_URL = "http://localhost:4000";
const ENDPOINT = "sick";

async function fetchData(value: string, cache: Cache) {
  const URI = `${BASE_URL}/${ENDPOINT}?q=${value}`;

  const response = await fetch(URI);
  const data = await response.clone().json();

  if (response?.ok) {
    const cacheData = {
      data: data,
      expiresAt: Date.now() + 1000 * 60 * 5,
    };

    cache.put(URI, new Response(JSON.stringify(cacheData)));
  }

  console.info("calling api");
  return data;
}

export const searchAPI = {
  async get(value: string) {
    const URI = `${BASE_URL}/${ENDPOINT}?q=${value}`;

    const cache = await caches.open("test");
    const responseCache = await cache.match(URI);

    if (responseCache) {
      const cacheData = await responseCache.clone().json();

      if (Date.now() < cacheData.expiresAt) {
        return cacheData.data;
      } else {
        cache.delete(URI);
        return fetchData(value, cache);
      }
    }

    if (responseCache === undefined) {
      return fetchData(value, cache);
    }
  },
};
