import {ExcelComponent} from 'core/excel-component';
import {createTable} from 'src/components/table/table.template';
import {$} from 'src/utils/dom';

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
	  super($root, {
	    name: 'Table',
	    listeners: ['mousedown'],
	  });
	}

	toHTML() {
	  return createTable(20)
	}

	onMousedown(event) {
	  console.log(event.target.dataset)
	  if (event.target.dataset.resize) {
	    const $resizer = $(event.target)
	    const $parent = $resizer.closest('[data-type="resizable"]')
	    const coords = $parent.getCoords()
	    const cols = $resizer.dataAtt.resize === 'col'
		  const cells = this.$root.findAll(`[data-col="${$parent.dataAtt.col}"]`)
	    document.onmousemove = (e) => {
		    const delta = cols
			    ? e.pageX - coords.right
			    : e.pageY - coords.bottom
		    const value = cols
			    ? coords.width + delta + 'px'
			    : coords.height + delta + 'px'

		    cols
					? $parent.styles({ width: value } )
					: $parent.styles({ height: value } )

		    cells.forEach((el) => el.style.width = coords.width + delta + 'px')
	    }

	    document.onmouseup = (e) => {
	      document.onmousemove = null
	    }
	  }
	}

	onMouseup(event) {
	  console.log('onMouseup', event.target)
	}
}

