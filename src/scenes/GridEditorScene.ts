import {Application, Graphics, Sprite} from "pixi.js";
import Scene from "./Scene";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/StickyDragActionHandler";
import {Grid} from "../gameobjects/Grid/Grid";
import {GridConnector} from "../gameobjects/Grid/GridConnector";
import {GridActionHandler} from "../gameobjects/Grid/GridActionHandlers/GridActionHandler";
import {AutomaticDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/AutomaticDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";
import {Machine} from "../gameobjects/Machinery/Machine";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH} from "../index";
import {ConveyorBelt} from "../gameobjects/ConveyorBelt/ConveyorBelt";

export class GridEditorScene extends Scene {
    constructor(App: Application) {
        super();
        this.app = App
    }

    start() {
        this.initBackground();

        let beltGrid = new Grid(4, 7, "beltGrid")
        beltGrid.tileWidth = 150
        beltGrid.tileHeight = 150
        beltGrid.columnOffsetX = 15
        beltGrid.rowOffsetY = 15
        beltGrid.centerIn({x: 0, y: 150, width: 1920, height: 1080 - 150})
        beltGrid.drawGrid()
        this.addChild(beltGrid)

        let firstBelt = new ConveyorBelt(beltGrid,
            {row: 0, column: 2},
            {row: 3, column: 0},
            [
                {row: 1, column: 2},
                {row: 1, column: 1},
                {row: 0, column: 1},
                {row: 0, column: 0},
                {row: 1, column: 0},
                {row: 2, column: 0},
                {row: 2, column: 1},
                {row: 3, column: 1}
            ])
        this.addChild(firstBelt)
        setInterval(() => firstBelt.step(), 2000)

        let machineGrid = new Grid(4, 7, "machineGrid")
        machineGrid.tileWidth = 150
        machineGrid.tileHeight = 150
        machineGrid.columnOffsetX = 15
        machineGrid.rowOffsetY = 15
        machineGrid.centerIn({x: 0, y: 150, width: 1920, height: 1080 - 150})
        machineGrid.drawGrid()
        this.addChild(machineGrid)


        let outsideGrid = new Grid(1, 9, "outside")
        outsideGrid.tileWidth = 100
        outsideGrid.tileHeight = 100
        outsideGrid.columnOffsetX = 25
        outsideGrid.centerIn({x: 0, y: 50, width: 1920, height: 200})
        outsideGrid.drawGrid()
        outsideGrid.zIndex = 0
        this.addChild(outsideGrid)

        let outsideGridSprite = new Sprite(ASSET_STORE.GAME_SCENE!.machineOuterGrid)
        outsideGridSprite.anchor.set(0.5)
        outsideGridSprite.position.set(outsideGrid.getCenterX(), outsideGrid.getCenterY())
        outsideGridSprite.zIndex = -1
        this.addChild(outsideGridSprite)

        let machine1 = new Machine("neutral", "3x2", machineGrid)
        let machine2 = new Machine("neutral", "1x2", machineGrid)
        let machine3 = new Machine("neutral", "1x1", machineGrid)
        let machine4 = new Machine("neutral", "2x1", machineGrid)
        this.addChild(machine1)
        this.addChild(machine2)
        this.addChild(machine3)
        this.addChild(machine4)
        this.sortableChildren = true

        // Das sollte automatisiert gehen
        let firstGridItem = new GridItem(machine1, outsideGrid, 0, 0)
        firstGridItem.addShape(machineGrid, [[1, 1], [1, 1], [1, 1]])
        let secondGridItem = new GridItem(machine2, outsideGrid, 0, 1)
        secondGridItem.addShape(machineGrid, [[1, 1]])
        let thirdGridItem = new GridItem(machine3, outsideGrid, 0, 2)
        thirdGridItem.addShape(machineGrid, [[1]])
        let fourthGridItem = new GridItem(machine4, outsideGrid, 0, 3)
        fourthGridItem.addShape(machineGrid, [[1], [1]])

        let gridActionMap = new Map<Grid, GridActionHandler>()
        gridActionMap.set(machineGrid, new StickyDragActionHandler(outsideGrid))

        let gridConnector = new GridConnector(outsideGrid, new AutomaticDragActionHandler(outsideGrid), gridActionMap, [firstGridItem, secondGridItem, thirdGridItem, fourthGridItem])
        gridConnector.defineDragAndDrop()
    }

    private initBackground() {
        let background = new Graphics()
        background.beginFill(0xf18272)
        background.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        background.endFill()
        background.zIndex = -1
        this.addChild(background)
    }
}