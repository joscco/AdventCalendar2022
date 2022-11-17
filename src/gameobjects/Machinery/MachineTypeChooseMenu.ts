import {Container, Sprite} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH} from "../../index";
import {ScalingButton} from "../../UI/Buttons/ScalingButton";
import {Machine, MachineType} from "./Machine";
import {MachineTypeButton} from "./MachineTypeButton";

export class MachineTypeChooseMenu extends Sprite {
    spike: Sprite;
    typeButtons: ScalingButton[]
    buttonContainer: Container
    machine: Machine
    shown: boolean = false

    constructor(machine: Machine) {
        super(ASSET_STORE.getTextureAsset("machineIconMenuRect"));
        this.anchor.set(0, 0.5)
        this.position.set(80, 0)

        this.machine = machine
        this.spike = new Sprite(ASSET_STORE.getTextureAsset("machineIconMenuSpike"))
        this.spike.anchor.set(0, 0.5)
        this.spike.position.set(-20, -5)
        this.addChild(this.spike)

        this.buttonContainer = new Container()
        this.buttonContainer.pivot.set(-this.width/2, -this.height/2)
        this.buttonContainer.position.set(this.width/2, 0)

        this.typeButtons = [
            "white", "red", "yellow", "brown",
            "neutral", "sweet", "sour", "savoury",
            "sticky", "liquid", "powdery", "solid"
        ].map((type, index) => {
                let button = new MachineTypeButton(type as MachineType, this)
                button.x =  -375 + (index % 4) * 100
                button.y = -240 + Math.floor(index / 4) * 85
                this.buttonContainer.addChild(button)
                return button
            })

        this.addChild(this.buttonContainer)
        this.scale = {x: 0, y: 0}
    }

    private async blendOut(): Promise<void> {
        await gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Quart.easeInOut})
        this.shown = false
    }

    private async blendIn(): Promise<void> {
        this.shown = true
        let isOnRightHalf = this.getGlobalPosition().x > GAME_WIDTH/2
        let scaleX = isOnRightHalf ? -1 : 1
        this.buttonContainer.scale.x = isOnRightHalf ? -1 : 1
        let newX = isOnRightHalf ? -80 : 80

        let newY = 0
        let spikeY = -5
        let globalY = this.getGlobalPosition().y
        if (globalY < 250) {
            newY = 50
            spikeY = -55
        } else if (globalY > GAME_HEIGHT - 250) {
            newY = -50
            spikeY = 45
        }

        this.position.set(newX, newY)
        this.spike.position.y = spikeY

        await gsap.to(this.scale, {x: scaleX, y: 1, duration: 0.3, ease: Quart.easeInOut})
    }

    toggleBlend() {
        this.shown ? this.blendOut() : this.blendIn()
    }
}
