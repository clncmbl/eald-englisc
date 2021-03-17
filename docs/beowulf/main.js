'use strict'

//import { ListGroup } from './listgroup.js'

document.head.innerHTML += `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="main.css?v=1">`

async function wrapArticle() {

  const docfrag = document.createDocumentFragment()

  // Move the article element from under body to the new docfrag.
  docfrag.appendChild(document.querySelector('body>article'))

  // Create the wrapper.  Use just a simple placeholder for now.
  //document.body.innerHTML = '<header>myheader in main.js</header><div id=contentcontainer></div>'


  // Try using fetch to get the wrapper html.
  const response = await fetch('wrapper.html')
  const html = await response.text()
  // TODO: Use response.ok, response.status, others(?) to help with error handling.
  document.body.innerHTML = html


  // Now move the original article (in the docfrag) to
  // contentcontainer.
  document.getElementById('contentcontainer').appendChild(docfrag)
}

function addClassesByQuerySelector(selector, classes) {
  // classes can be either an array of class names or a single
  // class name string.
  classes = Array.isArray(classes) ? classes : [ classes ]

  document.querySelectorAll(selector)
          .forEach(el => el.classList.add(...classes))
} 

function addClasses() {
  addClassesByQuerySelector('.words td:nth-child(1)',
                            ['oe', 'oe-word'])

  addClassesByQuerySelector('pre, .words td:nth-child(4)', 'oe')
}

window.addEventListener('DOMContentLoaded', async ev => {

  // Add classes before wrapping to avoid any complications
  // associated with wrapper.
  addClasses()

  await wrapArticle()

  // Dynamic import here prevents applying the change twice (once
  // before wrapArticle and again after).
  import('./listgroup.js')

  //if (!customElements.get('list-group')) {
  //  console.log('defining')
  //  customElements.define('list-group', ListGroup)
  //}
})
