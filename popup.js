// var executeCbOnAllTabs = function(cb) {
//   chrome.tabs.query({}, function(tabs) {
//     for (var i = 0; i < tabs.length; i++) {
//       chrome.tabs.executeScript(tabs[i].id, cb);
//     }
//   });
// };

var start = function() {
  window.interrobangedInterval = setInterval(window.interrobanged, 60 * 1000);
  window.interrobanged();
  console.log('start script was called');
};
var stop = function() {
  clearInterval(window.interrobangedInterval);
  console.log('stop script was called');
};

window.onload = function() {
  // var _background = chrome.extension.getBackgroundPage();
  // document.getElementById('btn-start').onclick = function() {
  //   _background.executeCbOnAllTabs(start);
  //   document.getElementById('btn-start').disabled = true;
  //   document.getElementById('btn-stop').disabled = false;
  // };
  // document.getElementById('btn-stop').onclick = function() {
  //   _background.executeCbOnAllTabs(stop);
  //   document.getElementById('btn-stop').disabled = true;
  //   document.getElementById('btn-start').disabled = false;
  // };
};
