import './contentfulEntry';

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw-network-first.js');
}