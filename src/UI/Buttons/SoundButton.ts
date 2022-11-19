import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";

export class SoundButton extends ScalingButton {

    enabled: boolean = true

    constructor() {
        super();
        this.updateTexture()
    }

    getTexture(): Texture | null {
        return this.enabled
            ? ASSET_STORE.getTextureAsset("soundButton")
            : ASSET_STORE.getTextureAsset("noSoundButton");
    }

    onClick(): void {
        this.enabled = !this.enabled
        SOUND_MANAGER.setSoundEnabled(this.enabled)
        this.updateTexture()
    }

    scaleUp() {
        this.scaleUpTo(1.1, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(1, 0.3)
    }
}