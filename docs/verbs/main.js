'use strict'

function setImportMap() {
  const url = new URL(location.href)
  const cdn = 'https://cdn.jsdelivr.net/gh/clncmbl/text-tags@main/docs/'
  const im = document.createElement('script')
  im.type = 'importmap'
  im.textContent = JSON.stringify({
    "imports": {
      "TextTable": cdn + "TextTable/TextTable.js"
    }
  })
  document.currentScript.after(im)
}

setImportMap()

document.currentScript.insertAdjacentHTML('afterend', `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="main.css" blocking="render">
  `)

async function wrapInitialBodyContent() {

  const docfrag = document.createDocumentFragment()

  // Move the article element from under body to the new docfrag.
  for (let child of Array.from(document.body.childNodes)) {
    docfrag.appendChild(child)
  }

  // Create the wrapper.  Use just a simple placeholder for now.
  //document.body.innerHTML = '<header>myheader in main.js</header><div id=contentcontainer></div>'

  // Try using fetch to get the wrapper html.
  const response = await fetch('wrapper.html')
  const html = await response.text()
  // TODO: Use response.ok, response.status, others(?) to help with error handling.
  document.body.innerHTML = html

  // Now move the original body content (in the docfrag) to
  // contentcontainer.
  document.getElementById('contentcontainer').append(docfrag)
}

function addClasses() {
}

window.addEventListener('DOMContentLoaded', async ev => {

  // Add classes before wrapping to avoid any complications
  // associated with wrapper.
  addClasses()

  await wrapInitialBodyContent()

  //document.querySelectorAll('pre.simpletable')
  //        .forEach(el => parseSimpleTable(el))

})

