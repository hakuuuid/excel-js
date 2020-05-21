import { ExcelComponent } from 'core/excel-component';

export class Formula extends ExcelComponent {
	static className = 'excel__formula'

	toHTML() {
	  return `
			<div class="info">fx</div>
    	<div class="vertical-line"></div>
    	<div class="input" contenteditable spellcheck="false"></div>
		`
	}
}
