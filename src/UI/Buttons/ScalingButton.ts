import {Button} from "./Button";
import {Texture} from "@pixi/core";
import gsap from "gsap";
import {SOUND_MANAGER} from "../../index";

export abstract class ScalingButton extends Button {
    constructor() {
        super();
        this.on("pointerover", () => {
                if (this.isScalingEnabled()) {
                    this.scaleUp();
                }
            })
        this.on("pointerout", () => {
                if (this.isScalingEnabled()) {
                    this.scaleDown()
                }
        })
    }

    isScalingEnabled(): boolean {
        return true;
    }

    async scaleUpTo(value: number, duration: number) {
        await gsap.to(this.scale, {
            x: value,
            y: value,
            duration: duration,
            ease: Back.easeOut
        })
    }

    scaleUp() {
        this.scaleUpTo(1.2, 0.3)
    }

    scaleDown() {
        this.scaleUpTo(1, 0.3)
    }
}

export class ScalingButtonImpl extends ScalingButton{
    active: boolean = true
    private texture: Texture

    constructor(texture: Texture, private onClickAction: () => void) {
        super()
        this.texture = texture
        this.updateTexture()
    }

    getTexture(): Texture | null {
        return this.texture;
    }

    onClick(): void {
        if (this.active) {
            SOUND_MANAGER.playBlub()
            this.onClickAction()
        }
    }

    async blendOut(): Promise<void> {
        this.interactive = false
        this.active = false
        await gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
    }

    async blendIn(): Promise<void> {
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut})
        this.active = true
        this.interactive = true
    }

    hide() {
        this.scale.set(0)
    }

    show() {
        this.scale.set(1)
    }
}