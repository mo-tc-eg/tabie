importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCSG6BPDaD-jrPYlUAHkOFfSnYKW0AmkuE",
  authDomain: "tabie-eff44.firebaseapp.com",
  projectId: "tabie-eff44",
  storageBucket: "tabie-eff44.firebasestorage.app",
  messagingSenderId: "356449051334",
  appId: "1:356449051334:web:0373245426e3b4cb3e6dc7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message:', payload);
  const title = payload.notification?.title || 'رسالة جديدة';
  const options = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || 'https://png.pngtree.com/png-clipart/20240310/original/pngtree-isolated-open-book-sticker-png-image_14553639.png',
    badge: 'https://png.pngtree.com/png-clipart/20240310/original/pngtree-isolated-open-book-sticker-png-image_14553639.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});