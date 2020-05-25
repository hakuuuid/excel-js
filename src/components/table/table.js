import { ExcelComponent } from 'core/excel-component';
import { createTable } from 'src/components/table/table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
	  super($root, {
	  	name: 'Table',
		  listeners: ['mousedown', 'mouseup'],
	  });
	}

	toHTML() {
	  return createTable(20)
	}

	onMousedown(event) {
	  console.log('onMousedown', event.target.dataset)
	}

	onMouseup(event) {
	  console.log('onMouseup', event.target)
	}
}
