import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SCENE_MANAGER, SOUND_MANAGER} from "../../index";

export class BackToLevelScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("backButton")
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("levelChooserScene")
    }
}