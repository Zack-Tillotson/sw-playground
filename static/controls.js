console.log('controls.js');

function registerSw(link) {
  if(!'serviceWorker' in navigator) {
    console.log('Registration not attempted, navigator.serviceWorker unsupported');
    return false;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(link, {scope: '/app/'})
      .then((reg) => {
        console.log(link + ' registered. Scope is ' + reg.scope);
      }).catch((error) => {
        console.log(link + ' registration failed. ' + error);
      });
  }
}

function preloadAssets(manifestUrl, cacheVersion) {
  console.log('Preloading assets: ', manifestUrl);

  return Promise.all([
    fetch(manifestUrl).then(resp => resp.json()),
    caches.open(cacheVersion)
  ]).then(([manifest, cache]) => {
    const assets = [...manifest.routes, ...manifest.assets];
    console.log('Assets: ', assets);
    return cache.addAll(assets);
  });
}

document.getElementById('preload-assets').addEventListener('click', preloadAssets.bind(null, 'manifest.json', 'cache-only'));
document.getElementById('sw-cache-only').addEventListener('click', registerSw.bind(null, 'sw-cache-only.js'));
document.getElementById('sw-cache-first').addEventListener('click', registerSw.bind(null, 'sw-cache-first.js'));