
import {GridItem} from "./GridItem";
import {Index2D} from "../../general/Helpers";

// SingleGridSlot is what's eventually inserted into the grid
// Contains:
// - One or zero display items
// - a potential offset for x and y

export class GridSlot implements Index2D {
    column: number;
    row: number;
    gridItem: GridItem

    constructor(row: number, column: number, gridItem: GridItem) {
        this.row = row;
        this.column = column;
        this.gridItem = gridItem
    }
}