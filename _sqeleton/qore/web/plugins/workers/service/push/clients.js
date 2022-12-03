/** USAGE @ EOF */
// Immediately take control of the page, see the 'Immediate Claim' recipe
// for a detailed explanation of the implementation of the following two
// event listeners.

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// Register event listener for the 'push' event.
self.addEventListener('push', function(event) {
  event.waitUntil(
    // Retrieve a list of the clients of this service worker.
    self.clients.matchAll().then(function(clientList) {
      // Check if there's at least one focused client.
      var focused = clientList.some(function(client) {
        return client.focused;
      });

      var notificationMessage;
      if (focused) {
        notificationMessage = 'You\'re still here, thanks!';
      } else if (clientList.length > 0) {
        notificationMessage = 'You haven\'t closed the page, ' +
                              'click here to focus it!';
      } else {
        notificationMessage = 'You have closed the page, ' +
                              'click here to re-open it!';
      }

      // Show a notification with title 'ServiceWorker Cookbook' and body depending
      // on the state of the clients of the service worker (three different bodies:
      // 1, the page is focused; 2, the page is still open but unfocused; 3, the page
      // is closed).
      return self.registration.showNotification('ServiceWorker Cookbook', {
        body: notificationMessage,
      });
    })
  );
});

// Register event listener for the 'notificationclick' event.
self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    // Retrieve a list of the clients of this service worker.
    self.clients.matchAll().then(function(clientList) {
      // If there is at least one client, focus it.
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      // Otherwise, open a new page.
      return self.clients.openWindow('../push-clients_demo.html');
    })
  );
});

/**
 * USAGE:
 * // Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');

navigator.serviceWorker.ready
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      return subscription;
    }

    // Get the server's public key
    const response = await fetch('./vapidPublicKey');
    const vapidPublicKey = await response.text();
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}).then(function(subscription) {
  // Send the subscription details to the server using the Fetch API.
  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription
    }),
  });
 */