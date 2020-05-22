export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Element $root didn\'t initialize')
    }

    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      this.$root.on(this.listeners, () => this['onInput'])
    })
  }

  on(listener) {

  }

  removeDomListeners() {

  }
}
