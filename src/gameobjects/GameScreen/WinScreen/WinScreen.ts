import {Container, Sprite, Text} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH, NUMBER_OF_LEVELS, SCENE_MANAGER, SOUND_MANAGER} from "../../../index";
import {RecipeID, RECIPES} from "../RecipeBox";
import {ScalingButton} from "../../../UI/Buttons/ScalingButton";
import {Texture} from "@pixi/core";
import {LevelInitiator} from "../../../Scenes/Basics/LevelInitiator";
import {LeftAngel} from "./LeftAngel";
import {RightAngel} from "./RightAngel";
import {Sparkle} from "./Sparkle";
import {Cookie} from "./Cookie";

class LevelScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("winScreenBackToLevelsButton");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("levelChooserScene")
    }
}

class NextLevelButton extends ScalingButton {

    constructor(private level: number) {
        super();
    }

    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("winScreenNextLevelButton");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("level_" + this.level)
    }

}

export class WinScreen extends Container {

    private readonly background: Sprite
    private readonly title: Text
    private readonly subTitle: Text
    private readonly cookie: Cookie
    private readonly leftAngel?: LeftAngel
    private readonly rightAngel?: RightAngel
    private readonly sparkles: Sparkle[] = []
    private readonly nextLevelButton?: ScalingButton
    private readonly levelScreenButton: ScalingButton
    private readonly banner: Sprite
    private readonly bannerText: Text

    constructor(recipe: RecipeID, level: number) {
        super()

        this.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 700)

        this.background = new Sprite(ASSET_STORE.getTextureAsset("winScreenBackground"))
        this.background.anchor.set(0.5)
        this.background.tint = 0x381a1c
        this.addChild(this.background)

        this.title = new Text("Well done!", {fontFamily: "Futurahandwritten", fontSize: 90, fontWeight: "bold", fill: 0xffffff})
        this.title.anchor.set(0.5)
        this.title.position.set(0, -340)
        this.addChild(this.title)

        this.subTitle = new Text("You made some tasty", {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xf2afb1})
        this.subTitle.anchor.set(0.5)
        this.subTitle.position.set(0, -270)
        this.addChild(this.subTitle)

        this.cookie = new Cookie(LevelInitiator.getRecipeForDay(level))
        this.cookie.position.set(0, 10)
        this.addChild(this.cookie)

        this.banner = new Sprite(ASSET_STORE.getTextureAsset("winScreenBanner"))
        this.banner.anchor.set(0.5)
        this.banner.position.set(0, 380)
        this.addChild(this.banner)

        this.bannerText = new Text(RECIPES[recipe].name, {fontFamily: "Futurahandwritten", fontSize: 70, fill: 0xffffff})
        this.bannerText.anchor.set(0.5)
        this.banner.addChild(this.bannerText)

        this.levelScreenButton = new LevelScreenButton()
        this.levelScreenButton.position.set(-550, 280)
        this.addChild(this.levelScreenButton)

        if (level < NUMBER_OF_LEVELS) {
            this.nextLevelButton = new NextLevelButton(level + 1)
            this.nextLevelButton.position.set(550, 280)
            this.addChild(this.nextLevelButton)
        }

        this.sparkles = [new Sparkle(), new Sparkle(), new Sparkle(), new Sparkle()]

        this.leftAngel = new LeftAngel()
        this.rightAngel = new RightAngel()

        this.addChild(...this.sparkles, this.leftAngel, this.rightAngel)
    }

    async blendIn() {
        this.cookie.startBlinking()
        SOUND_MANAGER.playBlub()
        await gsap.to(this.position, {y: GAME_HEIGHT / 2 - 50, duration: 0.5, ease: Back.easeInOut})
    }

    blendOut() {
        this.cookie.stopBlinking()
        this.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 700)
    }

}