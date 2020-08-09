chrome.runtime.onMessage.addListener(r => console.log(r));

// // when a tab starts
// chrome.tabs.onUpdated.addListener(function () {
//   // loops through all tabs
//   chrome.tabs.query({}, function (tabs) {
//     for (var i = 0; i < tabs.length; i++) {
//       // if script is on, start it on the tab
//       chrome.storage.local.get(['scriptRunning'], function (object) {
//         if (object.scriptRunning) {
//           chrome.tabs.executeScript(tabs[i].id, { file: 'start.js' });
//           // manages icon, switching it to on
//           chrome.browserAction.setIcon({
//             path: 'icon-on.png',
//             tabId: tabs[i].id,
//           });
//         }
//       });
//     }
//   });
// });

// // icon click
// chrome.browserAction.onClicked.addListener(function (unusedTabVar) {
//   // see if script is running
//   chrome.storage.local.get(['scriptRunning'], function (object) {
//     // if so, query all the tabs and loop through them
//     chrome.tabs.query({}, function (tabs) {
//       for (var i = 0; i < tabs.length; i++) {
//         // if it's running stop it. If not, start it
//         if (object.scriptRunning) {
//           chrome.tabs.executeScript(tabs[i].id, { file: 'stop.js' });
//           chrome.storage.local.set({ scriptRunning: false });

//           // manages icon, switching it to off
//           chrome.browserAction.setIcon({
//             path: 'icon-off.png',
//             tabId: tabs[i].id,
//           });
//         } else {
//           chrome.tabs.executeScript(tabs[i].id, { file: 'start.js' });
//           chrome.storage.local.set({ scriptRunning: true });

//           // manages icon, switching it to on
//           chrome.browserAction.setIcon({
//             path: 'icon-on.png',
//             tabId: tabs[i].id,
//           });
//         }
//       }
//     });
//   });
// });
