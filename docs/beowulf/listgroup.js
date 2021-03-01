'use strict'

class ListGroup extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {

    const idxMap = new WeakMap()

    const lists = this.querySelectorAll('ul, ol')

    lists.forEach(list => {
        const items = list.children
        for (let i=0; i < items.length; ++i ) {
          idxMap.set(items[i], i)
        }
      })

    this.addEventListener('mouseover', ev => {
        if (event.target.tagName === 'LI') {
          const idx = idxMap.get(event.target)
          lists.forEach(list => {
            const item = list.children[idx]
            if (item) {
              item.classList.add('idxhover')
            }
          })
        }
      })
    this.addEventListener('mouseout', ev => {
        if (event.target.tagName === 'LI') {
          let idx = idxMap.get(event.target)
          lists.forEach(list => {
            const item = list.children[idx]
            if (item) {
              item.classList.remove('idxhover')
            }
          })
        }
      })
  }
}

if (!customElements.get('list-group')) {
  customElements.define('list-group', ListGroup)
}
