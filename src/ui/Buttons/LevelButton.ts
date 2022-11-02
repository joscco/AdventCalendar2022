import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, SCENE_MANAGER} from "../../index";
import {Text, Texture} from "pixi.js";

export class LevelButton extends ScalingButton {

    n: number
    enabled: boolean

    onClick(): void {
        SCENE_MANAGER.start("level_" + this.n)
    }

    isScalingEnabled(): boolean {
        return this.enabled
    }

    getTexture(): Texture | null {
        return getRecipeTextureForDay(this.n)
    }

    constructor(n: number, enabled: boolean) {
        super();
        this.n = n
        this.enabled = enabled
        this.sprite.scale.set(0.4)
        if (!this.enabled) {
            this.sprite.tint = 0x000000
        }
        let text = new Text(this.n, {
            fontFamily: "Futurahandwritten",
            fontSize: 100,
            fill: this.enabled ? 0x000000 : 0xffffff,
            stroke: 0xffffff,
            strokeThickness: this.enabled ? 5 : 0,
            lineJoin: "round"
        })
        text.anchor.set(0.5)
        this.addChild(text)
        this.updateTexture()
    }
}

export function getRecipeTextureForDay(day: number): Texture {
    switch (day) {
        case 1:
            return ASSET_STORE.COOKIES!.SANTAMILK
        case 2:
            return ASSET_STORE.COOKIES!.PANETTONE
        case 3:
            return ASSET_STORE.COOKIES!.STOLLEN
        case 4:
            return ASSET_STORE.COOKIES!.PUNSCH
        case 5:
            return ASSET_STORE.COOKIES!.PFEFFERNUESSE
        case 6:
            return ASSET_STORE.COOKIES!.VANILLEKIPFERL
        case 7:
            return ASSET_STORE.COOKIES!.DOMINOSTEINE
        default:
            return ASSET_STORE.COOKIES!.PRINTEN
    }
}