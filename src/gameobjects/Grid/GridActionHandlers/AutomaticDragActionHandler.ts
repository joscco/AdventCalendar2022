// Similar to Drag and Drop Grid Connector put sets to next available slot in grid

import {Grid} from "../Grid";
import {GridActionHandler} from "./GridActionHandler";
import {GridItem} from "../GridItem";
import {SOUND_MANAGER} from "../../../index";
import {Vector2D} from "../../../general/Helpers";

export class AutomaticDragActionHandler extends GridActionHandler {

    onDragToInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.updateAim(mousePosition)
    }

    onEnterGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        item.updateAim(mousePosition)
    }

    onLeaveGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {

    }

    onLetGoInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        let firstFreeIndex = grid.getNearestFreeIndexForPositionAndItem(grid.position, item)
        item.trySetToIndex(grid, firstFreeIndex!)
    }

    onPickUpInGrid(grid: Grid, mousePosition: Vector2D, item: GridItem): void {
        SOUND_MANAGER.playBlub()
        item.updateAim(mousePosition)
        item.freeFromGrid()
        grid.tidyUp()
    }
}