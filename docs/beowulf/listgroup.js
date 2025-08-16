'use strict'

// TODO: Account for possibility of nested lists.

class ListGroup extends HTMLElement {

  #mouseOutHandler
  #mouseOverHandler
  #clickHandler

  selectedIdx = null

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

    this.addEventListener('mouseover', this.#mouseOverHandler = ev => {
        if (ev.target.tagName === 'LI') {
          const idx = idxMap.get(ev.target)
          lists.forEach(list => {
            list.children[idx]?.classList.add('idxhover')
          })
        }
      })

    this.addEventListener('mouseout', this.#mouseOutHandler = ev => {
        if (ev.target.tagName === 'LI') {
          const idx = idxMap.get(ev.target)
          lists.forEach(list => {
            list.children[idx]?.classList.remove('idxhover')
          })
        }
      })

    this.addEventListener('click', this.#clickHandler = ev => {
        if ((ev.target.tagName === 'LI') && 
            (window.getSelection().type != 'Range')) {
          let idx = idxMap.get(ev.target)
          if (idx === this.selectedIdx) {
            lists.forEach(list => {
              list.children[idx]?.classList.remove('idxselected')              
            })
            this.selectedIdx = null
          } else {  // idx !== selectedIdx
            lists.forEach(list => {
              list.children[this.selectedIdx]?.classList.remove('idxselected')
              list.children[idx]?.classList.add('idxselected')
            })  
            this.selectedIdx = idx            
          }
        } 
      })
  }

  disconnectedCallback() {
    this.removeEventListener('mouseout', this.#mouseOutHandler)
    this.removeEventListener('mouseover', this.#mouseOverHandler)
    this.removeEventListener('click', this.#clickHandler)
  }
}

if (!customElements.get('list-group')) {
  customElements.define('list-group', ListGroup)
}
