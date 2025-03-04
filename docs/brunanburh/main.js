'use strict'

function setImportMap() {
  const url = new URL(location.href);
  const cdn = 'https://cdn.jsdelivr.net/gh/clncmbl/text-tags@main/docs/';
  const imp = document.createElement('script');
  imp.type = 'importmap';
  imp.textContent = JSON.stringify({
    "imports": {
      "TextGloss": cdn + "TextGloss/TextGloss.js"
    }
  });
  document.currentScript.after(imp);
}

setImportMap();

