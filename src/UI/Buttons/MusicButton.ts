import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, EVENT_EMITTER, GAME_HEIGHT, SOUND_MANAGER} from "../../index";
export class MusicButton extends ScalingButton {

    enabled: boolean = true

    constructor() {
        super();
        this.x = 110
        this.y = GAME_HEIGHT - 75
        this.scale.set(0.5)
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
        this.scaleUpTo(0.6, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(0.5, 0.3)
    }
}