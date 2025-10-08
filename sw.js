// Service Worker Ti Presto Genoa 1893 v2.1.0
const CACHE_NAME = 'ti-presto-genoa-v2.1.0';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/toast.js',
  '/pw-simple.js',
  '/manifest.json',
  '/logo-ufficiale-genoa-cfc.png',
  '/img/genoa.png',
  '/img/lazio.png',
  '/img/inter.png',
  '/img/milan.png',
  '/img/juventus.png',
  '/img/napoli.png',
  '/img/roma.png',
  '/img/atalanta.png',
  '/img/fiorentina.png',
  '/img/bologna.png',
  '/img/torino.png',
  '/img/udinese.png',
  '/img/verona.png',
  '/img/lecce.png',
  '/img/parma.png',
  '/img/cagliari.png',
  '/img/como.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js'
];

// Installa Service Worker
self.addEventListener('install', (event) => {
  console.log('🔴⚪ Ti Presto SW: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🔴⚪ Ti Presto SW: Caching app shell');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('🔴⚪ Ti Presto SW: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('🔴⚪ Ti Presto SW: Installation failed', error);
      })
  );
});

// Attiva Service Worker
self.addEventListener('activate', (event) => {
  console.log('🔴⚪ Ti Presto SW: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🔴⚪ Ti Presto SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('🔴⚪ Ti Presto SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Intercetta richieste di rete
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Firebase and external APIs
  if (event.request.url.includes('firebaseapp.com') || 
      event.request.url.includes('googleapis.com') ||
      event.request.url.includes('emailjs.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('🔴⚪ Ti Presto SW: Serving from cache', event.request.url);
          return response;
        }
        
        // Fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response for caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // Return offline fallback for images
            if (event.request.destination === 'image') {
              return caches.match('/logo-ufficiale-genoa-cfc.png');
            }
          });
      })
  );
});

// Gestisci notifiche push
self.addEventListener('push', (event) => {
  console.log('🔴⚪ Ti Presto SW: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nuovo aggiornamento da Ti Presto Genoa!',
    icon: '/logo-ufficiale-genoa-cfc.png',
    badge: '/logo-ufficiale-genoa-cfc.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Vai al sito',
        icon: '/logo-ufficiale-genoa-cfc.png'
      },
      {
        action: 'close',
        title: 'Chiudi',
        icon: '/logo-ufficiale-genoa-cfc.png'
      }
    ],
    tag: 'ti-presto-notification',
    requireInteraction: false
  };
  
  event.waitUntil(
    self.registration.showNotification('🔴⚪ Ti Presto Genoa', options)
  );
});

// Gestisci click su notifiche
self.addEventListener('notificationclick', (event) => {
  console.log('🔴⚪ Ti Presto SW: Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Notification closed
  } else {
    // Default action - open app
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Background sync
self.addEventListener('sync', (event) => {
  console.log('🔴⚪ Ti Presto SW: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData()
    );
  }
});

// Funzione per sincronizzare dati offline
async function syncOfflineData() {
  try {
    // Sync feedback data
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const unsyncedFeedbacks = feedbacks.filter(f => !f.synced);
    
    if (unsyncedFeedbacks.length > 0) {
      console.log('🔴⚪ Ti Presto SW: Syncing offline feedback data');
      // Here you would sync with Firebase
    }
    
    // Sync analytics data
    const analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    if (analytics.length > 0) {
      console.log('🔴⚪ Ti Presto SW: Syncing analytics data');
      // Here you would sync with Firebase
    }
    
  } catch (error) {
    console.error('🔴⚪ Ti Presto SW: Sync failed', error);
  }
}

// Messaggio dal main thread
self.addEventListener('message', (event) => {
  console.log('🔴⚪ Ti Presto SW: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({version: CACHE_NAME});
  }
});

console.log('🔴⚪ Ti Presto SW: Service Worker loaded successfully!');