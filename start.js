var interrobanged = function() {
  function moveCursorToEndOfInput(el) {
    if (typeof el.selectionStart === 'number') {
      el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange !== 'undefined') {
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
    }
  }

  // TODO function doesn't seem to work as intended. Need to debug further
  function moveCursorToEndOfContenteditable(ele) {
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(ele); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(ele); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  }

  var contentChangeCount = 0;
  var allNodes = document.querySelectorAll('*');
  // we want to limit the types of elements changing. Specifically looking at nodes that contain use facing text
  // this is to speed up the algorithm as well as prevent us from breaking nodes like <script>
  var nodesToEdit = [
    'TT',
    'I',
    'B',
    'BIG',
    'SMALL',
    'EM',
    'STRONG',
    'CITE',
    'ABBR',
    'SUB',
    'SUP',
    'SPAN',
    'DIV',
    'A',
    'P',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'PRE',
    'Q',
    'INS',
    'DEL',
    'DT',
    'DD',
    'LI',
    'LABEL',
    'OPTION',
    'TEXTAREA',
    'LEGEND',
    'BUTTON',
    'CAPTION',
    'TD',
    'TH',
    'TITLE',
    'INPUT',
  ];

  for (var i = 0; i < allNodes.length; i++) {
    var currentNode = allNodes[i];
    var nodeTextContent = currentNode.innerText;
    var contentChanged = false;

    // for inputs, we need to change the value property
    // instead of the inner text
    if (currentNode.nodeName === 'INPUT') {
      nodeTextContent = currentNode.value;
    }

    // if the current node is not in the list of the ones we want to edit, or if the
    // element has no inner text, or if the node has children, then we skip it. It's
    // too risky changing nodes that are tied to the function of the site. The lowest
    // level ones are typically display and text editable level elements, which is
    // what we should focus on changing. We lose the ability to be able to change
    // an element like this: <p>Hello <strong>Amogh</strong>!?</p> but that is an ok
    // compromise. Having this many filters will also significantly reduce time to
    // preform action.
    if (
      nodesToEdit.indexOf(currentNode.nodeName) === -1 ||
      nodeTextContent.length === 0 ||
      currentNode.childElementCount > 0
    ) {
      continue;
    }

    while (true) {
      var index = nodeTextContent.indexOf('!?');
      // if target string is not found, switch to alternative target string
      if (index === -1) {
        index = nodeTextContent.indexOf('?!');
      }

      // if neither target string is found, break out of loop
      if (index === -1) {
        break;
      } else {
        contentChanged = true;
        nodeTextContent = nodeTextContent.slice(0, index) + '‽' + nodeTextContent.slice(index + 2);
      }
    }

    // only modify text of node if a change was made
    if (contentChanged) {
      contentChangeCount++;
      if (currentNode.nodeName === 'INPUT' || currentNode.nodeName === 'TEXTAREA') {
        currentNode.value = nodeTextContent;
        if (document.activeElement === currentNode) {
          moveCursorToEndOfInput(currentNode);
        }
      } else {
        currentNode.innerText = nodeTextContent;
        if (document.activeElement === currentNode) {
          moveCursorToEndOfContenteditable(currentNode);
        }
      }
    }
  }

  if (contentChangeCount > 0) {
    console.log(contentChangeCount + ' Interrobang swaps made');
  }
};

interrobangedInterval = setInterval(interrobanged, 60 * 1000);
interrobanged();
