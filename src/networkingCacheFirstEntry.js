import './contentfulEntry';

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw-cache-first.js');
}