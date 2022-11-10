import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
import {CookbookOverlay} from "../../gameobjects/IngredientBook/CookbookOverlay";

export class IngredientCookbookCloseButton extends ScalingButton {
    constructor(private overlay: CookbookOverlay) {
        super();
    }

    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("dialog_cross");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        this.overlay.blendOutCookbook()
    }
}