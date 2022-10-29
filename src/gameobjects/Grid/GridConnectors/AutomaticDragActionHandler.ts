// Similar to Drag and Drop Grid Connector put sets to next available slot in grid

import {Grid, Vector2D} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";

export class AutomaticDragActionHandler extends GridActionHandler {

    onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.updateAim(mousePosition)
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }
}