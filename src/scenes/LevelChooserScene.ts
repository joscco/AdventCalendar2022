import Scene from "./Scene";
import {Application, Sprite, TilingSprite} from "pixi.js";
import {LevelButton} from "../ui/Buttons/LevelButton";
import {ASSET_STORE, AVAILABLE_LEVELS, GAME_HEIGHT, GAME_WIDTH, NUMBER_OF_LEVELS} from "../index";

export class LevelChooserScene extends Scene {

    levelButtons: LevelButton[]

    constructor(app: Application) {
        super();
        this.app = app

        this.setupBackground()
        this.setUpTitle()
        this.levelButtons = this.setUpLevelButtons()
    }

    private setupBackground() {
        let texture = ASSET_STORE.START_SCENE!.backgroundPattern
        let scrollingBackground = new TilingSprite(texture)
        scrollingBackground.width = 2 * GAME_WIDTH
        scrollingBackground.height = 2 * GAME_HEIGHT
        gsap.to(scrollingBackground.tilePosition, {
            x: texture.width,
            y: -texture.height,
            duration: 15,
            repeat: -1,
            ease: Linear.easeNone
        })
        this.addChild(scrollingBackground);
    }

    private setUpTitle() {
        let title = new Sprite(ASSET_STORE.LEVEL_SCENE!.levelSceneTitle);
        title.anchor.set(0.5)
        title.position.set(GAME_WIDTH / 2, 100)
        this.addChild(title)
    }

    private setUpLevelButtons(): LevelButton[] {
        let buttons = []
        for (let n = 1; n <= NUMBER_OF_LEVELS; n++) {
            let button = new LevelButton(n, n <= AVAILABLE_LEVELS)
            button.x = 200 + ((n - 1) % 8) * 215
            button.y = 300 + Math.floor((n - 1) / 8) * 250
            this.addChild(button)
            buttons.push(button)
        }
        return buttons
    }
}