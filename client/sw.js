// Test 1: Install the SW using a manifest to handle all of our
// assets we want to preload.
const manifestUrl = 'manifest.json';
const cacheVersion = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      fetch(manifestUrl).then(resp => resp.json()),
      caches.open(cacheVersion)
    ]).then(([manifest, cache]) => {
      return cache.addAll([...manifest.routes, manifest.assets]);
    })
  )
});