/** USAGE @ EOF */
// TODO: https://github.com/mdn/serviceworker-cookbook/blob/master/push-subscription-management/index.js

// Listen to `push` notification event. Define the text to be displayed
// and show the notification.
self.addEventListener('push', function(event) {
  event.waitUntil(self.registration.showNotification('ServiceWorker Cookbook', {
    body: 'Push Notification Subscription Management'
  }));
});

// Listen to  `pushsubscriptionchange` event which is fired when
// subscription expires. Subscribe again and register the new subscription
// in the server by sending a POST request with endpoint. Real world
// application would probably use also user identification.
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
      return fetch('register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });
    })
  );
});

/** USAGE:
 * // Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');

// When the Service Worker is ready, enable the UI (button),
// and see if we already have a subscription set up.
navigator.serviceWorker.ready
.then(function(registration) {
  console.log('service worker registered');
  subscriptionButton.removeAttribute('disabled');

  return registration.pushManager.getSubscription();
}).then(function(subscription) {
  if (subscription) {
    console.log('Already subscribed', subscription.endpoint);
    setUnsubscribeButton();
  } else {
    setSubscribeButton();
  }
});
 */