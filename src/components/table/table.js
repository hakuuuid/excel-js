import { ExcelComponent } from 'core/excel-component';
import {createTable} from 'src/components/table/table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table'

	toHTML() {
	  return createTable(20)
	}
}
