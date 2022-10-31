import {Application} from "pixi.js";
import Scene from "./Scene";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/StickyDragActionHandler";
import {Grid} from "../gameobjects/Grid/Grid";
import {GridConnector} from "../gameobjects/Grid/GridConnector";
import {GridActionHandler} from "../gameobjects/Grid/GridActionHandlers/GridActionHandler";
import {AutomaticDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/AutomaticDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";
import {Machine} from "../gameobjects/Machinery/Machine";

export class GridEditorScene extends Scene {
    constructor(App: Application) {
        super();
        this.app = App
    }

    start() {

        let machineGrid = new Grid(3, 4, "machineGrid")
        machineGrid.tileWidth = 150
        machineGrid.tileHeight = 150
        machineGrid.columnOffsetX = 15
        machineGrid.rowOffsetY = 15
        machineGrid.centerIn({x: 0, y: 0, width: 1920, height: 1080})
        machineGrid.drawGrid()
        this.addChild(machineGrid)

        let outsideGrid = new Grid(1, 6, "outside")
        outsideGrid.tileWidth = 100
        outsideGrid.tileHeight = 100
        outsideGrid.columnOffsetX = 25
        outsideGrid.centerIn({x: 0, y: 50, width: 1920, height: 200})
        outsideGrid.drawGrid()
        this.addChild(outsideGrid)

        let machine1 = new Machine("neutral", "3x2", machineGrid)
        this.addChild(machine1)

        let machine2 = new Machine("neutral", "1x2", machineGrid)
        this.addChild(machine2)

        // Das sollte automatisiert gehen
        let firstGridItem = new GridItem(machine1, outsideGrid, 0, 0)
        firstGridItem.addShape(machineGrid, [[1, 1], [1, 1], [1, 1]])
        let secondGridItem = new GridItem(machine2, outsideGrid, 0, 1)
        secondGridItem.addShape(machineGrid, [[1, 1]])

        let gridActionMap = new Map<Grid, GridActionHandler>()
        gridActionMap.set(machineGrid, new StickyDragActionHandler(outsideGrid))

        let gridConnector = new GridConnector(outsideGrid, new AutomaticDragActionHandler(outsideGrid), gridActionMap, [firstGridItem, secondGridItem])
        gridConnector.defineDragAndDrop()
    }

}