// Klasse zur Überführung von Gitter-Indizes in Positionen und Zentrierung von Gittern

import {GridSlot} from "./GridSlot";
import {Container, Graphics} from "pixi.js";

export class Grid extends Container {

    private items: (GridSlot | null)[][] = [];
    numberOfRows: number = 0;
    numberOfColumns: number = 0;
    tileWidth: number = 0;
    tileHeight: number = 0;
    columnOffsetX: number = 0;
    rowOffsetY: number = 0;
    private MARGIN_OF_ATTRACTION: number = 50;

    constructor(numberOfRows: number, numberOfColumns: number = numberOfRows) {
        super()
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns
        this.items = this.setupNullArray(this.numberOfRows, this.numberOfColumns);
    }

    getGlobalPositionForIndex(index: Index2D): Vector2D {
        let local = this.getLocalPositionForIndex(index)
        return {x: this.position.x + local.x, y: this.position.y + local.y}
    }

    getLocalPositionForIndex(index: Index2D): Vector2D {
        if (!this.hasIndex(index)) {
            throw Error(`Index ${index} is out of grid range.`)
        }

        let x = (this.tileWidth + this.columnOffsetX) * index.column;
        let y = (this.tileHeight + this.rowOffsetY) * index.row;
        return {x: x, y: y}
    }

    getWidth(): number {
        return (this.numberOfColumns - 1) * (this.tileWidth + this.columnOffsetX);
    }

    getHeight(): number {
        return (this.numberOfRows - 1) * (this.tileHeight + this.rowOffsetY);
    }

    private getCenterX(): number {
        return this.position.x + this.getWidth() / 2
    }

    private getCenterY(): number {
        return this.position.y + this.getHeight() / 2
    }

    hasIndex(index: Index2D): boolean {
        let validRowIndex = 0 <= index.row && index.row <= this.getNumberOfRows() - 1;
        let validColumnIndex = 0 <= index.column && index.column <= this.getNumberOfColumns() - 1;
        return validRowIndex && validColumnIndex;
    }

    // TEST THIS!
    private attractsPosition(position: Vector2D, margin: number): boolean {
        // This might need to be more complicated for offsets
        return position.x >= this.position.x - margin
            && position.x <= this.position.x + this.getWidth() + margin
            && position.y >= this.position.y - margin
            && position.y <= this.position.y + this.getHeight() + margin
    }

    attracts(position: Vector2D) {
        return this.attractsPosition(position, this.MARGIN_OF_ATTRACTION)
    }

    // TEST THIS!!!
    getNearestIndexForPosition(position: Vector2D): Index2D {
        let pseudoColumnIndex = (position.x - this.position.x) / (this.tileWidth + this.columnOffsetX);
        let pseudoRowIndex = (position.y - this.position.y) / (this.tileHeight + this.rowOffsetY);
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

    private iterateThroughPositions(func: (pos: Index2D) => void): void {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfColumns; col++) {
                func({row: row, column: col})
            }
        }
    }

    drawGridPoints() {
        let graphics = new Graphics()
        graphics.lineStyle(3, 0xFFFFFF, 0.5);
        this.iterateThroughPositions((index: Index2D) => {
            let position = this.getLocalPositionForIndex(index)
            graphics.drawCircle(position.x, position.y, 10)

        })
        this.addChild(graphics)
    }


    private setupNullArray(numberRows: number, numberColumns: number): null[][] {
        let items: null[][] = []
        for (let rowIndex = 0; rowIndex < numberRows; rowIndex++) {
            items[rowIndex] = []
            for (let columnIndex = 0; columnIndex < numberColumns; columnIndex++) {
                items[rowIndex].push(null)
            }
        }
        return items;
    }

    static hasGridDimension(items: any[][]): boolean {
        if (items.length === 0 || items[0].length === 0) {
            return false;
        }

        let firstColumnNumber = items[0].length;
        for (let rowIndex = 1; rowIndex < items.length; rowIndex++) {
            if (items[rowIndex].length !== firstColumnNumber) {
                return false;
            }
        }

        return true;
    }

    getNumberOfRows(): number {
        return this.items.length;
    }

    getNumberOfColumns(): number {
        return this.items[0].length;
    }

    get(index: Index2D): GridSlot | null {
        return this.items[index.row][index.column];
    }

    set(index: Index2D, item: GridSlot | null): void {
        this.items[index.row][index.column] = item;
    }

    remove(index: Index2D): GridSlot | null {
        let item = this.items[index.row][index.column];
        this.set(index, null)
        return item
    }

    isFreeAt(index: Index2D): boolean {
        return this.get(index) === null;
    }

    toString(): string {
        let result = "";
        for (let row of this.items) {
            result += "[ " + (row[0] ?  "x" : " ");
            for (let indexOfRow = 1; indexOfRow < row.length; indexOfRow++) {
                result += " | " + (row[indexOfRow] ?  "x" : " ")
            }
            result += " ]\n"
        }
        return result
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