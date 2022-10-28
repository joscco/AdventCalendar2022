import {Application, Sprite} from "pixi.js";
import Scene from "./Scene";
import {Grid} from "../gameobjects/Grid/Grid";
import {GridPositionCalculator, Vector2D} from "../gameobjects/Grid/GridPositionCalculator";
import {Expo, gsap} from "gsap";
import {START_SCENE_ASSETS} from "../index";
import {DragAndDropGridConnector} from "../gameobjects/Grid/GridConnectors/DragAndDropGridConnector";
import {GridSlot} from "../gameobjects/Grid/GridSlot";

export class GridEditorScene extends Scene {
    constructor(App: Application) {
        super();
        this.app = App
    }

    start() {
        let grid = new Grid<GridSlot>(5, 5)
        let gridCalculator = new GridPositionCalculator(4, 4)
        gridCalculator.position = {x: 200, y: 200}
        gridCalculator.tileWidth = 200
        gridCalculator.tileHeight = 200
        gridCalculator.rowOffsetY = 20
        gridCalculator.columnOffsetX = 20

        gridCalculator.centerIn({x: 0, y: 0, width: 1920, height: 1080})

        let dragSprite = new Sprite(START_SCENE_ASSETS.head)
        dragSprite.anchor.set(0.5)

        let moveTo = (position: Vector2D) => {
            gsap.to(dragSprite.position, {
                x: position.x,
                y: position.y,
                duration: 0.3,
                ease: Expo.easeOut
            })
        }

        let quickMoveTo = (position: Vector2D) => {
            dragSprite.position = position
        }

        let dragAndDropConnector = new DragAndDropGridConnector(grid, gridCalculator, dragSprite, moveTo, quickMoveTo)

        this.addChild(dragSprite)
    }

}