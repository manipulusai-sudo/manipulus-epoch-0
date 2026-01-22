const CACHE_NAME = 'manipulus-epoch-0-v12';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching Assets');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(e.request);
        })
    );
});
