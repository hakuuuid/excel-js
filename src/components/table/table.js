import {ExcelComponent} from 'core/excel-component';
import {createTable} from 'src/components/table/table.template';
import {tableResize} from 'src/components/table/table.resize';
import {isCell, isMultiSelectCell, shouldResize} from 'src/utils/helpers';
import {TableSelection} from 'src/utils/table-selection';
import {$} from 'src/utils/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
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
      this.selection.selectGroup($target)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.selection.select($target)
    }
  }
}
