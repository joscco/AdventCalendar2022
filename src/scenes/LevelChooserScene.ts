import Scene from "./general/Scene";
import {Application, Text, TilingSprite} from "pixi.js";
import {LevelButton} from "../ui/Buttons/LevelButton";
import {ASSET_STORE, GAME_HEIGHT, GAME_DATA, GAME_WIDTH, NUMBER_OF_LEVELS} from "../index";
import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {BackToStartScreenButton} from "../ui/Buttons/BackToStartScreen";

export class LevelChooserScene extends Scene {

    levelButtons: LevelButton[]
    backButton: ScalingButton

    constructor(app: Application) {
        super();
        this.app = app

        this.setupBackground()
        this.setUpTitle()
        this.levelButtons = this.setUpLevelButtons()
        this.backButton = this.setUpBackButton()
    }

    private setupBackground() {
        let texture = ASSET_STORE.getTextureAsset("startScreenBackgroundPattern")
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
        let title = new Text("Choose a level", {fontFamily: "Futurahandwritten", fontWeight: "bold", fontSize: 60, fill: 0x000000})
        title.anchor.set(0.5)
        title.position.set(GAME_WIDTH / 2, 125)
        this.addChild(title)
    }

    private setUpLevelButtons(): LevelButton[] {
        let buttons = []
        for (let n = 1; n <= NUMBER_OF_LEVELS; n++) {
            let button = new LevelButton(n, n <= GAME_DATA.getUnlockedLevels())
            button.x = 200 + ((n - 1) % 8) * 215
            button.y = 350 + Math.floor((n - 1) / 8) * 250
            this.addChild(button)
            buttons.push(button)
        }
        return buttons
    }

    updateLevelButtons() {
        this.levelButtons.forEach(button => {
            button.setEnabled(button.n <= GAME_DATA.getUnlockedLevels())
            button.updateTexture()
        })
    }

    private setUpBackButton(): ScalingButton {
        let backToStartScreenButton = new BackToStartScreenButton()
        backToStartScreenButton.position.set(125, 125)
        this.addChild(backToStartScreenButton)
        return backToStartScreenButton
    }
}