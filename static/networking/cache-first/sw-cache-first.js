const cacheVersion = 'sw-cache-first';

const filesToPreload = [
  'cashKitten.jpg',
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