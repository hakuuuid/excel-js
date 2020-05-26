import { ExcelComponent } from 'core/excel-component';
import { createTable } from 'src/components/table/table.template';
import { tableResize } from 'src/components/table/table.resize';
import { shouldResize } from 'src/utils/helpers';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(50)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(event, this.$root)
    }
  }
}

