import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SCENE_MANAGER} from "../../index";

export class BackToStartScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("backButton")
    }

    onClick(): void {
        SCENE_MANAGER.startWithTransition("startScene")
    }
}