import {GridSlot} from "./GridSlot";
import {Container, Sprite} from "pixi.js";
import {GridItem} from "./GridItem";
import {Texture} from "@pixi/core";
import {clampAndRound, Index2D, quadDistance, Vector2D} from "../../General/Helpers";

export class Grid extends Container {

    id?: string
    private slots: (GridSlot | null)[][] = [];
    private numberOfRows: number = 0;
    private numberOfColumns: number = 0;
    private defaultSlotTexture?: Texture;
    tileWidth: number = 0;
    tileHeight: number = 0;
    columnOffsetX: number = 0;
    rowOffsetY: number = 0;
    private sprite?: Sprite
    private MARGIN_OF_ATTRACTION: number = 100;

    constructor(numberOfRows: number, numberOfColumns: number = numberOfRows, id?: string) {
        super()
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns
        this.slots = this.setupNullArray(this.numberOfRows, this.numberOfColumns);
        this.id = id
        this.sortableChildren = true
    }

    setSprite(sprite: Sprite) {
        this.sprite = sprite;
        this.sprite.zIndex = 0
        this.addChild(this.sprite)
    }

    setDefaultSlotTexture(texture: Texture) {
        this.defaultSlotTexture = texture
    }

    getWidth(): number {
        return (this.numberOfColumns - 1) * (this.tileWidth + this.columnOffsetX);
    }

    getHeight(): number {
        return (this.numberOfRows - 1) * (this.tileHeight + this.rowOffsetY);
    }

    hasIndex(index: Index2D): boolean {
        let validRowIndex = 0 <= index.row && index.row <= this.getNumberOfRows() - 1;
        let validColumnIndex = 0 <= index.column && index.column <= this.getNumberOfColumns() - 1;
        return validRowIndex && validColumnIndex;
    }

    getLocalPositionForIndex(index: Index2D): Vector2D {
        if (!this.hasIndex(index)) {
            throw Error(`Index ${index} is out of grid range.`)
        }

        let x = (this.tileWidth + this.columnOffsetX) * index.column;
        let y = (this.tileHeight + this.rowOffsetY) * index.row;
        return {x: x, y: y}
    }

    getGlobalPositionForIndex(index: Index2D): Vector2D {
        let local = this.getLocalPositionForIndex(index)
        return {x: this.position.x + local.x, y: this.position.y + local.y}
    }

    attracts(position: Vector2D) {
        return this.attractsPosition(position, this.MARGIN_OF_ATTRACTION)
    }

    getNearestIndexForPosition(position: Vector2D): Index2D {
        let pseudoColumnIndex = (position.x - this.position.x) / (this.tileWidth + this.columnOffsetX);
        let pseudoRowIndex = (position.y - this.position.y) / (this.tileHeight + this.rowOffsetY);
        return {
            row: clampAndRound(pseudoRowIndex, 0, this.numberOfRows - 1),
            column: clampAndRound(pseudoColumnIndex, 0, this.numberOfColumns - 1)
        }
    }

    getAllIndices(sortingFunction?: (a: Index2D, b: Index2D) => number): Index2D[] {
        let result = [];
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                result.push({row: row, column: column})
            }
        }
        if (sortingFunction) {
            return result.sort(sortingFunction)
        }
        return result
    }

    // Bisschen Gurke, aber geht
    getAllItems(): GridItem[] {
        let items: GridItem[] = []
        this.getAllIndices()
            .map(index => this.get(index))
            .map(slot => {
                if (slot && slot.gridItem && items.indexOf(slot.gridItem) == -1) {
                    items.push(slot.gridItem)
                }
            })
        return items
    }

    tidyUp(): void {
        let items = this.getAllItems()
        for (let item of items) {
            let nearestFreeSpot = this.getNearestFreeIndexForPositionAndItem(this.position, item)
            if (nearestFreeSpot) {
                item.trySetToIndex(this, nearestFreeSpot)
            } else {
                throw Error("No more space in thid grid!")
            }
        }
    }

    getNearestFreeIndexForPositionAndItem(mousePosition: Vector2D, item: GridItem): Index2D | null {
        let nearestIndicesForPosition = this.getNearestIndicesForPosition(mousePosition);
        for (let nearIndex of nearestIndicesForPosition) {
            if (item.canBeSetToIndexInGrid(this, nearIndex)) {
                return nearIndex;
            }
        }
        return null
    }

    getCenterX(): number {
        return this.position.x + this.getWidth() / 2
    }

    getCenterY(): number {
        return this.position.y + this.getHeight() / 2
    }

    private attractsPosition(position: Vector2D, margin: number): boolean {
        // This might need to be more complicated for offsets
        return position.x >= this.position.x - margin
            && position.x <= this.position.x + this.getWidth() + margin
            && position.y >= this.position.y - margin
            && position.y <= this.position.y + this.getHeight() + margin
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

    drawGrid() {
        this.iterateThroughPositions((index: Index2D) => {
            let position = this.getLocalPositionForIndex(index)
            let sprite = new Sprite(this.defaultSlotTexture)
            sprite.position = position
            sprite.zIndex = 0
            sprite.anchor.set(0.5)
            this.addChild(sprite)
        })

    }

    getNumberOfRows(): number {
        return this.slots.length;
    }

    getNumberOfColumns(): number {
        return this.slots[0].length;
    }

    get(index: Index2D): GridSlot | null {
        return this.slots[index.row][index.column];
    }

    set(index: Index2D, item: GridSlot | null): void {
        this.slots[index.row][index.column] = item;
    }

    remove(index: Index2D): GridSlot | null {
        let item = this.slots[index.row][index.column];
        this.set(index, null)
        return item
    }

    isFreeAt(index: Index2D): boolean {
        return this.get(index) === null;
    }

    toString(): string {
        let result = "";
        for (let row of this.slots) {
            result += "[" + (row[0] ? "x" : " ");
            for (let indexOfRow = 1; indexOfRow < row.length; indexOfRow++) {
                result += "|" + (row[indexOfRow] ? "x" : " ")
            }
            result += "]\n"
        }
        return result.trim()
    }

    private getNearestIndicesForPosition(mousePosition: Vector2D): Index2D[] {
        let nearestIndex = this.getNearestIndexForPosition(mousePosition);
        return this.getAllIndices((a, b) => (quadDistance(nearestIndex, a) - quadDistance(nearestIndex, b)))
    }

    projectPointToGridBorder(mousePosition: Vector2D): Vector2D {
        let left = this.position.x - this.MARGIN_OF_ATTRACTION
        let right = this.position.x + this.getWidth() + this.MARGIN_OF_ATTRACTION
        let top = this.position.y - this.MARGIN_OF_ATTRACTION
        let bottom = this.position.y + this.getHeight() + this.MARGIN_OF_ATTRACTION

        let x = clampAndRound(mousePosition.x, left, right)
        let y = clampAndRound(mousePosition.y, top, bottom)

        let dLeft = Math.abs(x - left)
        let dRight = Math.abs(x - right)
        let dTop = Math.abs(y - top)
        let dBottom = Math.abs(y - bottom)
        let dMin = Math.min(dLeft, dRight, dTop, dBottom)

        if (dMin == dTop) {
            return {x: x, y: top}
        }
        if (dMin == dBottom) {
            return {x: x, y: bottom}
        }
        if (dMin == dLeft) {
            return {x: left, y: y}
        }
        return {x: right, y: y}
    }
}