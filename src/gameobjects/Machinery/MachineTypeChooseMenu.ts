import {Sprite} from "pixi.js";
import {ASSET_STORE} from "../../index";
import {ScalingButton} from "../../ui/Buttons/ScalingButton";
import {Machine, MachineType} from "./Machine";
import {MachineTypeButton} from "./MachineTypeButton";

export class MachineTypeChooseMenu extends Sprite {
    spike: Sprite;
    categoryIcons: Sprite[]
    typeButtons: ScalingButton[]
    machine: Machine

    constructor(machine: Machine) {
        super(ASSET_STORE.MACHINES!.menuRect);
        this.scale = {x: 0, y: 0}

        this.machine = machine
        this.spike = new Sprite(ASSET_STORE.MACHINES!.menuSpike)
        this.spike.anchor.set(0, 0.5)
        this.spike.position.set(-20, -5)
        this.addChild(this.spike)

        let cat = ASSET_STORE.MACHINES!.categoryIcons
        this.categoryIcons = [cat.color, cat.taste, cat.consistence]
            .map((texture, i) => {
                let icon = new Sprite(texture)
                icon.alpha = 0.6
                icon.anchor.set(0.5)
                icon.position.set(45, -63 + i * 60)
                this.addChild(icon)
                return icon
            })

        this.typeButtons = [
            "white", "red", "yellow", "brown",
            "neutral", "sweet", "sour", "savoury",
            "sticky", "liquid", "powdery", "solid"
        ].map((type, index) => {
                let button = new MachineTypeButton(type as MachineType, this)
                button.x =  135 + (index % 4) * 60
                button.y = -63 + Math.floor(index / 4) * 60
                this.addChild(button)
                return button
            })
    }

    blendOut(): void {
        console.log("Blend out")
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Quart.easeInOut})
    }

    blendIn(): void {
        console.log("Blend in")
        gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Quart.easeInOut})
    }

}
