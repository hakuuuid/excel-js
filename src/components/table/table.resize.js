import { $ } from 'src/utils/dom';

export function tableResize(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cols = $resizer.dataAtt.resize === 'col'
  const cells = $root.findAll(`[data-col="${$parent.dataAtt.col}"]`)
  document.onmousemove = (e) => {
    $resizer.styles({
      opacity: 1,
    })

    const delta = cols
      ? e.pageX - coords.right
      : e.pageY - coords.bottom
    const value = cols
      ? coords.width + delta + 'px'
      : coords.height + delta + 'px'

    cols
      ? $parent.styles({width: value})
      : $parent.styles({height: value})

    cells.forEach((el) => {
      el.style.width = coords.width + delta + 'px'
      el.style.borderRight = '1px solid #3c74ff'
    })
  }

  document.onmouseup = (e) => {
    document.onmousemove = null

    cells.forEach((el) => {
      el.style.borderRight = '1px solid #e2e3e3'
    })
    $resizer.styles({
      opacity: 0,
    })
  }
}
