import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, SCENE_MANAGER, SOUND_MANAGER} from "../../index";
import {Text, Texture} from "pixi.js";
import {LevelInitiator} from "../../scenes/general/LevelInitiator";

export class LevelButton extends ScalingButton {

    n: number
    private text: Text
    private enabled: boolean = false

    onClick(): void {
        SOUND_MANAGER.playBlub()
        SCENE_MANAGER.startWithTransition("level_" + this.n)
    }

    isScalingEnabled(): boolean {
        return this.enabled
    }

    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset(LevelInitiator.getRecipeForDay(this.n))
    }

    constructor(n: number, enabled: boolean) {
        super();
        this.n = n
        this.sprite.scale.set(0.43)

        this.text = new Text(this.n, {
            fontFamily: "Futurahandwritten",
            fontSize: 100,
            strokeThickness: 15,
            lineJoin: "round"
        })
        this.text.anchor.set(0.5)
        this.addChild(this.text)
        this.updateTexture()

        this.setEnabled(enabled)
    }

    setEnabled(value: boolean) {
        this.enabled = value
        if (!this.enabled) {
            this.text.style.fill = 0xffffff;
            this.text.style.stroke = 0x000000;
            this.sprite.tint = 0x000000
        } else {
            this.text.style.fill = 0x000000;
            this.text.style.stroke = 0xffffff;
            this.sprite.tint = 0xFFFFFF
        }
    }
}