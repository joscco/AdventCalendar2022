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

    getTexture(): Texture {
        return this.enabled
            ? ASSET_STORE.LEVEL_SCENE!.enabledLevel
            : ASSET_STORE.LEVEL_SCENE!.unenabledLevel
    }

    constructor(n: number, enabled: boolean) {
        super();
        this.n = n
        this.enabled = enabled
        this.texture = this.getTexture()
        let text = new Text(this.n, {fontFamily: "Futurahandwritten", fontSize: 100, fill: 0x000000})
        text.anchor.set(0.5)
        this.addChild(text)
    }
}