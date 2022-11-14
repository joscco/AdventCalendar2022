// A multiGridSlot holds together different grid slots (for more complex forms)
// These hold references to the moving "items" which are displayed
// Contains:
// - the form of the brick
// - a potential offset for x and y
// - one display item
// Anchor is always on top left

// Calls the position stuff and collects it
// Inits the drag and Drop

// A Shape like
// [
//  [0, 0, 1],
//  [1, 1, 1]
// ] describes a tetris-L-brick
import {GridSlot} from "./GridSlot";
import {Grid} from "./Grid";
import {DisplayObject} from "pixi.js";
import gsap from "gsap";
import {Machine} from "../Machinery/Machine";
import {Index2D, vectorAdd, Vector2D, indexAdd} from "../../General/Helpers";

type MultiSlotArr = (GridSlot | null)[][]
type GridAdaptingDisplayObject = DisplayObject

export class GridItem {
    // This is realized as a map since a gridItem could have different forms in different grids
    // (e.g. 1x1 in inventory and nxm in a "real" grid)
    gridSlotsMap: Map<Grid, MultiSlotArr> = new Map<Grid, MultiSlotArr>()
    defaultSlotArr: MultiSlotArr;
    content: GridAdaptingDisplayObject
    currentGrid?: Grid
    currentIndex?: Index2D
    aim: Vector2D
    locked: boolean = false

    dragging: boolean = false
    dragOffset: Vector2D = {x: 0, y: 0}

    constructor(content: GridAdaptingDisplayObject,
                startGrid: Grid,
                index: Index2D,
                shape: number[][] = [[1]]) {

        this.content = content

        if (!GridItem.isValidShape(shape)) {
            throw Error(`Shape ${shape} has no valid format!`)
        } else {
            this.defaultSlotArr = this.initSlotsFromShape(shape)
        }

        this.aim = {x: this.content.position.x, y: this.content.position.y}
        this.trySetToIndexInstantly(startGrid, index)
    }

    canBeSetToIndexInGrid(grid?: Grid, index?: Index2D): boolean {
        if (!grid || !index) {
            return true;
        }

        return this.andThroughSlots(slot => {
            let shiftedIndex = {row: index.row + slot.row, column: index.column + slot.column}
            return grid.hasIndex(shiftedIndex) && (this.hasIndex(shiftedIndex, grid) || grid.isFreeAt(shiftedIndex))
        }, grid)
    }

    freeFromGrid() {
        if (this.currentGrid) {
            this.iterateThroughSlots((slot: GridSlot) => {
                let shiftedIndex = {
                    row: this.currentIndex!.row + slot.row,
                    column: this.currentIndex!.column + slot.column
                }
                this.currentGrid!.remove(shiftedIndex);
            }, this.currentGrid)
            this.currentIndex = undefined
            this.currentGrid = undefined
        }
    }

    private async moveToIndex(grid: Grid, index: Index2D): Promise<void> {
        this.freeFromGrid()
        this.updateIndex(grid, index);
        this.updateGrid(grid)
        let newAim = grid.getGlobalPositionForIndex(index)
        await this.updateAim(newAim)
    }

    private setToIndex(grid: Grid, index: Index2D): void {
        this.freeFromGrid()
        this.updateIndex(grid, index);
        this.updateGrid(grid)
        this.setContentTo(grid.getGlobalPositionForIndex(index))
    }

    private updateIndex(grid: Grid, index: Index2D) {
        this.iterateThroughSlots((slot: GridSlot) => {
            grid.set({row: index.row + slot.row, column: index.column + slot.column}, slot);
        }, grid)
        this.currentIndex = index
    }

    async trySlideToIndex(grid: Grid, index: Index2D) {
        let nextAdjacent = this.findNextAdjacentFor(index)
        return await this.trySetToIndex(grid, nextAdjacent)
    }

    async trySetToIndex(grid: Grid, index: Index2D): Promise<boolean> {
        if (this.canBeSetToIndexInGrid(grid, index)) {
            await this.moveToIndex(grid, index)
            return true;
        }
        return false;
    }

