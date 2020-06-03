import {className} from '../constants/constants';

export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }

  select($element) {
    this.clear()
    $element.focus().addClass(className)
    this.group.push($element)
    this.current = $element
  }

  clear() {
    this.group.forEach(($element) => $element.removeClass(className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach(($el) => $el.addClass(className))
  }
}
