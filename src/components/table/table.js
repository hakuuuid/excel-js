import {ExcelComponent} from 'core/excel-component';
import {createTable} from 'src/components/table/table.template';
import {tableResize} from 'src/components/table/table.resize';
import {
  isCell,
  isMultiSelectCell,
  shouldResize,
  matrix,
} from 'src/utils/helpers';
import {TableSelection} from 'src/utils/table-selection';
import {$} from 'src/utils/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  toHTML() {
    return createTable(50)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(event, this.$root)
    } else if (isMultiSelectCell(event)) {
      const $target = $(event.target)

      const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`))
      this.selection.selectGroup($cells)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.selection.select($target)
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowLeft',
      'ArrowDown',
      'ArrowRight',
    ]

    const { key, shiftKey } = event
    if (keys.includes(key) && !shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      // console.log($next)
      this.selection.select($next)
    }
  }
}

function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col--
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row--
      break
  }

  return `[data-id="${row}:${col}"]`
}
