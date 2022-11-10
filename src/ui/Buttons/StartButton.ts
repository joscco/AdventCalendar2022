import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, SCENE_MANAGER} from "../../index";
import {Texture} from "pixi.js";

export class StartButton extends ScalingButton {
    getTexture(): Texture {
        return ASSET_STORE.getTextureAsset("startScreenStartButton")
    }

    onClick(): void {
        SCENE_MANAGER.startWithTransition("levelChooserScene")
    }

}
