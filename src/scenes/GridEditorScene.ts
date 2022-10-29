import {Application, Sprite} from "pixi.js";
import Scene from "./Scene";
import {START_SCENE_ASSETS} from "../index";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridConnectors/StickyDragActionHandler";
import {Grid} from "../gameobjects/Grid/Grid";
import {GridConnector} from "../gameobjects/Grid/GridConnectors/GridConnector";
import {GridActionHandler} from "../gameobjects/Grid/GridConnectors/GridActionHandler";
import {AutomaticDragActionHandler} from "../gameobjects/Grid/GridConnectors/AutomaticDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";

export class GridEditorScene extends Scene {
    constructor(App: Application) {
        super();
        this.app = App
    }

    start() {
        let dragSprite = new Sprite(START_SCENE_ASSETS.head)
        dragSprite.anchor.set(0.5)

        let dragSprite2 = new Sprite(START_SCENE_ASSETS.head)
        dragSprite2.anchor.set(0.5)

        let machineGrid = new Grid(3, 4)
        machineGrid.tileWidth = 200
        machineGrid.tileHeight = 200
        machineGrid.rowOffsetY = 20
        machineGrid.columnOffsetX = 20
        machineGrid.centerIn({x: 0, y: 0, width: 1920, height: 1080})
        machineGrid.drawGridPoints()
        this.addChild(machineGrid)

        let outsideGrid = new Grid(1, 6)
        outsideGrid.tileWidth = 200
        outsideGrid.tileHeight = 100
        outsideGrid.rowOffsetY = 20
        outsideGrid.centerIn({x: 0, y: 50, width: 1920, height: 200})
        outsideGrid.drawGridPoints()
        this.addChild(outsideGrid)

        let firstGridItem = new GridItem(dragSprite, outsideGrid, 0, 0)
        firstGridItem.addShape(machineGrid, [[1, 1], [1, 0]])
        let secondGridItem = new GridItem(dragSprite2, outsideGrid, 0, 1)
        secondGridItem.addShape(machineGrid, [[0, 1], [1, 1]])

        let gridActionMap = new Map<Grid, GridActionHandler>()
        gridActionMap.set(machineGrid, new StickyDragActionHandler())

        let gridConnector = new GridConnector(outsideGrid, new AutomaticDragActionHandler(), gridActionMap, [firstGridItem, secondGridItem])
        gridConnector.defineDragAndDrop()

        this.addChild(dragSprite)
    }

}