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
        this.enabled = !this.enabled
        SOUND_MANAGER.setMusicEnabled(this.enabled)
        this.updateTexture()
    }
}