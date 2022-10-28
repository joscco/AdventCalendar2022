import {Index2D} from "./GridPositionCalculator";

export class GridSlot implements Index2D {
    column: number;
    row: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

}