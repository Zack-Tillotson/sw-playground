const cacheVersion = `core`
const timeToWaitForFetch = 500; // ms

function shouldHandleUrl(request) {
  const {url, referrer} = request;
  if(!referrer || url.split('/').slice(0, 3).join('/') === referrer.split('/').slice(0, 3).join('/')) return true;
  if(url.startsWith('https://images.ctfassets.net')) return true;
  if(url.startsWith('https://cdn.contentful.com')) return true;
  if(url.startsWith('https://images.ctfassets.net')) return true;
  if(url.startsWith('https://videos.ctfassets.net')) return true;
  return false;
}

// Prefer network requests but fall back to a cached response if it exists
self.addEventListener('fetch', event => {
  try {
    if(!shouldHandleUrl(event.request)) return;

    const fetchPromise = fetch(event.request);
    event.respondWith(
      Promise.race([
        fetchPromise
          .catch(() => null)
          .then(response => {
            if(!response)
              return new Promise((resolve, reject) => setTimeout(reject, timeToWaitForFetch))

            const clonedResponse = response.clone();
            return caches.open(cacheVersion)
              .then(cache => cache.put(event.request, clonedResponse))
              .catch()
              .then(() => response.clone())
          }),
        new Promise(resolve => setTimeout(resolve, timeToWaitForFetch))
          .then(() => caches.open(cacheVersion))
          .then(cache => cache.match(event.request))
          .then(cachedResponse => cachedResponse || fetchPromise)
      ])
    )
  } catch(e) {}
});