'use strict'

console.log('In listgrouper.js')

//export
class ListGrouper extends HTMLElement {
  constructor() {
    super()
    console.log('In constructor')
  }

  connectedCallback() {
    console.log('connected')
    //console.log(this.innerHTML)

    const idxMap = new WeakMap()

    const lists = this.querySelectorAll('ul, ol')

    lists.forEach(list => {
        const items = list.children
        for (let i=0; i < items.length; ++i ) {
          idxMap.set(items[i], i)
          console.log(i)
        }
      })

    this.addEventListener('mouseover', ev => {
        if (event.target.tagName === 'LI') {
          const idx = idxMap.get(event.target)
          lists.forEach(list => {
            const item = list.children[idx]
            // Any difference in perceived responsiveness
            // using class vs direct styling?  Not that
            // I can see.
            item.style.color = 'blue'
            item.classList.add('idxhover')
          })
          //event.target.style.color = 'blue'
          //console.log(event.target.value)
        }
      })
    this.addEventListener('mouseout', ev => {
        if (event.target.tagName === 'LI') {
          let idx = idxMap.get(event.target)
          lists.forEach(list => {
            const item = list.children[idx]
            item.style.color = 'red'
            item.classList.remove('idxhover')
          })
          //event.target.style.color = 'red'
        }
      })
  }
}

if (!customElements.get('list-grouper')) {
  console.log('defining')
  customElements.define('list-grouper', ListGrouper)
}
