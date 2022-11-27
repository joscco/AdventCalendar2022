import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_MANAGER, SOUND_MANAGER} from "../../index";
import {OutlineFilter} from "@pixi/filter-outline";

export class MusicButton extends ScalingButton {

    enabled: boolean = true

    constructor() {
        super();
        this.updateTexture()
    }

    getTexture(): Texture | null {
        return this.enabled
            ? ASSET_MANAGER.getTextureAsset("musicButton")
            : ASSET_MANAGER.getTextureAsset("noMusicButton");
    }

    onClick(): void {
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

    highlight() {
        this.filters = [new OutlineFilter(10, 0xfd4343, 0.2)]
    }

    unhighlight() {
        this.filters = []
    }
}