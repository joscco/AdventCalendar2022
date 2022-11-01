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
        gsap.to(this.scale, {
            x: 1.2,
            y: 1.2,
            duration: 0.3,
            ease: Back.easeOut
        })
    }

    scaleDown() {
        gsap.to(this.scale, {
            x: 1,
            y: 1,
            duration: 0.3,
            ease: Back.easeOut
        })
    }

}