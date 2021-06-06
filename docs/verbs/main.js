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

  let colmarkeridx = -1
  for (let i=0; i<lines.length; i++) {
    if (lines[i].match(/^[-\s]*-[-\s]*$/)) {
      colmarkeridx = i
      break;
    }
  }
   
  // Each lineObj is an array of matches for substrings with
  // no more than one consecutive space. Includes both the
  // substrings and their indexes (start positions) on the line.
  // TODO: Combine these first two passes into one.
  const lineObjs = lines.map(l => Array.from(l.matchAll(/\S+(?:\s\S+)*/g)))
                        .filter(arr => arr.length > 0)
  //console.log(lineObjs)

  const arrarrobj = lineObjs.map(lineMatches => lineMatches.map(m => ({ str: m[0], idx: m.index })))
  // arrarrobj is an array of arrays of string-index objects.

  //console.log(arrarrobj)

  const colstarts = arrarrobj[colmarkeridx].map(o => o.idx)
  console.log(colstarts)

  const colcount = colstarts.length

  // TODO: Need some kind of structure for rowspan tracking.
  // Try array of rows where each row is an array of integers.
  // A value of zero indicates a cell absorbed in another's
  // colspan.
  //const rowspans = []
  // Try similar but with references to objects. 
  const cellstarts = []

  //for (let a of arrarrobj) {
  arrarrobj.forEach((a, r) => {
    cellstarts[r] = new Array(colcount).fill(null)

    let revstarts = colstarts.slice().reverse()

    a.forEach((o, i) => {
      o.startcol = colcount - revstarts.findIndex(c => c <= o.idx) - 1
      o.rowspan = 1

      cellstarts[r][o.startcol] = o;
      if (i === 0 && o.startcol > 0)  {
        // TODO: Iterate across possible multiple columns.
        const ii = 0
        for (let rr = r-1; rr < 0 || cellstarts[rr][ii] !== null; --rr) {
          if (rr >= 0) {
            ++cellstarts[rr][ii].rowspan
            break;
          }
        }
      }

      // Set colspan to fill any gaps.
      if (i > 0) {
        a[i-1].colspan = o.startcol - a[i-1].startcol
      }
      // If current item is last in row but the table has more
      // columns, set colspan on current item.
      if (i === a.length - 1) {
        o.colspan = colcount - o.startcol
      }
    })
  })
  console.log(arrarrobj)
  console.log(cellstarts)

  const docfrag = document.createDocumentFragment()
  const tbl = document.createElement('table')
  docfrag.appendChild(tbl)
  document.body.append(docfrag)
  arrarrobj.forEach(r => {
      const tr = document.createElement('tr')
      tbl.append(tr)
      r.forEach(c => {
        const td = document.createElement('td')
        if (c.colspan > 1) {
          td.setAttribute('colspan', c.colspan)
        }
        if (c.rowspan > 1) {
          td.setAttribute('rowspan', c.rowspan)
        }
        td.append(c.str)
        tr.append(td)
      })
    })
}

window.addEventListener('DOMContentLoaded', async ev => {

  // Add classes before wrapping to avoid any complications
  // associated with wrapper.
  addClasses()

  await wrapInitialBodyContent()

  document.querySelectorAll('pre.simpletable')
          .forEach(el => parseSimpleTable(el))

})

