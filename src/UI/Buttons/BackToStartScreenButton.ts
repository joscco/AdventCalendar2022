import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_MANAGER, SCENE_MANAGER, SOUND_MANAGER} from "../../index";

export class BackToStartScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_MANAGER.getTextureAsset("backButton")
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("startScene")
    }
}