import {Sprite} from "pixi.js";
import {ASSET_STORE} from "../../index";
import {ScalingButton} from "../../UI/Buttons/ScalingButton";
import {Machine, MachineType} from "./Machine";
import {MachineTypeButton} from "./MachineTypeButton";

export class MachineTypeChooseMenu extends Sprite {
    spike: Sprite;
    typeButtons: ScalingButton[]
    machine: Machine
    shown: boolean = false

    constructor(machine: Machine) {
        super(ASSET_STORE.getTextureAsset("machineIconMenuRect"));
        this.scale = {x: 0, y: 0}

        this.machine = machine
        this.spike = new Sprite(ASSET_STORE.getTextureAsset("machineIconMenuSpike"))
        this.spike.anchor.set(0, 0.5)
        this.spike.position.set(-20, -5)
        this.addChild(this.spike)

        this.typeButtons = [
            "white", "red", "yellow", "brown",
            "neutral", "sweet", "sour", "savoury",
            "sticky", "liquid", "powdery", "solid"
        ].map((type, index) => {
                let button = new MachineTypeButton(type as MachineType, this)
                button.x =  75 + (index % 4) * 100
                button.y = -90 + Math.floor(index / 4) * 85
                this.addChild(button)
                return button
            })
    }

    private async blendOut(): Promise<void> {
        await gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Quart.easeInOut})
        this.shown = false
    }

    private async blendIn(): Promise<void> {
        this.shown = true
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Quart.easeInOut})
    }

    toggleBlend() {
        this.shown ? this.blendOut() : this.blendIn()
    }
}