    trySetToIndexInstantly(grid: Grid, index: Index2D) {
        if (this.canBeSetToIndexInGrid(grid, index)) {
            this.setToIndex(grid, index)
            return true;
        }
        return false;
    }

    async updateAim(position: Vector2D) {
        let distance = GridItem.quadDistance(position, this.aim)
        this.aim = {x: position.x, y: position.y}
        if (distance > 500) {
            await this.moveTo(this.aim)
        } else if (distance > 2) {
            this.setContentTo(position)
        }
    }

    updateGrid(newGrid: Grid) {
        this.currentGrid = newGrid
        if (this.content instanceof Machine) {
            this.content.setGrid(newGrid)
        }
    }

    scaleUp() {
        gsap.to(this.content.scale, {
            x: 1.05,
            y: 1.05,
            duration: 0.3,
            ease: Quart.easeInOut
        })
    }

    scaleDown() {
        gsap.to(this.content.scale, {
            x: 1,
            y: 1,
            duration: 0.3,
            ease: Quart.easeInOut
        })
    }

    private async moveTo(position: Vector2D) {
        await gsap.to(this.content.position, {
            x: position.x,
            y: position.y,
            duration: 0.1,
            ease: Sine.easeInOut
        })
    }

    private setContentTo(position: Vector2D) {
        this.content.position = position
    }

    addShape(grid: Grid, shape: number[][]) {
        if (!GridItem.isValidShape(shape)) {
            throw Error(`Shape ${shape} has no valid format!`)
        }
        this.gridSlotsMap.set(grid, this.initSlotsFromShape(shape))
    }

    private iterateThroughSlots(func: (slot: GridSlot) => void, currentGrid: Grid): void {
        let currentGridSlots: (GridSlot | null)[][] = this.defaultSlotArr
        if (this.isValidGridId(currentGrid)) {
            currentGridSlots = this.gridSlotsMap.get(currentGrid)!
        }

        for (let row = 0; row < currentGridSlots.length; row++) {
            for (let col = 0; col < currentGridSlots[0].length; col++) {
                if (currentGridSlots[row][col]) {
                    func(currentGridSlots[row][col]!)
                }
            }
        }
    }

    andThroughSlots(func: (slot: GridSlot) => boolean, currentGrid: Grid): boolean {
        let currentGridSlots: (GridSlot | null)[][] = this.defaultSlotArr
        if (this.isValidGridId(currentGrid)) {
            currentGridSlots = this.gridSlotsMap.get(currentGrid)!
        }

        let result: boolean = true
        for (let row = 0; row < currentGridSlots.length; row++) {
            for (let col = 0; col < currentGridSlots[0].length; col++) {
                if (currentGridSlots[row][col]) {
                    result &&= func(currentGridSlots[row][col]!)
                }
            }
        }
        return result;
    }

    orThroughSlots(func: (slot: GridSlot) => boolean, currentGrid: Grid): boolean {
        let currentGridSlots: (GridSlot | null)[][] = this.defaultSlotArr
        if (this.isValidGridId(currentGrid)) {
            currentGridSlots = this.gridSlotsMap.get(currentGrid)!
        }

        let result: boolean = false
        for (let row = 0; row < currentGridSlots.length; row++) {
            for (let col = 0; col < currentGridSlots[0].length; col++) {
                if (currentGridSlots[row][col]) {
                    result ||= func(currentGridSlots[row][col]!)
                }
            }
        }
        return result;
    }

    private static isValidShape(shape: number[][]): boolean {
        return GridItem.isRectangular(shape) && GridItem.onlyContainsZerosAndOnes(shape)
    }

    private static isRectangular(shape: number[][]): boolean {
        if (!shape || shape.length === 0 || shape[0].length === 0) {
            return false
        }

        let firstRowLength: number = shape[0].length;

        for (let row = 1; row < shape.length; row++) {
            if (shape[row].length !== firstRowLength) {
                return false;
            }
        }
        return true;
    }

