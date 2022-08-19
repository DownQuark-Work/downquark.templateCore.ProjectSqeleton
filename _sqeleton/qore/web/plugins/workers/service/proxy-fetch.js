// [Working example](/serviceworker-cookbook/fetching/).
/*
USAGE:
// Checking if service worker is registered. If it's not, register it
// and reload the page to be sure the client is under service worker's control.
navigator.serviceWorker.getRegistration().then(function(registration) {
  if (!registration || !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('Service worker registered, reloading the page');
      window.location.reload();
    });
  } else {
    console.log('DEBUG: client is under the control of service worker');
    proceed();
  }
});
*/

// Create a proxy for all requests to the local urls containing a
// `cookbook-proxy` string.
self.onfetch = function(event) {
  if (event.request.url.includes('cookbook-proxy')) {
    var init = { method: 'GET',
                mode: event.request.mode,
                cache: 'default' };
    var url = event.request.url.split('cookbook-proxy/')[1];
    // console.log('DEBUG: proxying', url);
    event.respondWith(fetch(url, init));
  } else {
    event.respondWith(fetch(event.request));
  }
};