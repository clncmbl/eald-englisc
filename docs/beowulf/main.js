'use strict'

window.addEventListener('DOMContentLoaded', async ev => {
  console.log('DOM fully loaded and parsed')

  const docfrag = document.createDocumentFragment()
  docfrag.appendChild(document.querySelector('body>article'))

  document.body.innerHTML = '<header>myheader in main.js</header><div id=contentcontainer></div>'

  document.getElementById('contentcontainer').appendChild(docfrag)

  document.body.append(document.createElement('div'))

})
