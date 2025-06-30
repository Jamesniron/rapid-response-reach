
const CACHE_NAME = 'emergyfy-v2';
const STATIC_CACHE = 'emergyfy-static-v2';
const DYNAMIC_CACHE = 'emergyfy-dynamic-v2';

// Essential files that should always be cached
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/emergency',
  '/profile',
  '/login',
  '/register',
  '/manifest.json',
  '/favicon.ico'
];

// Assets to cache dynamically
const CACHE_STRATEGIES = {
  // Cache first for static assets
  images: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
  fonts: /\.(woff|woff2|ttf|eot)$/i,
  // Network first for API calls
  api: /\/api\//,
  // Stale while revalidate for CSS/JS
  assets: /\.(css|js)$/i
};

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') return;
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache First (for images and fonts)
    if (CACHE_STRATEGIES.images.test(url.pathname) || CACHE_STRATEGIES.fonts.test(url.pathname)) {
      return await cacheFirst(request);
    }
    
    // Strategy 2: Network First (for API calls)
    if (CACHE_STRATEGIES.api.test(url.pathname)) {
      return await networkFirst(request);
    }
    
    // Strategy 3: Stale While Revalidate (for CSS/JS assets)
    if (CACHE_STRATEGIES.assets.test(url.pathname)) {
      return await staleWhileRevalidate(request);
    }
    
    // Strategy 4: Network First with Cache Fallback (for pages)
    return await networkFirstWithFallback(request);
    
  } catch (error) {
    console.error('Fetch error:', error);
    return await getCachedResponse(request) || new Response('Offline - Please check your connection', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return await caches.match(request) || new Response('{"error": "Offline"}', {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

// Network First with Cache Fallback
async function networkFirstWithFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/') || new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Emergyfy - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 40px; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .icon { font-size: 48px; margin-bottom: 20px; }
            h1 { color: #dc2626; margin-bottom: 16px; }
            p { color: #666; margin-bottom: 24px; }
            button { background: #dc2626; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🚨</div>
            <h1>Emergyfy - Offline</h1>
            <p>You're currently offline. Some features may not be available.</p>
            <button onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }
    
    throw error;
  }
}

// Helper function to get cached response
async function getCachedResponse(request) {
  return await caches.match(request);
}

// Background sync for emergency data
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'emergency-sync') {
    event.waitUntil(syncEmergencyData());
  }
});

async function syncEmergencyData() {
  // Sync emergency contacts, location data, etc.
  console.log('Syncing emergency data...');
  // Implementation would depend on your backend API
}

// Push notifications for emergency alerts
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Emergency alert received',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/favicon.ico'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Emergyfy Emergency Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});
