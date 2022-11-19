import {ScalingButton} from "./ScalingButton";
import {Sprite, Texture} from "pixi.js";
import {ASSET_STORE, DIALOG_MANAGER, SOUND_MANAGER} from "../../index";
import gsap from "gsap";
import {BlinkingEyes} from "../../gameobjects/Characters/BlinkingEyes";

export class BerndButton extends ScalingButton {
    private readonly headSprite: Sprite
    private readonly eyesSprite: BlinkingEyes

    constructor() {
        super();

        this.headSprite = new Sprite(ASSET_STORE.getTextureAsset("bernd_button_head"))
        this.headSprite.anchor.set(0.5)

        this.eyesSprite = new BlinkingEyes(ASSET_STORE.getTextureAsset("bernd_button_eyes_open"), ASSET_STORE.getTextureAsset("bernd_button_eyes_closed"))
        this.eyesSprite.anchor.set(0.5)

        this.addChild(this.headSprite)
        this.headSprite.addChild(this.eyesSprite)

        this.hide()
    }

    getTexture(): Texture | null {
        return null
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        DIALOG_MANAGER.showHint()
        this.blendOut()
    }

    blendOut(): void {
        this.eyesSprite.stopBlinking()
        this.interactive = false
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.5, ease: Back.easeIn})
    }

    async blendIn(): Promise<void> {
        this.eyesSprite.startBlinking()
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.5, ease: Back.easeOut})
        this.interactive = true
    }

    hide() {
        this.eyesSprite.stopBlinking()
        this.scale.set(0)
    }

    show() {
        this.eyesSprite.startBlinking()
        this.scale.set(1)
    }


}