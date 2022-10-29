// Like Grid Connector but Element Becomes Draggable to positions
import {Grid, Vector2D} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";

export class StickyDragActionHandler extends GridActionHandler {

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
    }
    onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        let nearestGridIndex = grid.getNearestIndexForPosition(mousePosition);
        item.trySetToIndex(grid, nearestGridIndex)
    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleDown()
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleDown()
    }
}