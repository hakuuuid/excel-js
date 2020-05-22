import { DomListener } from 'core/dom-listener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }
  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }
}
