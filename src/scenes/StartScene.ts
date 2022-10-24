import {Application, Sprite} from 'pixi.js';
import {GAME_HEIGHT, GAME_WIDTH, SCENE_MANAGER} from "../index";
import Scene from "./Scene";
import {Assets} from "@pixi/assets";
import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {Texture} from "@pixi/core";
import {Tooltip} from "../gameobjects/Tooltip";

interface StartSceneAssets {
    buttonStart: Texture;
    buttonTutorial: Texture;
    title: Texture;
}

export class StartScene extends Scene {

    constructor(app: Application) {
        super();
        this.app = app
        this.update = this.update.bind(this);
    }

    async start() {
        const assets: StartSceneAssets = await Assets.loadBundle("startSceneAssets")

        this.addBackground();
        this.addTitle(assets);
        this.addStartButton(assets);
        this.addTutorialButton(assets);
    }

    private addTutorialButton(assets: StartSceneAssets) {
        let tutorialButton = new ScalingButton(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2 + 300,
            assets.buttonTutorial,
            () => {
                SCENE_MANAGER.start("startScene")
            })
        this.addChild(tutorialButton);
    }

    private addStartButton(assets: StartSceneAssets) {
        let startButton = new ScalingButton(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2 + 50,
            assets.buttonStart,
            () => {
                SCENE_MANAGER.start("startScene")
            })
        this.addChild(startButton);
    }

    private addTitle(assets: StartSceneAssets) {
        let titleSprite = new Sprite(assets.title);
        titleSprite.x = GAME_WIDTH / 2;
        titleSprite.y = GAME_HEIGHT / 2 - 250;
        titleSprite.anchor.set(0.5)
        this.addChild(titleSprite);

        let tooltip = new Tooltip(titleSprite, () => "blabla")
        tooltip.init()
    }

    private addBackground() {
        let background = new Sprite(Texture.WHITE)
        background.width = GAME_WIDTH
        background.height = GAME_HEIGHT
        background.tint = 0xEEEEEE;
        this.addChild(background);
    }
}
