class Interrobanged {
  constructor() {
    this.inputs = new Set();
    this.contentEdits = new Set();
    
    const oneMinute = 60 * 1000;

    this.intervalIds = [
      setInterval(this.updateTextNodes, oneMinute),
      setInterval(this.addBlurHandlerToInputs, oneMinute),
      setInterval(this.addBlurHandlerToContenteditable, oneMinute),
    ];

    this.updateTextNodes();
    this.addBlurHandlerToInputs();
    this.addBlurHandlerToContenteditable();
  }

  clearAllIntervals() {
    this.intervalIds.forEach(clearInterval);
  }

  replaceStr(text, contentChanged = false) {
    while (true) {
      let index = text.indexOf('!?');
      // if target string is not found, switch to alternative target string
      if (index === -1) {
        index = text.indexOf('?!');
      }

      // if neither target string is found, break out of loop
      if (index === -1) {
        break;
      } else {
        contentChanged = true;
        text = text.slice(0, index) + '‽' + text.slice(index + 2);
      }
    }
    return {text, contentChanged};
  }

  textNodesUnder(el) {
    let node;
    const arr = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while(node=walk.nextNode()) {
      arr.push(node);
    }
    return arr;
  }

  updateTextNodes() {
    const allNodes = this.textNodesUnder(document.body)

    for (let i = 0; i < allNodes.length; i++) {
      const currentNode = allNodes[i];

      // don't edit script inner text or content editable
      if (currentNode.isContentEditable) continue;
      if (currentNode.parentElement.nodeName === 'SCRIPT') continue;

      const nodeTextContent = currentNode.textContent;


      const results = this.replaceStr(nodeTextContent);
      
      if (results.contentChanged) {
        currentNode.textContent = results.text;
      }
    }
  }

  addBlurHandlerToInputs() {
    const context = this;
    document.querySelectorAll('input[type=text], textarea').forEach(node => {
      if (context.inputs.has(node)) return;
      context.inputs.add(node);

      node.addEventListener('blur', e => {
        var results = context.replaceStr(e.target.value);
    
        if (results.contentChanged) {
          e.target.value = results.text;
        }
      });
    });
  }

  addBlurHandlerToContenteditable() {
    const context = this;
    document.querySelectorAll('[contenteditable=true]').forEach(node => {
      if (context.contentEdits.has(node)) return;
      context.contentEdits.add(node);

      const textNodes = context.textNodesUnder(node);
      textNodes.forEach(currentNode => {
        currentNode.addEventListener('blur', e => {
          const results = context.replaceStr(e.target.textContent);

          if (results.contentChanged) {
            e.target.textContent = results.text;
          }
        });
      });
    });
  }
}

window.interrobanged = new Interrobanged();
