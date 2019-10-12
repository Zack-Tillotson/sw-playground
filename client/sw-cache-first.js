const cacheVersion = 'cache-first';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  console.log(cacheVersion, 'fetch');
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request))
      .then(resp => {
        if(resp) {
          console.log(cacheVersion, 'fetch', 'found response in cache, returning that');
          return resp;
        }

        console.log(cacheVersion, 'fetch', 'didn\'t find response in cache, doing fetch');
        return fetch(event.request);
      })
  )
});