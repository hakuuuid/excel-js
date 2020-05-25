import { CHAR_CODE } from 'src/constants/constants';

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODE.A + index)
}

function createCell(content) {
  return `
   <div class="cell" contenteditable>${content}</div>
  `
}

function createColumn(col) {
  return `
   <div class="column">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row">
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
