chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.executeScript(tabs[i].id, { file: 'function.js' });
    }
  });
});
