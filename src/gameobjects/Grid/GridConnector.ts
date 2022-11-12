//
// Contains:
// - a pool of all movable elements (gridItems) inside the grids
// - the different grids to connect to
//
// Role:
// Let grid

import {Grid} from "./Grid";
import {GridItem} from "./GridItem";
import {GridActionHandler} from "./GridActionHandlers/GridActionHandler";
import {Vector2D} from "../../General/Helpers";
import {TOOLTIP_MANAGER} from "../../index";

// Hat eine Referenzliste auf die Grids
// Hat für jedes Grid einen ActionHandler
// Berechnet aus mouse und item Position, welches Gitter nun angesprochen wird

// Wird von den GridItems angesprochen

export class GridConnector {

    defaultGrid: Grid;
    defaultGridActionHandler: GridActionHandler;
    otherGridActionsMap: Map<Grid, GridActionHandler>;
    gridItems: GridItem[];

    // as little cache
    nearestGridSoFar?: Grid = undefined

    constructor(defaultGrid: Grid,
                defaultGridActionHandler: GridActionHandler,
                otherGrids: Map<Grid, GridActionHandler>,
                gridItems: GridItem[] = []) {

        // Nicht ganz so bombe...
        this.defaultGrid = defaultGrid
        this.defaultGridActionHandler = defaultGridActionHandler
        this.otherGridActionsMap = otherGrids

        // In case not already set
        this.otherGridActionsMap.set(defaultGrid, defaultGridActionHandler)

        this.gridItems = gridItems
    }

    defineDragAndDrop() {
        for (let item of this.gridItems) {
            item.defineTapDragAndDrop(
                (mousePos, item) => this.onStartDrag(mousePos, item),
                (mousePos, item) => this.onDragMove(mousePos, item),
                (mousePos, item) => this.onEndDrag(mousePos, item),
                (mousePos, item) => this.onTap(mousePos, item))
        }
    }

    findNearestGridForPosition(position: Vector2D): Grid {
        if (this.nearestGridSoFar && this.nearestGridSoFar.attracts(position)) {
            return this.nearestGridSoFar;
        }

        // If the grid has changed
        for (let grid of this.otherGridActionsMap.keys()) {
            if (grid.attracts(position)) {
                return grid
            }
        }

        return this.defaultGrid;
    }

    private onStartDrag(mousePosition: Vector2D, item: GridItem) {
        if (!item.locked) {
            item.bringToTop()
            let nearestGrid = this.findNearestGridForPosition(mousePosition);
            this.updateNearestGrid(nearestGrid, mousePosition, item)
            this.otherGridActionsMap.get(nearestGrid)!.onPickUpInGrid(nearestGrid, mousePosition, item)
        }
    }

    private async onDragMove(mousePosition: Vector2D, item: GridItem) {
        if (!item.locked) {
            let nearestGrid = this.findNearestGridForPosition(mousePosition);
            this.updateNearestGrid(nearestGrid, mousePosition, item)
            await this.otherGridActionsMap.get(nearestGrid)!.onDragToInGrid(nearestGrid, mousePosition, item)
        }
    }

    private onTap(mousePosition: Vector2D, item: GridItem) {
        if (!item.locked) {
            this.gridItems.forEach(item => {
                item.bringToBack()
                item.detap()
            })
            TOOLTIP_MANAGER.hideTooltip()
            item.bringToTop()
            let nearestGrid = this.findNearestGridForPosition(mousePosition);
            this.updateNearestGrid(nearestGrid, mousePosition, item)
            this.otherGridActionsMap.get(nearestGrid)!.onTapInGrid(nearestGrid, mousePosition, item)
        }
    }

    private onEndDrag(mousePosition: Vector2D, item: GridItem) {
        if (!item.locked) {
            item.bringToBack()
            let nearestGrid = this.findNearestGridForPosition(mousePosition);
            this.updateNearestGrid(nearestGrid, mousePosition, item)
            this.otherGridActionsMap.get(nearestGrid)!.onLetGoInGrid(nearestGrid, mousePosition, item)
        }
    }

    private updateNearestGrid(newNearestGrid: Grid, mousePosition: Vector2D, item: GridItem) {
        if (newNearestGrid != this.nearestGridSoFar) {
            if (this.nearestGridSoFar) {
                this.otherGridActionsMap.get(this.nearestGridSoFar)!.onLeaveGrid(this.nearestGridSoFar, mousePosition, item)
            }
            this.otherGridActionsMap.get(newNearestGrid)!.onEnterGrid(newNearestGrid, mousePosition, item)
            this.nearestGridSoFar = newNearestGrid
        }
    }
}