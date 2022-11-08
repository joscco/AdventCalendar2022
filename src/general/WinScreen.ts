import {Sprite, Text} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH, NUMBER_OF_LEVELS, SCENE_TRANSITION_MANAGER} from "../index";
import {Recipe} from "../gameobjects/RecipeBox";
import {getRecipeTextureForDay} from "../ui/Buttons/LevelButton";
import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {Texture} from "@pixi/core";

export class LeftAngel {
}

class RightAngel {
}

class Sparkle {
}

class LevelScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("winScreenBackToLevelsButton");
    }

    onClick(): void {
        SCENE_TRANSITION_MANAGER.transitionTo("levelChooserScene")
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
        SCENE_TRANSITION_MANAGER.transitionTo("level_" + this.level)
    }

}

export class WinScreen extends Sprite {

    private title: Text
    private subTitle: Text
    private cookieIcon: Sprite
    private leftAngel?: LeftAngel
    private rightAngel?: RightAngel
    private sparkles: Sparkle[] = []
    private nextLevelButton?: ScalingButton
    private levelScreenButton: ScalingButton
    private banner: Sprite
    private bannerText: Text

    constructor(recipe: Recipe, level: number) {
        super(ASSET_STORE.getTextureAsset("winScreenBackground"));
        this.anchor.set(0.5)
        this.position.set(GAME_WIDTH/2, GAME_HEIGHT + 700)

        this.title = new Text("Well done!", {fontFamily: "Futurahandwritten", fontSize: 70, fill: 0x000000})
        this.title.anchor.set(0.5)
        this.title.position.set(0, - 340)
        this.addChild(this.title)

        this.subTitle = new Text("You made some tasty", {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xaaaaaa})
        this.subTitle.anchor.set(0.5)
        this.subTitle.position.set(0, - 280)
        this.addChild(this.subTitle)

        this.cookieIcon = new Sprite(getRecipeTextureForDay(1))
        this.cookieIcon.anchor.set(0.5)
        this.cookieIcon.position.set(0, 0)
        this.addChild(this.cookieIcon)

        this.banner = new Sprite(ASSET_STORE.getTextureAsset("winScreenBanner"))
        this.banner.anchor.set(0.5)
        this.banner.position.set(0, 380)
        this.addChild(this.banner)

        this.bannerText = new Text(recipe.name, {fontFamily: "Futurahandwritten", fontSize: 70, fill: 0xffffff})
        this.bannerText.anchor.set(0.5)
        this.banner.addChild(this.bannerText)

        this.levelScreenButton = new LevelScreenButton()
        this.levelScreenButton.position.set(-550, 380)
        this.addChild(this.levelScreenButton)

        if (level < NUMBER_OF_LEVELS) {
            this.nextLevelButton = new NextLevelButton(level + 1)
            this.nextLevelButton.position.set(550, 380)
            this.addChild(this.nextLevelButton)
        }
    }

    async blendIn() {
        await gsap.to(this.position, {y: GAME_HEIGHT/2, duration: 0.5, ease: Back.easeInOut})
    }

}