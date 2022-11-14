import {Grid} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";
import {indexEquals, Vector2D} from "../../../General/Helpers";

export class StickyDragActionHandler extends GridActionHandler {

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
    }

    async onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): Promise<void> {
        item.detap()
        await this.slideItemToNearestIfNeeded(grid, mousePosition, item);
    }

    async onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): Promise<void> {
        item.scaleDown()
        await this.slideItemToNearestIfNeeded(grid, mousePosition, item);
    }

    private async slideItemToNearestIfNeeded(grid: Grid, mousePosition: Vector2D, item: GridItem) {
        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex && !(indexEquals(nearestGridIndex, item.currentIndex!))) {
            let nearestAdjacentIndex = item.findNextAdjacentFor(nearestGridIndex)
            await item.trySetToIndex(grid, nearestAdjacentIndex)
        }
    }

    onTapInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.tap()
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }
}