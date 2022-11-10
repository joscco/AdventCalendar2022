import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
export class MusicButton extends ScalingButton {

    enabled: boolean = true

    constructor() {
        super();
        this.updateTexture()
    }

    getTexture(): Texture | null {
        return this.enabled
            ? ASSET_STORE.getTextureAsset("musicButton")
            : ASSET_STORE.getTextureAsset("noMusicButton");
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        this.enabled = !this.enabled
        SOUND_MANAGER.setMusicEnabled(this.enabled)
        this.updateTexture()
    }

    scaleUp() {
        this.scaleUpTo(0.6, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(0.5, 0.3)
    }
}