import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
export class SoundButton extends ScalingButton {

    isOff: boolean = false

    getTexture(): Texture | null {
        return this.isOff ? ASSET_STORE.getTextureAsset("noSoundButton") : ASSET_STORE.getTextureAsset("soundButton");
    }

    onClick(): void {
        if (this.isOff) {
            SOUND_MANAGER.playMusic()
        } else {
            SOUND_MANAGER.stopMusic()
        }
        this.isOff = !this.isOff
        this.updateTexture()
    }
}