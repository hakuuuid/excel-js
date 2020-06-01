import {className} from "../constants/constants";

export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }

  select($element) {
    this.clear()
    $element.addClass(className)
    this.group.push($element)
    this.current = $element
  }

  clear() {
    this.group.forEach(($element) => $element.removeClass(className))
    this.group = []
  }

  selectGroup($element) {
    this.clear()
  }
}
