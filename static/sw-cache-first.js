const swVersion = 'cache-first';
const cacheVersion = 'kitten-cache';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  console.log(swVersion, 'fetch');
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request))
      .then(resp => {
        if(resp) {
          console.log(swVersion, 'fetch', 'found response in cache, returning that');
          return resp;
        }

        console.log(swVersion, 'fetch', 'didn\'t find response in cache, doing fetch');
        return fetch(event.request);
      })
  )
});