import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {ASSET_STORE, SCENE_MANAGER} from "../index";
import {Texture} from "pixi.js";

export class StartButton extends ScalingButton {
    getTexture(): Texture {
        return ASSET_STORE.START_SCENE!.startButton
    }

    onClick(): void {
        SCENE_MANAGER.start("levelChooserScene")
    }

}
