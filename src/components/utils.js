function registerSw(name) {
  const link = `/sw-${name}.js`;
  if(!'serviceWorker' in navigator) {
    console.log('Registration not attempted, navigator.serviceWorker unsupported');
    return false;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(link, {scope: '/networking/'})
      .then((reg) => {
        console.log(link + ' registered. Scope is ' + reg.scope);
      }).catch((error) => {
        console.log(link + ' registration failed. ' + error);
      });
  }
}

function preloadAssets(manifestUrl = '/manifest.json', cacheVersion = 'kitten-cache') {
  console.log('Preloading assets: ', manifestUrl);

  return Promise.all([
    fetch(manifestUrl).then(resp => resp.json()),
    caches.open(cacheVersion)
  ]).then(([assetsMap, cache]) => {
    const assets = [...Object.values(assetsMap), '/networking/'];
    console.log('Preloading assets', 'URLs', assets);
    return cache.addAll(assets);
  });
}

export default {
  registerSw,
  preloadAssets,
}