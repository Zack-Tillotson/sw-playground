const cacheVersion = 'cache-only';

self.addEventListener('install', (event) => {
  console.log(cacheVersion, 'install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log(cacheVersion, 'activate');
});

self.addEventListener('fetch', event => {
  console.log(cacheVersion, 'fetch', event.request.url);
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request))
  );
});

setTimeout(() => console.log(self.clients), 3000)