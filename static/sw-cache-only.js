const swVersion= 'cache-only';
const cacheVersion = 'kitten-cache';

self.addEventListener('install', (event) => {
  console.log(swVersion, 'install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log(swVersion, 'activate');
});

self.addEventListener('fetch', event => {
  console.log(swVersion, 'fetch', event.request.url);
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request))
  );
});
