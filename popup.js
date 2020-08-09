const button = document.getElementById('insert');
const checkbox = document.getElementById('checkbox');
const intervalRow = document.getElementById('interval-row');
const select = document.getElementById('select');
const int = document.getElementById('int');

const toggleForm = () => {
  intervalRow.style.color = checkbox.checked ? '' : 'gray';
  select.disabled = !checkbox.checked;
  int.disabled = !checkbox.checked;
  chrome.storage.local.set({ interrobangedActive: checkbox.checked });
};

button.addEventListener('click', e => {
  e.preventDefault();
  chrome.tabs.query({ active: true }, tabs => {
    console.log('test');
    chrome.tabs.sendMessage(tabs[0].id, { interrobangedRun: true });
  });

  chrome.storage.local.set({ interrobangedRun: true });
});

const changeTiming = () => {
  if (int.value.length > 3) return;
  let time = parseInt(int.value) * 1000 * (select.value === 'minutes' ? 60 : 1);
  if (time <= 0) return;
  if (time > 7200000) time = 7200000;

  chrome.tabs.query({}, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { interrobangedIntervalTime: time });
    });
  });

  chrome.storage.local.set({ interrobangedIntervalTime: time });
};

select.addEventListener('change', changeTiming);
int.addEventListener('change', changeTiming);
checkbox.addEventListener('change', toggleForm);

chrome.storage.local.get(['interrobangedActive'], ({ interrobangedActive }) => {
  if (interrobangedActive) {
    checkbox.checked = true;
  }
  toggleForm();
});
