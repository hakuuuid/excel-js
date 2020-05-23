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
        console.log(this)
        throw new Error(
            `Method ${event} is not implemented in ${this.name} Component`
        )
      }
      this.$root.on(listener, this[event].bind(this))
    })
  }

  // TODO: realize delete events method
  removeDomListeners() {

  }
}
