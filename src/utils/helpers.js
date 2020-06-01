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

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index )
}

export function matrix(target, current) {
  const tar = target.id(true)
  const cur = current.id(true)

  const cols = range(cur.col, tar.col)
  const rows = range(cur.row, tar.row)

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc;
  }, [])
}
