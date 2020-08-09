const bang = () => {
  recurse(document.body);
};

const recurse = node => {
  if (node.hasChildNodes()) {
    node.childNodes.forEach(n => recurse(n));
  } else {
    const { changed, newStr } = replace(node.textContent);
    if (changed) {
      node.textContent = newStr;
    }
  }
};

const replace = str => {
  let newStr = '';
  let changed = false;

  for (let i = 0; i < str.length; i++) {
    if (
      (str[i] === '!' && str[i + 1] === '?') ||
      (str[i] === '?' && str[i + 1] === '!')
    ) {
      newStr += '‽';
      changed = true;
      i++;
    } else {
      newStr += str[i];
    }
  }
  return { changed, newStr };
};

let interrobangedIntervalId;

chrome.runtime.onMessage.addListener(
  ({ interrobangedIntervalTime, interrobangedRun }) => {
    console.log('message received');

    // if run, reset old interval, and run it now
    if (interrobangedRun) {
      clearTimeout(interrobangedIntervalId);
      bang();
      chrome.storage.local.get(
        ['interrobangedIntervalTime'],
        ({ interrobangedIntervalTime }) => {
          interrobangedIntervalId = setInterval(
            bang,
            interrobangedIntervalTime || 60000,
          );
        },
      );
    }
    // if interval, cancel old interval, run it now and start new interval
    clearTimeout(interrobangedIntervalId);
    bang();
    interrobangedIntervalId = setInterval(bang, interrobangedIntervalTime);
  },
);

chrome.storage.local.get(
  ['interrobangedIntervalTime', 'interrobangedActive'],
  ({ interrobangedIntervalTime, interrobangedActive }) => {
    if (!interrobangedActive) return;
    bang();
    interrobangedIntervalId = setInterval(
      bang,
      interrobangedIntervalTime || 60000,
    );
  },
);
