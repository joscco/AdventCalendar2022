//
// Contains the movable Element
// the grid
// the form of the brick
// and a potential offset for x and y
// Anchor is always on top left

// A Shape like
// [
//  [0, 0, 1],
//  [1, 1, 1]
// ] describes a tetris-L-brick

import {Grid} from "../Grid";
import {GridSlot} from "../GridSlot";
import {GridPositionCalculator, Index2D, Vector2D} from "../GridPositionCalculator";
import {Container} from "pixi.js";

export class GridConnector {

    aim: { x: number, y: number } = {x: 0, y: 0};
    gridSlots: (GridSlot | null)[][] = [[new GridSlot(0, 0)]]
    owner: Container
    moveToFunction: (newPosition: Vector2D) => void
    quickMoveToFunction: (newPosition: Vector2D) => void
    grid: Grid<GridSlot>
    gridCalculator: GridPositionCalculator;

    constructor(grid: Grid<GridSlot>, gridCalculator: GridPositionCalculator, owner: Container, moveToFunction: (newPosition: Vector2D) => void, quickMoveToFunction: (newPosition: Vector2D) => void, shape?: number[][]) {
        this.owner = owner;
        this.grid = grid;
        this.gridCalculator = gridCalculator;
        this.moveToFunction = moveToFunction
        this.quickMoveToFunction = quickMoveToFunction

        if (shape) {
            if (!this.isValid(shape)) {
                throw Error(`Shape ${shape} has no valid format!`)
            }
            this.gridSlots = this.initGridSlots(shape)
        }
    }

    canSetToIndex(index: Index2D): boolean {
        return this.andThroughSlots(slot => this.grid.isFreeAt(
            index.row + slot.row,
            index.column + slot.column))
    }

    trySetToIndex(index: Index2D): boolean {
        if (this.canSetToIndex(index)) {
            this.setToIndex(index)
            return true;
        }
        return false;
    }

    private andThroughSlots(func: (slot: GridSlot) => boolean): boolean {
        let result: boolean = true
        for (let row = 0; row < this.gridSlots.length; row++) {
            for (let col = 0; col < this.gridSlots[0].length; col++) {
                if (this.gridSlots[row][col]) {
                    result &&= func(this.gridSlots[row][col]!)
                }
            }
        }
        return result;
    }

    private iterateThroughSlots(func: (slot: GridSlot) => void): void {
        for (let row = 0; row < this.gridSlots.length; row++) {
            for (let col = 0; col < this.gridSlots[0].length; col++) {
                if (this.gridSlots[row][col]) {
                    func(this.gridSlots[row][col]!)
                }
            }
        }
    }

    quadDistance(position1: Vector2D, position2: Vector2D) {
        return (position1.x - position2.x) * (position1.x - position2.x) + (position1.y - position2.y) * (position1.y - position2.y)
    }

    updateAim(position: Vector2D) {
        let distance = this.quadDistance(position, this.aim)
        if (distance > 500) {
            this.aim = position;
            this.moveToFunction(this.aim)
        } else if (distance > 1) {
            this.quickMoveToFunction(position)
        }
    }

    private setToIndex(index: Index2D): void {
        this.iterateThroughSlots((slot: GridSlot) => {
            this.grid.set(index.row + slot.row, index.column + slot.column, slot);
        })
        this.updateAim(this.gridCalculator.getPositionForIndex(index))
    }

    private isValid(shape: number[][]): boolean {
        return this.isRectangular(shape) && this.onlyContainsZerosAndOnes(shape)
    }

    private isRectangular(shape: number[][]): boolean {
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

    private onlyContainsZerosAndOnes(shape: number[][]): boolean {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] !== 0 && shape[row][col] !== 1) {
                    return false;
                }
            }
        }
        return true;
    }

    private initGridSlots(shape: number[][]): (GridSlot | null)[][] {
        let gridSlots: (GridSlot | null)[][] = [];
        for (let row = 0; row < shape.length; row++) {
            let newRow: (GridSlot | null)[] = []
            this.gridSlots.push(newRow);
            for (let col = 0; col < shape[0].length; col++) {
                newRow.push(shape[row][col] === 1 ? new GridSlot(row, col) : null)
            }
        }
        return gridSlots;
    }
}