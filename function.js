var interrobanged = function() {
  var allNodes = document.querySelectorAll('*');
  // we want to limit the types of elements changing. Specifically looking at nodes that contain use facing text
  // this is to speed up the algorithm as well as prevent us from breaking nodes like <script>
  var nodesToEdit = [
    'A',
    'P',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'PRE',
    'I',
    'B',
    'BIG',
    'SMALL',
    'EM',
    'STRONG',
    'CITE',
    'ABBR',
    'SPAN',
    'TEXTAREA',
    'DIV',
  ];
  for (var i = 0; i < allNodes.length; i++) {
    var currentNode = allNodes[i];
    var nodeTextContent = currentNode.innerText;
    var contentChanged = false;

    // if the current node is not in the list of the ones we want to edit and if the element has no children
    // then we skip it. This vastly speeds up the algorithm
    if (nodesToEdit.indexOf(currentNode.nodeName) === -1 || currentNode.childElementCount > 0) {
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
      console.log('Interrobang swap made');
      currentNode.innerText = nodeTextContent;
    }
  }
};

//TODO
// allow a element with text and a span element inside be edited
// Most elements that contain user facing text will not have children, but unfortuantely this doesn't
// account for cases like like this <p>Hello <strong>Amogh</strong>, how are you!?</p>
// a solution in the future should be thougth of

// expand nodes to edit to be a wider list, see array below
//   var nodesToEdit = ["TT", "I", "B", "BIG", "SMALL", "EM", "STRONG", "CITE", "ABBR", "ACRONYM", "SUB", "SUP", "SPAN", "BDO", "ADDRESS", "DIV", "A", "P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE", "Q", "INS", "DEL", "DT", "DD", "LI", "LABEL", "OPTION", "TEXTAREA", "FIELDSET", "LEGEND", "BUTTON", "CAPTION", "TD", "TH", "TITLE", "STYLE"];
