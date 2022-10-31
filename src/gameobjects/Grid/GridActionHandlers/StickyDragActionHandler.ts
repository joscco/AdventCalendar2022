// Like Grid Connector but Element Becomes Draggable to positions
import {Grid, Vector2D} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";

export class StickyDragActionHandler extends GridActionHandler {

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
    }

    onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex) {
            item.trySetToIndex(grid, nearestGridIndex)
        } else {
            item.updateAim(grid.projectPointToGridBorder(mousePosition))
        }
    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleDown()
        if (!grid.getNearestFreeIndexForPositionAndItem(mousePosition, item)) {
            let firstFreeIndex = this.defaultGrid.getNearestFreeIndexForPositionAndItem(grid.position, item)
            item.trySetToIndex(this.defaultGrid, firstFreeIndex!)
        }
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex) {
            item.scaleUp()
            item.trySetToIndex(grid, nearestGridIndex)
        }
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleDown()
        item.freeFromGrid()
    }
}