import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE} from "../../index";

export class RecipeButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("recipeButtonClosed");
    }

    onClick(): void {
    }

}