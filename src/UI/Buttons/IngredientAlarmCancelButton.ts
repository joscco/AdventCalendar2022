import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, INGREDIENT_ALARM, SOUND_MANAGER} from "../../index";
import {Texture} from "@pixi/core";

export class IngredientAlarmCancelButton extends ScalingButton {

    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("dialog_cross")
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        INGREDIENT_ALARM.blendOut()
    }

}