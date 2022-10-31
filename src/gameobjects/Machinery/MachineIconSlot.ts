import {Container, Sprite} from "pixi.js";
import {Machine, MachineType} from "./Machine";
import {ASSET_STORE} from "../../index";
import {Texture} from "@pixi/core";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";

export class MachineIconSlot extends Container {
    private iconSlot: Sprite;
    private iconTypeImage: Sprite;
    private iconCategoryImage: Sprite;
    private typeChooseMenu: MachineTypeChooseMenu;

    constructor(initialType: MachineType, machine: Machine) {
        super();

        this.iconSlot = new Sprite(ASSET_STORE.MACHINES!.typeIconSlot)
        this.iconSlot.interactive = true
        this.iconSlot.buttonMode = true
        this.iconSlot.on("pointertap", () => {
            this.typeChooseMenu.scale.x > 0.5
                ? this.typeChooseMenu.blendOut()
                : this.typeChooseMenu.blendIn()
        })
        this.addChild(this.iconSlot)

        this.iconCategoryImage = new Sprite()
        this.iconCategoryImage.position.set(45, 39)
        this.iconCategoryImage.anchor.set(0.5)
        this.iconTypeImage = new Sprite()
        this.iconTypeImage.position.set(105, 39)
        this.iconTypeImage.anchor.set(0.5)

        this.updateType(initialType)
        this.addChild(this.iconCategoryImage, this.iconTypeImage)

        this.typeChooseMenu = new MachineTypeChooseMenu(machine)
        this.typeChooseMenu.anchor.set(0, 0.5)
        this.typeChooseMenu.position.set(170, 50)


        this.addChild(this.typeChooseMenu)
    }

    updateType(type: MachineType) {
        this.iconTypeImage.texture = this.getIconTextureForType(type)
        this.iconCategoryImage.texture = this.getCategoryTextureForType(type);
    }

    scaleUp() {
        this.scale.set(1)
    }

    scaleDown() {
        this.scale.set(0)
    }

    private getCategoryTextureForType(type: MachineType): Texture {
        switch (type) {
            case "red":
            case "brown":
            case "yellow":
            case "white":
                return ASSET_STORE.MACHINES!.categoryIcons.color;
            case "sour":
            case "neutral":
            case "savoury":
            case "sweet":
                return ASSET_STORE.MACHINES!.categoryIcons.taste;
            case "powdery":
            case "liquid":
            case "solid":
            case "sticky":
                return ASSET_STORE.MACHINES!.categoryIcons.consistence;
        }
    }

    private getIconTextureForType(type: MachineType): Texture {
        return ASSET_STORE.MACHINES!.typeIcons[type];
    }

}