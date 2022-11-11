import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
import {CookbookOverlay} from "../../gameobjects/IngredientBook/CookbookOverlay";

export class IngredientCookbookButton extends ScalingButton {

    constructor(private overlay: CookbookOverlay) {
        super();
    }

    getTexture(): Texture | null {
        return this.overlay?.showingCookBook
            ? ASSET_STORE.getTextureAsset("recipeButtonOpen")
            : ASSET_STORE.getTextureAsset("recipeButtonClosed");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        this.overlay.toggleBlendCookbook()
    }

    show() {
        this.scale.set(1)
    }

    hide() {
        this.scale.set(0)
    }
}