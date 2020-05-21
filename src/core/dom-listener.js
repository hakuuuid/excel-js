export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('Element $root didn\'t initialize')
    }

    this.$root = $root
  }
}
