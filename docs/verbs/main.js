'use strict'

document.head.innerHTML += `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="main.css?v=1">`


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

function parseSimpleTable(srcElem) {
  /*
   * colseparator = spacechar, { spacechar }+
   * headendline = hyphens, { colseparator, hyphens } eol
   * printableseq = { printable }+
   * cellcontent = printableseq, { spacechar, printableseq }
   * headrow = cellcontent, { colseparator, cellcontent }
   * headline = headrow, eol
   * bodyrow = cellcontent, { colseparator, cellcontent }
   * bodyline = bodyrow, eol
   * body = { bodyline }
   * head =  [ headline ], headendline
   * table =  head, body 
   */
  //console.log(srcElem.innerHTML)
  const lines = srcElem.innerHTML.split(/\r\n|\r|\n/g)
  console.log(lines)
  //const lineObjs = lines.map(l => Array.from(l.matchAll(/\w\w+(.*)/g)))
  //const lineObjs = lines.map(l => Array.from(l.matchAll(/(?:^\s*|\s\s+)(\S+(?:\s\S+)*)/g))) // Might be good enough.
  //const lineObjs = lines.map(l => Array.from(l.matchAll(/(?<=^\s*|\s\s+)\S+(?:\s\S+)*/g)))
   
  // Each lineObj is an array of matches for substrings with
  // no more than one consecutive space. Includes both the
  // substrings and their indexes (start positions) on the line.
  const lineObjs = lines.map(l => Array.from(l.matchAll(/\S+(?:\s\S+)*/g)))
  console.log(lineObjs)

  const arrarrarr = lineObjs.map(lineMatches => lineMatches.map(m => [ m[0], m.index ]))

  console.log(arrarrarr)

}

window.addEventListener('DOMContentLoaded', async ev => {

  // Add classes before wrapping to avoid any complications
  // associated with wrapper.
  addClasses()

  await wrapInitialBodyContent()

  document.querySelectorAll('pre.simpletable')
          .forEach(el => parseSimpleTable(el))

})

