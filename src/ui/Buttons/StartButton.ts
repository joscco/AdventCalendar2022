import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, SCENE_MANAGER, SOUND_MANAGER} from "../../index";
import {Texture} from "pixi.js";

export class StartButton extends ScalingButton {
    getTexture(): Texture {
        return ASSET_STORE.getTextureAsset("startScreenStartButton")
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("levelChooserScene")
    }

}
