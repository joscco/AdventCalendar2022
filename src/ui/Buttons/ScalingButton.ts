import {Button} from "./Button";

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

    scaleUp() {
        this.scaleUpTo(1.2, 0.3)
    }

    async scaleUpTo(value: number, duration: number) {
        await gsap.to(this.scale, {
            x: value,
            y: value,
            duration: duration,
            ease: Back.easeOut
        })
    }

    scaleDown() {
        this.scaleUpTo(1, 0.3)
    }
}