// Like Grid Connector but Element Becomes Draggable to positions
import {GridConnector} from "./GridConnector";
import {Grid} from "../Grid";
import {GridSlot} from "../GridSlot";
import {GridPositionCalculator, Vector2D} from "../GridPositionCalculator";
import {Container} from "pixi.js";

export class DragAndDropGridConnector extends GridConnector {

    SNAP_IN_GRID_MARGIN: number = 100;
    dragging: boolean = false;

    constructor(grid: Grid<GridSlot>, gridCalculator: GridPositionCalculator, owner: Container, moveTo: (position: Vector2D) => void, quickMoveTo: (position: Vector2D) => void, shape: number[][] = [[1]]) {
        super(grid, gridCalculator, owner, moveTo, quickMoveTo, shape)
        this.initDragAndDrop(owner)
    }

    private initDragAndDrop(owner: Container) {
        owner.interactive = true
        owner.buttonMode = true;
        owner.on("pointerdown", (event) => this.onPointerDown(event))
        owner.on("pointermove", (event) => this.onPointerMove(event))
        owner.on("pointerup", (event) => this.onPointerUp(event))
        owner.on("pointerupoutside", (event) => this.onPointerUp(event))

    }

    private onPointerDown(event: { data: { global: Vector2D } }) {
        let mousePosition = {x: event.data.global.x, y: event.data.global.y}
        if (!this.gridCalculator.isNearGrid(mousePosition, this.SNAP_IN_GRID_MARGIN)) {
            this.updateAim(mousePosition)
        }
        // ScaleUp?
        this.dragging = true;
    }

    private onPointerMove(event: { data: { global: Vector2D } }) {
        if (this.dragging) {
            let mousePosition = {x: event.data.global.x, y: event.data.global.y}
            if (!this.gridCalculator.isNearGrid(mousePosition, this.SNAP_IN_GRID_MARGIN)) {
                this.updateAim(mousePosition)
            } else {
                let nearestGridIndex = this.gridCalculator.getNearestIndexForPosition(mousePosition);
                this.trySetToIndex(nearestGridIndex)
            }
        }
    }

    private onPointerUp(event: { data: { global: Vector2D } }) {
        let mousePosition = {x: event.data.global.x, y: event.data.global.y}
        // ScaleDown?
        this.dragging = false;
    }
}