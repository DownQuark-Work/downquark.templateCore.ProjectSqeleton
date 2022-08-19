// Register the ServiceWorker
navigator.serviceWorker.register('serviceworker.js', {
  scope: '.'
}).then(function(registration) {
  console.log('The service worker has been registered ', registration);
});