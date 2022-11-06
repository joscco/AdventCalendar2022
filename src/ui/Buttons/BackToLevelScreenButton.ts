import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SCENE_TRANSITION_MANAGER} from "../../index";

export class BackToLevelScreenButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.GAME_SCENE!.backButton;
    }

    onClick(): void {
        SCENE_TRANSITION_MANAGER.transitionTo("levelChooserScene")
    }
}