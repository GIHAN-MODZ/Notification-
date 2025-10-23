self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  const options = {
    body: 'New notification detected!',
    icon: 'icon.png',
    badge: 'icon.png'
  };
  
  event.waitUntil(
    self.registration.showNotification('Notification Forwarder', options)
  );
});