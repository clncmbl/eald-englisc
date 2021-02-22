'use strict'

function wrapArticle() {

  const docfrag = document.createDocumentFragment()

  // Move the article element from under body to the new docfrag.
  docfrag.appendChild(document.querySelector('body>article'))

  // Create the wrapper.  Use just a simple placeholder for now.
  document.body.innerHTML = '<header>myheader in main.js</header><div id=contentcontainer></div>'

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
  console.log('DOM fully loaded and parsed')

  // Add classes before wrapping to avoid any complications
  // associated with wrapper.
  addClasses()

  wrapArticle()

  //document.body.append(document.createElement('div'))
})
