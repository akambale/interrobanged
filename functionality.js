console.log('extension JS file init');
var interrobanged = function() {
  console.log('interrobang function called');
  var allNodes = document.querySelectorAll('*');
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

    // if the current node is not in the list of the ones we want to edit and if the element has no children
    if (nodesToEdit.indexOf(allNodes[i].nodeName) === -1 || currentNode.childElementCount > 0) {
      continue;
    }

    var nodeTextContent = currentNode.innerText;
    var changed = false;

    while (true) {
      var index = nodeTextContent.indexOf('!?');
      if (index === -1) {
        index = nodeTextContent.indexOf('?!');
      }

      if (index === -1) {
        break;
      } else {
        changed = true;
        nodeTextContent = nodeTextContent.slice(0, index) + '‽' + nodeTextContent.slice(index + 2);
      }
    }
    if (changed) {
      console.log('interrobang swap made');
      currentNode.innerText = nodeTextContent;
    }
  }
};
setTimeout(interrobanged, 5000);
var interrobangedInterval = setInterval(interrobanged, 5 * 60 * 100);

//TODO
// allow a element with text and a span element inside be edited
// expand nodes to edit to be a wider list, see array below
//   var nodesToEdit = ["TT", "I", "B", "BIG", "SMALL", "EM", "STRONG", "CITE", "ABBR", "ACRONYM", "SUB", "SUP", "SPAN", "BDO", "ADDRESS", "DIV", "A", "P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE", "Q", "INS", "DEL", "DT", "DD", "LI", "LABEL", "OPTION", "TEXTAREA", "FIELDSET", "LEGEND", "BUTTON", "CAPTION", "TD", "TH", "TITLE", "STYLE"];
