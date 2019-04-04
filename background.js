chrome.browserAction.onClicked.addListener(function(tab) {
  // for the current tab, inject the "function.js" file & execute it
  chrome.tabs.executeScript('function.js', () => console.log('sup'));
});