    private static onlyContainsZerosAndOnes(shape: number[][]): boolean {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] !== 0 && shape[row][col] !== 1) {
                    return false;
                }
            }
        }
        return true;
    }

    private initSlotsFromShape(shape: number[][]): MultiSlotArr {
        let slotArr: MultiSlotArr = [];
        for (let row = 0; row < shape.length; row++) {
            let newRow: (GridSlot | null)[] = []
            slotArr.push(newRow);
            for (let col = 0; col < shape[0].length; col++) {
                newRow.push(shape[row][col] === 1 ? new GridSlot(row, col, this) : null)
            }
        }
        return slotArr;
    }

    private isValidGridId(grid: Grid) {
        return this.gridSlotsMap.has(grid);
    }

    defineTapDragAndDrop(onPointerDown: (mousePos: Vector2D, item: GridItem) => void,
                         onPointerMove: (mousePos: Vector2D, item: GridItem) => void,
                         onPointerUp: (mousePos: Vector2D, item: GridItem) => void,
                         onPointerTap: (mousePos: Vector2D, item: GridItem) => void) {

        let pointerDown = false
        this.content.interactive = true
        this.content.cursor = "pointer"

        this.content.on("pointerover", () => {
            this.scaleUp()
        })

        this.content.on("pointerout", () => {
            this.scaleDown()
        })


        this.content.on("pointerdown", (event) => {
            pointerDown = true
            let mousePosition: Vector2D = event.data.global
            this.dragOffset = {
                x: this.content.x - mousePosition.x,
                y: this.content.y - mousePosition.y
            }

            // Give pointerDown a small offset so that double-clicking doesn't interfere
            setTimeout(() => {
                if (pointerDown) {
                    onPointerDown(vectorAdd(mousePosition, this.dragOffset), this);
                    this.dragging = true
                }
            }, 300)
        })

        this.content.on("pointermove", async (event) => {
            if (this.dragging) {
                let mousePosition = event.data.global
                await onPointerMove(vectorAdd(mousePosition, this.dragOffset), this);
            }
        })

        this.content.on("pointerup", (event) => {
            let mousePosition = event.data.global
            if (this.dragging) {
                onPointerUp(vectorAdd(mousePosition, this.dragOffset), this);
            } else if (pointerDown) {
                onPointerTap(vectorAdd(mousePosition, this.dragOffset), this)
            }
            pointerDown = false
            this.dragging = false
        })

        this.content.on("pointerupoutside", (event) => {
            pointerDown = false
            let mousePosition = event.data.global
            if (this.dragging) {
                onPointerUp(vectorAdd(mousePosition, this.dragOffset), this);
            } else {
                onPointerTap(vectorAdd(mousePosition, this.dragOffset), this)
            }
            this.dragging = false
        })
    }

    static quadDistance(pos1: Vector2D, pos2: Vector2D) {
        return (pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y)
    }

    private hasIndex(index: Index2D, grid: Grid): boolean {
        return this.currentGrid === grid
            && this.orThroughSlots(slot => {
                return index.row === this.currentIndex!.row + slot.row
                    && index.column === this.currentIndex!.column + slot.column
            }, grid)
    }

    bringToTop() {
        this.content.zIndex = 2
    }

    bringToBack() {
        this.content.zIndex = 1
    }

    unlock() {
        this.locked = false
    }

    lock() {
        this.locked = true
    }

    detap() {
        if (this.content instanceof Machine) {
            this.content.blendOutTypeChooser()
        }
    }

    private findNextAdjacentFor(index: Index2D) {
        let currentIndex = this.currentIndex!
        let distX = index.row - currentIndex.row
        let distY = index.column - currentIndex.column
        if (Math.abs(distX) > Math.abs(distY)) {
            return indexAdd(currentIndex, {row: Math.sign(distX), column: 0})
        }
        return indexAdd(currentIndex, {row: 0, column: Math.sign(distY)})
    }

}