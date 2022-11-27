import {Sprite} from "pixi.js";
import {RecipeID} from "../RecipeBox";
import {BlinkingEyes} from "../../Characters/BlinkingEyes";
import {ASSET_MANAGER} from "../../../index";
import {LevelInitiator} from "../../../Scenes/Basics/LevelInitiator";

export type CookieEyesConfig = {
    x: number,
    y: number,
    useUnderlay?: boolean,
    underlayColor?: number
}

export class Cookie extends Sprite {

    recipeID: RecipeID
    eyes: BlinkingEyes
    eyesUnderlay: Sprite

    constructor(recipeID: RecipeID) {
        super(ASSET_MANAGER.getTextureAsset(recipeID));

        this.recipeID = recipeID
        this.anchor.set(0.5)

        let eyesConfig: CookieEyesConfig = LevelInitiator.getCookieEyeConfigForRecipe(this.recipeID)
        this.eyesUnderlay = new Sprite()

        if (eyesConfig.useUnderlay) {
            this.eyesUnderlay.texture = ASSET_MANAGER.getTextureAsset("underlayCookieEyes")
            this.eyesUnderlay.anchor.set(0.5)
            this.eyesUnderlay.position.set(eyesConfig.x, eyesConfig.y)
            this.eyesUnderlay.tint = eyesConfig.underlayColor ?? 0xffffff
            this.addChild(this.eyesUnderlay)
        }

        // In BlinkingEyes-Klasse auslagern! Für Bernd auch machen
        this.eyes = new BlinkingEyes(ASSET_MANAGER.getTextureAsset("openCookieEyes"), ASSET_MANAGER.getTextureAsset("closedCookieEyes"))
        this.eyes.anchor.set(0.5)
        this.eyes.position.set(eyesConfig.x, eyesConfig.y)

        this.addChild(this.eyes)
    }

    stopBlinking() {
        this.eyes.stopBlinking()
    }

    startBlinking() {
        this.eyes.startBlinking()
    }
}