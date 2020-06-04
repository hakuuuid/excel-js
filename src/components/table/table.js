import {ExcelComponent} from 'core/excel-component';
import {createTable} from 'src/components/table/table.template';
import {tableResize} from 'src/components/table/table.resize';
import {
  isCell,
  isMultiSelectCell,
  shouldResize,
  matrix,
  nextSelector,
} from 'src/utils/helpers';
import {TableSelection} from 'src/utils/table-selection';
import {$} from 'src/utils/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$on('blabla', (text) => {
      this.selection.current.textContent(text)
    })
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
      this.selection.select($next)
    }
  }
}
