import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, EVENT_EMITTER, SOUND_MANAGER} from "../../index";

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
        EVENT_EMITTER.emit("clicked_music_button")
        SOUND_MANAGER.playBlub()
        this.enabled = !this.enabled
        SOUND_MANAGER.setMusicEnabled(this.enabled)
        this.updateTexture()
    }

    scaleUp() {
        this.scaleUpTo(1.1, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(1, 0.3)
    }
}