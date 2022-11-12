// Like Grid Connector but Element Becomes Draggable to positions
import {Grid} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";
import {Machine} from "../../Machinery/Machine";
import {SOUND_MANAGER} from "../../../index";
import {Vector2D} from "../../../General/Helpers";

export class StickyDragActionHandler extends GridActionHandler {

    moving: boolean = false

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleUp()
    }

    async onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): Promise<void> {
        if (item.content instanceof Machine) {
            item.content.blendOutTypeChooser()
        }

        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex && !this.moving) {
            if (!(item.currentIndex?.row === nearestGridIndex.row && item.currentIndex.column === nearestGridIndex.column)) {
                // Meh...
                this.moving = true
                let couldSlide = await item.trySlideToIndex(grid, nearestGridIndex)
                this.moving = false
                if (couldSlide) {
                    SOUND_MANAGER.playBlub()
                }
            }
        }
    }

    onTapInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        if (item.content instanceof Machine) {
            SOUND_MANAGER.playBlub()
            item.content.toggleBlendTypeChooser()
        }
    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.scaleDown()
        let firstFreeIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item)
        item.trySlideToIndex(this.defaultGrid, firstFreeIndex!)
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        // let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        // if (nearestGridIndex) {
        //     item.scaleUp()
        //     item.trySetToIndex(grid, nearestGridIndex)
        // }
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        // item.scaleDown()
        // item.freeFromGrid()
    }
}