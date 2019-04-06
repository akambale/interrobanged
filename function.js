var interrobanged = function() {
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
        console.log(currentNode.nodeName);
        contentChanged = true;
        nodeTextContent = nodeTextContent.slice(0, index) + '‽' + nodeTextContent.slice(index + 2);
      }
    }

    // only modify text of node if a change was made
    if (contentChanged) {
      console.log(nodeTextContent);
      contentChangeCount++;
      currentNode.innerText = nodeTextContent;
    }
  }
  if (contentChangeCount > 0) {
    console.log(contentChangeCount, ' Interrobang swaps made');
  }
};
