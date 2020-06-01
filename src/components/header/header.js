import { ExcelComponent } from 'core/excel-component';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  toHTML() {
    return `
			<div class="header-input">
            <img src="table-icon.png">
            <input value="New Table" type="text" class="input">
        </div>
        <div>
            <div class="button">
                <i class="material-icons"> delete_forever </i>
            </div>

            <div class="button">
                <i class="material-icons"> exit_to_app </i>
            </div>
        </div>
		`;
  }
}
