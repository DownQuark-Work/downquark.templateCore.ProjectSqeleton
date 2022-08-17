console.log('options loaded')
// // Saves options to chrome.storage
// function save_options() {
//   var color = document.getElementById('color').value;
//   var autoChangeOnLoad = document.getElementById('autochange').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     autoChangeOnLoad: autoChangeOnLoad
//   }, function () {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function () {
//       status.textContent = '';
//     }, 750);
//   });
// }

// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and autoChangeOnLoad = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     autoChangeOnLoad: false
//   }, function (items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('autochange').checked = items.autoChangeOnLoad;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//   save_options);
// document.getElementById('clear').addEventListener('click',
//   function () { chrome.storage.sync.clear(); chrome.storage.sync.set({ changeColor: false, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }) });