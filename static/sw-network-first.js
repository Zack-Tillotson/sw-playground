const swVersion = 'network-first';
const cacheVersion = 'kitten-cache';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  console.log(swVersion, 'fetch');
  event.respondWith(
    fetch(event.request)
      .catch(error => {
        console.log(swVersion, 'fetch', 'unable to fetch, looking in cache');
        return caches
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
        })
  )
});