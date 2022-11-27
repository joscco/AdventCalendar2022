import {Text} from "pixi.js";
import {ScalingButton} from "./ScalingButton";
import {Texture} from "@pixi/core";
import {ASSET_MANAGER, DIALOG_MANAGER, EVENT_EMITTER, SOUND_MANAGER} from "../../index";
import gsap from "gsap";

export class UnderstoodButton extends ScalingButton {

    private textObject: Text

    constructor(initialText?: string) {
        super();

        this.textObject = new Text(initialText ?? "", {
            fontFamily: "Futurahandwritten", fontSize: 50, fill: 0xffffff
        })
        this.textObject.anchor.set(0.5)
        this.addChild(this.textObject)
    }

    setText(text: string) {
        this.textObject.text = text;
    }

    getTexture(): Texture | null {
        return ASSET_MANAGER.getTextureAsset("dialog_understood_button");
    }

    onClick(): void {
        DIALOG_MANAGER.endDialog()
        EVENT_EMITTER.emit("clicked_continuation_button")
        SOUND_MANAGER.playBlub()
        this.blendOut()
    }

    hide() {
        this.interactive = false
        this.scale.set(0)
    }

    show() {
        this.interactive = true
        this.scale.set(1)
    }

    blendOut(): void {
        this.interactive = false
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
    }

    async blendIn(): Promise<void> {
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut})
        this.interactive = true
    }
}