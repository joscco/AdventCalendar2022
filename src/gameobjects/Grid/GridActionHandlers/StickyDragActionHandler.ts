// Like Grid Connector but Element Becomes Draggable to positions
import {Grid, Vector2D} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";
import {Machine} from "../../Machinery/Machine";
import {SOUND_MANAGER} from "../../../index";

export class StickyDragActionHandler extends GridActionHandler {

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        SOUND_MANAGER.playBlub()
        item.scaleUp()

    }

    onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        if (item.content instanceof Machine) {
            item.content.blendOutTypeChooser()
        }

        let nearestGridIndex = grid.getNearestFreeIndexForPositionAndItem(mousePosition, item);
        if (nearestGridIndex) {
            if (!(item.currentIndex?.row === nearestGridIndex.row && item.currentIndex.column === nearestGridIndex.column)) {
                SOUND_MANAGER.playBlub()
                item.trySetToIndex(grid, nearestGridIndex)
            }
        } else {
            item.updateAim(grid.projectPointToGridBorder(mousePosition))
        }
    }

    onTapInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        if (item.content instanceof Machine) {
            item.content.toggleBlendTypeChooser()
        }
    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        SOUND_MANAGER.playBlub()
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