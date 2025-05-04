'use strict'

function setImportMap() {
  const url = new URL(location.href);
  const cdn = 'https://cdn.jsdelivr.net/gh/clncmbl/text-tags@main/docs/';
  const imp = document.createElement('script');
  imp.type = 'importmap';
  imp.textContent = JSON.stringify({
    "imports": {
      "disableTextGloss": cdn + "TextGloss/TextGloss.js",
      "TextGloss": "/text-tags/TextGloss/TextGloss.js"
    }
  });
  document.currentScript.after(imp);
}

setImportMap();

// Appending to head.innerHTML apparently must happen after any calls
// to currentScript.after.  Otherwise, the currentScript.after call
// does not work.
document.head.innerHTML += `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="main.css" blocking="render">
`;

async function wrapArticle() {
  const docfrag = document.createDocumentFragment();
  docfrag.appendChild(document.querySelector('body>article'));

  const response = await fetch('wrapper.html');
  const html = await response.text();
  document.body.innerHTML = html;

  document.getElementById('contentcontainer').appendChild(docfrag);
  document.body.style.visibility = 'visible';
}

window.addEventListener('DOMContentLoaded', async ev => {
  await wrapArticle();
  import('TextGloss');
});

