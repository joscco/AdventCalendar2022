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

import {DisplayObject} from "pixi.js";
import {GridSlot} from "./GridSlot";
import {Grid, Index2D, Vector2D} from "./Grid";
import {Back, gsap} from "gsap";

type MultiSlotArr = (GridSlot | null)[][]

export class GridItem {
    // This is realized as a map since a gridItem could have different forms in different grids
    // (e.g. 1x1 in inventory and nxm in a "real" grid
    gridSlotsMap: Map<Grid, MultiSlotArr> = new Map<Grid, MultiSlotArr>()
    defaultSlotArr: MultiSlotArr;
    content: DisplayObject
    dragging: boolean = false
    currentGrid: Grid
    currentIndex: Index2D
    aim: Vector2D

    constructor(content: DisplayObject,
                startGrid: Grid,
                row: number,
                column: number,
                shape: number[][] = [[1]]) {

        this.content = content
        this.currentGrid = startGrid
        this.currentIndex = {row: row, column: column}

        // Todo: Furchtbar, muss ich ändern
        if (!GridItem.isValidShape(shape)) {
            throw Error(`Shape ${shape} has no valid format!`)
        } else {
            this.defaultSlotArr = this.initSlotsFromShape(shape)
        }
        this.aim = this.content.position
        this.trySetToIndex(startGrid, {row: row, column: column})
    }

    canSetToIndex(grid: Grid, item: GridItem, index: Index2D): boolean {
        return item.andThroughSlots(slot => grid.isFreeAt(
            {row: index.row + slot.row,
            column: index.column + slot.column}), grid)
    }

    private setToIndex(grid: Grid, index: Index2D): void {
        this.iterateThroughSlots((slot: GridSlot) => {
            grid.set({row: index.row + slot.row, column: index.column + slot.column}, slot);
        }, grid)
        this.updateAim(grid.getGlobalPositionForIndex(index))
    }

    trySetToIndex(grid: Grid, index: Index2D): boolean {
        if (this.canSetToIndex(grid, this, index)) {
            if (this.currentGrid) {
                this.currentGrid.remove(this.currentIndex)
            }
            this.setToIndex(grid, index)
            this.currentGrid = grid;
            this.currentIndex = index
            return true;
        }
        return false;
    }

    updateAim(position: Vector2D) {
        let distance = GridItem.quadDistance(position, this.aim)
        if (distance > 500) {
            this.aim = position;
            this.moveTo(this.aim)
        } else if (distance > 2) {
            this.setContentTo(position)
        }
    }

    scaleUp() {
        gsap.to(this.content.scale, {
            x: 1.1,
            y: 1.1,
            duration: 0.3,
            ease: Back.easeInOut
        })
    }

    scaleDown() {
        gsap.to(this.content.scale, {
            x: 1,
            y: 1,
            duration: 0.3,
            ease: Back.easeInOut
        })
    }

    private moveTo(position: Vector2D) {
        gsap.to(this.content.position, {
            x: position.x,
            y: position.y,
            duration: 0.3,
            ease: Back.easeOut
        })
    }

    private setContentTo(position: Vector2D) {
        this.content.position.x = position.x
        this.content.position.y = position.y
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

    defineDragAndDrop(onPointerDown: (mousePos: Vector2D, item: GridItem) => void,
                      onPointerMove: (mousePos: Vector2D, item: GridItem) => void,
                      onPointerUp: (mousePos: Vector2D, item: GridItem) => void) {
        this.content.interactive = true
        this.content.buttonMode = true;

        this.content.on("pointerdown", (event) => {
            onPointerDown(event.data.global, this);
            this.dragging = true
        })
        this.content.on("pointermove", (event) => {
            if (this.dragging) {
                onPointerMove(event.data.global, this);
            }
        })
        this.content.on("pointerup", (event) => {
            onPointerUp(event.data.global, this);
            this.dragging = false
        })
        this.content.on("pointerupoutside", (event) => {
            onPointerUp(event.data.global, this);
            this.dragging = false
        })
    }

    static quadDistance(pos1: Vector2D, pos2: Vector2D) {
        return (pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y)
    }
}