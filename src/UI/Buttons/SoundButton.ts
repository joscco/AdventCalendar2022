import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, SOUND_MANAGER} from "../../index";
export class SoundButton extends ScalingButton {

    enabled: boolean = true

    constructor() {
        super();
        this.x = 210
        this.y = GAME_HEIGHT - 75
        this.scale.set(0.5)
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
        this.scaleUpTo(0.6, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(0.5, 0.3)
    }
}