import { ExcelComponent } from 'core/excel-component';

export class Formula extends ExcelComponent {
	static className = 'excel__formula'
	constructor($root) {
	  super($root, {
    	name: 'Formula',
	    listeners: ['input'],
	  });
	}

	toHTML() {
	  return `
			<div class="info">fx</div>
    	<div class="vertical-line"></div>
    	<div class="input" contenteditable spellcheck="false"></div>
		`
	}

	onInput(event) {
	  console.log(event)
	}
}
