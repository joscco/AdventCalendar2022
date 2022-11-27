import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_MANAGER, SOUND_MANAGER} from "../../index";
import {CookbookOverlay} from "../../GameObjects/GameScreen/IngredientBook/CookbookOverlay";

export class IngredientCookbookCloseButton extends ScalingButton {
    constructor(private overlay: CookbookOverlay) {
        super();
    }

    getTexture(): Texture | null {
        return ASSET_MANAGER.getTextureAsset("dialog_cross");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        this.overlay.blendOutCookbook()
    }
}