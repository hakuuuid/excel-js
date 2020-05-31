export function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function eventCreator(event) {
  if (typeof event !== 'string') {
    return ''
  }

  return 'on' + capitalize(event)
}

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function isMultiSelectCell(event) {
  return event.target.dataset.type === 'cell' && event.shiftKey
}
