import {Container, Sprite} from "pixi.js";
import {Machine, MachineType} from "./Machine";
import {ASSET_STORE} from "../../index";
import {Texture} from "@pixi/core";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";

export class MachineIconSlot extends Container {
    private iconSlot: Sprite;
    private iconTypeImage: Sprite;
    private typeChooseMenu: MachineTypeChooseMenu;
    private clicked: boolean = false

    constructor(initialType: MachineType, machine: Machine) {
        super();

        this.iconSlot = this.initIconSlot()
        this.iconSlot.anchor.set(0.5)
        this.addChild(this.iconSlot)

        this.iconTypeImage = new Sprite()
        this.iconTypeImage.scale.set(1.5)
        this.iconTypeImage.anchor.set(0.5)

        this.updateType(initialType)

        this.addChild(this.iconTypeImage)

        this.typeChooseMenu = new MachineTypeChooseMenu(machine)
        this.typeChooseMenu.anchor.set(0, 0.5)
        this.typeChooseMenu.position.set(80, 0)

        this.addChild(this.typeChooseMenu)
    }

    updateType(type: MachineType) {
        this.iconTypeImage.texture = this.getIconTextureForType(type)
    }

    scaleUp() {
        this.scale.set(1)
    }

    scaleDown() {
        this.scale.set(0)
    }

    public blendOut() {
        if (this.typeChooseMenu.shown) {
            this.typeChooseMenu.toggleBlend()
        }
    }

    private getIconTextureForType(type: MachineType): Texture {
        return ASSET_STORE.getTextureAsset(type);
    }

    private initIconSlot() {
        let sprite = new Sprite(ASSET_STORE.getTextureAsset("machineIconSlot"))
        sprite.interactive = true
        sprite.cursor = "pointer"

        // TODO: Doesn't work well in combination with dragging!
        sprite.on("pointertap",() => {
            if (this.clicked) {
                this.typeChooseMenu.toggleBlend()
            }
            this.clicked = true;
            setTimeout(() => {this.clicked = false}, 600)
        })
        return sprite
    }
}