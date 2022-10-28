// Klasse zur Überführung von Gitter-Indizes in Positionen und Zentrierung von Gittern

export class GridPositionCalculator {
    position: Vector2D = {x: 0, y: 0};
    numberOfRows: number = 0;
    numberOfColumns: number = 0;
    tileWidth: number = 0;
    tileHeight: number = 0;
    columnOffsetX: number = 0;
    rowOffsetY: number = 0;

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

        let x = this.position.x + (this.tileWidth + this.columnOffsetX) * index.column;
        let y = this.position.y + (this.tileHeight + this.rowOffsetY) * index.row;
        return {x: x, y: y}
    }

    getWidth(): number {
        return this.numberOfColumns * (this.tileWidth + this.columnOffsetX) - this.columnOffsetX;
    }

    getHeight(): number {
        return this.numberOfRows * (this.tileHeight + this.rowOffsetY) - this.rowOffsetY
    }

    private getCenterX(): number {
        return this.position.x + this.getWidth() / 2
    }

    private getCenterY(): number {
        return this.position.y + this.getHeight() / 2
    }

    private hasIndex(index: Index2D): boolean {
        return 0 <= index.row
            && index.row < this.numberOfRows
            && 0 <= index.column
            && index.column < this.numberOfColumns;
    }

    // TEST THIS!
    isNearGrid(position: Vector2D, margin: number): boolean {
        // This might need to be more complicated for offsets
        return position.x >= this.position.x - margin
            && position.x <= this.position.x + this.getWidth() + margin
            && position.y >= this.position.y - margin
            && position.y <= this.position.y + this.getHeight() + margin
    }

    // TEST THIS!!!
    getNearestIndexForPosition(position: Vector2D): Index2D {
        let pseudoColumnIndex = (position.x -  this.position.x)/ (this.tileWidth + this.columnOffsetX);
        let pseudoRowIndex = (position.y - this.position.y)/ (this.tileHeight + this.rowOffsetY);
        return {
            row: this.clampAndRound(pseudoRowIndex, 0, this.numberOfRows - 1),
            column: this.clampAndRound(pseudoColumnIndex, 0, this.numberOfColumns - 1)
        }
    }

    clampAndRound(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, Math.round(value)));
    }

    centerIn(parent: { x: number, y: number, width: number, height: number }) {
        let parentCenterX = parent.x + parent.width / 2
        let parentCenterY = parent.y + parent.height / 2
        let neededOffsetX = parentCenterX - this.getCenterX()
        let neededOffsetY = parentCenterY - this.getCenterY()
        this.position.x += neededOffsetX
        this.position.y += neededOffsetY
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