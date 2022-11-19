import {ScalingButton} from "./ScalingButton";
import {Sprite, Texture} from "pixi.js";
import {ASSET_STORE, DIALOG_MANAGER, SOUND_MANAGER} from "../../index";
import gsap from "gsap";
import {sleep} from "../../General/Helpers";

export class BerndButton extends ScalingButton {
    private readonly headSprite: Sprite
    private readonly eyesSprite: Sprite
    private blinkingDisabled: boolean = false;

    constructor() {
        super();

        this.headSprite = new Sprite(ASSET_STORE.getTextureAsset("bernd_button_head"))
        this.headSprite.anchor.set(0.5)

        this.eyesSprite = new Sprite(ASSET_STORE.getTextureAsset("bernd_button_eyes_open"))
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

    private async blink() {
        if (!this.blinkingDisabled) {
            let blinkTime = Math.random() * 500
            let unblinkTime = Math.random() * 8000

            this.closeEyes()
            await sleep(blinkTime)

            this.openEyes()
            await sleep(unblinkTime)

            this.blink()
        }
    }

    blendOut(): void {
        this.blinkingDisabled = true
        this.interactive = false
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.5, ease: Back.easeIn})
    }

    async blendIn(): Promise<void> {
        this.blinkingDisabled = false
        this.blink()
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.5, ease: Back.easeOut})
        this.interactive = true
    }

    hide() {
        this.blinkingDisabled = true
        this.scale.set(0)
    }

    show() {
        this.blinkingDisabled = false
        this.blink()
        this.scale.set(1)
    }

    private closeEyes() {
        this.eyesSprite.texture = ASSET_STORE.getTextureAsset("bernd_button_eyes_closed")
    }

    private openEyes() {
        this.eyesSprite.texture = ASSET_STORE.getTextureAsset("bernd_button_eyes_open")
    }
}