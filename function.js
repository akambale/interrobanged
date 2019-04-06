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

    // if the current node is not in the list of the ones we want to edit
    // and if the element has no inner text then we skip it.
    if (
      nodesToEdit.indexOf(currentNode.nodeName) === -1 ||
      nodeTextContent.length === 0 ||
      nodeTextContent.length > 3000
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
