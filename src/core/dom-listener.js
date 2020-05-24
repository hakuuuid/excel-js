import { eventCreator } from 'src/utils/helpers';

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
      // making event type like 'onClick' way
      const event = eventCreator(listener)
      if (!this[event]) {
        throw new Error(
            `Method ${event} is not implemented in ${this.name} Component`
        )
      }
      // this[event] always has right context
      this[event] = this[event].bind(this)
      this.$root.on(listener, this[event])
    })
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      // making event type like 'onClick' way
      const event = eventCreator(listener)
      this.$root.off(listener, this[event])
    })
  }
}
