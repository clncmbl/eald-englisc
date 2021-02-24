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
  }
}

if (!customElements.get('list-grouper')) {
  console.log('defining')
  customElements.define('list-grouper', ListGrouper)
}
