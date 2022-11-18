// GridActionHandler:

import {GridItem} from "../GridItem";
import {Grid} from "../Grid";
import {Vector2D} from "../../../../General/Helpers";

export abstract class GridActionHandler {

    defaultGrid: Grid

    constructor(defaultGrid: Grid) {
        this.defaultGrid = defaultGrid
    }

    abstract onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void;

    abstract onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void;

    abstract onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void;

    abstract onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void;

    abstract onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void;

    onTapInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {

    }
}