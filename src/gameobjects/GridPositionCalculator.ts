export class GridPositionCalculator {
    position: Vector2D = {x: 0, y: 0};
    numberOfRows: number = 0;
    numberOfColumns: number = 0;
    tileWidth: number = 0;
    tileHeight: number = 0;
    columnOffsetX: number = 0;
    columnOffsetY: number = 0;
    rowOffsetX: number = 0;
    rowOffsetY: number = 0;
    alternateColumnOffsetY: boolean = false;
    alternateRowOffsetX: boolean = false;

    constructor(numberOfRows: number, numberOfColumns: number) {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns
    }

    set x(newX: number) {
        this.position.x = newX
    }

    set y(newY: number) {
        this.position.y = newY
    }

    getPositionForIndex(index: Index2D): Vector2D {
        if (!this.hasIndex(index)) {
            throw Error(`Index ${index} is out of grid range.`)
        }

        let rowOffsetX = this.alternateRowOffsetX ? (index.row % 2) * this.rowOffsetX : index.row * this.rowOffsetX;
        let columnOffsetY = this.alternateColumnOffsetY ? (index.column % 2) * this.columnOffsetY : index.column * this.columnOffsetY;
        let x = this.position.x + (this.tileWidth + this.columnOffsetX) * index.column + rowOffsetX;
        let y = this.position.y + (this.tileHeight + this.rowOffsetY) * index.row + columnOffsetY;
        return {x: x, y: y}

    }

    private hasIndex(index: Index2D): boolean {
        return 0 <= index.row
            && index.row < this.numberOfRows
            && 0 <= index.column
            && index.column < this.numberOfColumns;
    }

}

export type Vector2D = {
    x: number,
    y: number
}

export type Index2D = {
    row: number,
    column: number
}