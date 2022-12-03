/** Check whether {column} and {row} fit in {rectangle} boundaries */
export function fitsInRectangle(column: number, row: number, rectangle?: {column:number,row:number,height:number,width:number}): boolean {
  if (!rectangle) return true;
  return column.fits(rectangle.column, rectangle.column + rectangle.width) &&
    row.fits(rectangle.row, rectangle.row + rectangle.height);
}