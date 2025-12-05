// AMSilks Offline Service Worker
const CACHE_NAME = 'amsilks-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html'
];

// Install Event - Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch Event - Serve from Cache if Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cache if available, else fetch from net
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both fail (offline & not in cache), return index
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});