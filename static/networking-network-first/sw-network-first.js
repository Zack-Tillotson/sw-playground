const cacheVersion = 'sw-network-first';

const filesToPreload = [
  '/networking/cash-kitten.jpg',
]

self.addEventListener('install', event => {
  console.log(cacheVersion, 'install');
  event.waitUntil(
    caches.open(cacheVersion)
      .then(cache => cache.addAll(filesToPreload))
  )
});

self.addEventListener('fetch', event => {
  console.log(cacheVersion, 'fetch');

  if(!event.request.url.endsWith('.jpg')) return;

  event.respondWith(
    fetch(event.request)
      .catch(error => {
        console.log(cacheVersion, 'fetch', 'unable to fetch, looking in cache');

        return caches
          .open(cacheVersion)
          .then(cache => cache.match(event.request))
          .then(resp => {
            if(resp) {
              console.log(cacheVersion, 'fetch', 'found response in cache, returning that');
              return resp;
            }

            throw error;
          })
        })
  )
});