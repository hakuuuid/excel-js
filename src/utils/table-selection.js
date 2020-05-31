export class TableSelection {
  constructor() {
    this.group = []
  }

  select($element) {
    this.clear()
    this.group.push($element)
    $element.addClass('selected')
  }

  clear() {
    this.group.forEach(($element) => $element.removeClass('selected'))
    this.group = []
  }

  selectGroup($element) {
    this.group.push($element)
    $element.addClass('selected')
  }
}
