import { CHAR_CODE } from 'src/constants/constants';

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODE.A + index)
}

function createCell(_, col) {
  return `
   <div class="cell" data-col="${col}" contenteditable></div>
  `
}

function createColumn(col, index) {
  return `
   <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rows = 10) {
  const colsCount = CHAR_CODE.Z - CHAR_CODE.A + 1
  const rowsArray = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  rowsArray.push(createRow('', cols))

  for ( let i = 0; i < rows; i++) {
    // to start rows from 1
    rowsArray.push(createRow(i + 1, cells))
  }

  return rowsArray.join('')
}
