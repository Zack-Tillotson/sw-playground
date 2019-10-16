const swVersion = 'network-first-with-cache';
const cacheVersion = 'kitten-cache';

self.addEventListener('install', (event) => {
  console.log(swVersion, 'install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  console.log(swVersion, 'fetch');
  event.respondWith(
    fetch(event.request)
      .then(resp => {
        console.log(swVersion, 'fetch', 'got response, caching it');
        return caches
          .open(cacheVersion)
          .then(cache => cache.put(event.request, resp.clone()))
          .then(() => resp);
      })
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
  );
});