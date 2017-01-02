var CACHE_NAME = 'v1::iClient';
var urlsToCache = [
    '/',
    '/index.html',
    '/dist/bundle.min.js',
    '/favicons/favicon-16x16.png',
    'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-with-addons.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.8.1/ReactRouter.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
self.addEventListener('fetch', function(event) {
    var requestURL = new URL(event.request.url);

    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                if (response && !navigator.onLine) {
                    return response;
                }
                return fetch(event.request).then(function(response) {
                    if (response.ok) {
                        cache.put(event.request, response.clone()).catch(function(error) {
                            return new Response("Request failed!");
                        });
                    }
                    return response;
                }).catch(function(e) {
                    return new Response("Request failed!");
                });
            });
        })
    );
});

