import {ScalingButton} from "./ScalingButton";
import {Sprite, Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
import {FactoryScene} from "../../Scenes/FactoryScene";
import gsap from "gsap";

export class BerndButton extends ScalingButton {
    private levelScene: FactoryScene;
    private headSprite: Sprite
    private eyesSprite: Sprite

    constructor(levelScene: FactoryScene) {
        super();
        this.levelScene = levelScene

        this.headSprite = new Sprite(ASSET_STORE.getTextureAsset("bernd_head"))
        this.headSprite.anchor.set(0.5)

        this.eyesSprite = new Sprite(ASSET_STORE.getTextureAsset("bernd_eyes_open"))
        this.eyesSprite.anchor.set(0.5)
        this.eyesSprite.position.set(0, -30)
        this.headSprite.scale.set(0.5)

        this.addChild(this.headSprite)
        this.headSprite.addChild(this.eyesSprite)
    }

    getTexture(): Texture | null {
        return null
    }

    onClick(): void {
        SOUND_MANAGER.playBlub()
        this.levelScene.showHint()
    }

    blendOut(): void {
        this.interactive = false
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
    }

    async blendIn(): Promise<void> {
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeIn})
        this.interactive = true
    }

    hide() {
        this.scale.set(0)
    }

    show() {
        this.scale.set(1)
    }
}