/**
 * Smart Home Nerd - Service Worker
 * PWA Lite: Offline-Fähigkeit & Caching
 */

const CACHE_NAME = 'shn-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/setup.html',
  '/impressum.html',
  '/datenschutz.html',
  '/css/style.css',
  '/assets/images/logo-new.png',
  '/assets/images/logo-new.webp',
  '/assets/images/favicon.png'
];

// Install: Cache wichtige Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => {
        console.log('[SW] Cache failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-First Strategie
self.addEventListener('fetch', (event) => {
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache-Treffer -> direkt liefern
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Kein Cache -> Netzwerk
        return fetch(event.request)
          .then((networkResponse) => {
            // Valid response?
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Im Cache speichern für später
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
            return networkResponse;
          })
          .catch(() => {
            // Offline & nicht im Cache -> Fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
