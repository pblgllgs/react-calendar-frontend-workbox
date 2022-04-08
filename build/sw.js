/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute([{"revision":"5c16055e6722182be7fd3cda52946170","url":"asset-manifest.json"},{"revision":"6e1267d9d946b0236cdf6ffd02890894","url":"favicon.ico"},{"revision":"351d7c33e00be6d2e3e6cc92118f14cb","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"364f7120402fb60bf2eb0920ddd51842","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"d630bc4afeb81983a8732437f0923bbc","url":"static/css/2.b78d1cb3.chunk.css"},{"revision":"bbc95a31aee05ce9e3b158a0678416b7","url":"static/css/main.96703769.chunk.css"},{"revision":"4449850776aec1bbc9963b635b5ab4a7","url":"static/js/2.99c8b1de.chunk.js"},{"revision":"2783cb611cfe78d22f7194d9d4695716","url":"static/js/2.99c8b1de.chunk.js.LICENSE.txt"},{"revision":"8d74bb473ac29e1a1fbbf005f336f234","url":"static/js/main.8ce5df02.chunk.js"},{"revision":"3f2b05edffeb6b5cda9e5ad8a8f08976","url":"static/js/runtime-main.c2afc8cc.js"}]);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheNetworkFirst = ['/api/auth/renew', '/api/events'];

registerRoute(
  ({request, url}) => {
    if (cacheNetworkFirst.includes(url.pathname)) return true;
    return false;
  },
  new NetworkFirst()
);


// registerRoute(
//   new RegExp('http://localhost:4000/api/auth/renew'),
//   new NetworkFirst()
// );

// registerRoute(
//   new RegExp('http://localhost:4000/api/events'),
//   new NetworkFirst()
// );

const cacheNetworkfirstResources = [
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css',
];

registerRoute(({ request, url }) => {
  if (cacheNetworkfirstResources.includes(url.href)) {
    return true;
  }
  return false;
}, new CacheFirst());


// registerRoute(
//   new RegExp(
//     'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
//   ),
//   new CacheFirst()
// );

// registerRoute(
//   new RegExp(
//     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
//   ),
//   new CacheFirst()
// );

//OFFLINE

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-online', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
);

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
);