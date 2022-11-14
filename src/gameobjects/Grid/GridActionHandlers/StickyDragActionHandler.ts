import {Grid} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";
import {Machine} from "../../Machinery/Machine";
import {indexEquals, Vector2D} from "../../../General/Helpers";

export class StickyDragActionHandler extends GridActionHandler {

    moving: boolean = false
    lastMousePosition?: Vector2D

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
        this.lastMousePosition = mousePosition
    }

    async onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): Promise<void> {
        if (item.content instanceof Machine) {
            item.content.blendOutTypeChooser()
        }

        this.lastMousePosition = mousePosition

        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex && !(indexEquals(nearestGridIndex, item.currentIndex!))) {
            await item.trySlideToIndex(grid, nearestGridIndex)
        }
    }

    async onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): Promise<void> {
        item.scaleDown()
        let firstFreeIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item)
        await item.trySlideToIndex(this.defaultGrid, firstFreeIndex!)
    }

    onTapInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        if (item.content instanceof Machine) {
            item.content.toggleBlendTypeChooser()
        }
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
    }
}