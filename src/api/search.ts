export class SearchAPI {
  static #BASE_URL = "http://localhost:4000";
  static #ENDPOINT = "sick";

  static async get(value: string) {
    const URI = `${this.#BASE_URL}/${this.#ENDPOINT}?q=${value}`;

    const cache = await caches.open("test");
    const responseCache = await cache.match(URI);

    if (responseCache) {
      const cacheData = await responseCache.clone().json();
      return cacheData;
    }

    if (responseCache === undefined) {
      const response = await fetch(URI);
      const data = await response.clone().json();

      if (response?.ok) {
        cache.put(URI, response);
      }

      console.info("calling api");
      return data;
    }
  }
}
