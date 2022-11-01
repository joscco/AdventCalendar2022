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
    private clicked: boolean = false

    constructor(initialType: MachineType, machine: Machine) {
        super();

        this.iconSlot = this.initIconSlot()

        this.iconCategoryImage = new Sprite()
        this.iconCategoryImage.position.set(35, 42)
        this.iconCategoryImage.scale.set(0.85)
        this.iconCategoryImage.anchor.set(0.5)
        this.iconTypeImage = new Sprite()
        this.iconTypeImage.position.set(85, 42)
        this.iconTypeImage.scale.set(0.85)
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

    public blendOutTypeChooserInstantly() {
        this.typeChooseMenu.scale.set(0)
    }

    private getIconTextureForType(type: MachineType): Texture {
        return ASSET_STORE.MACHINES!.typeIcons[type];
    }

    private initIconSlot() {
        let sprite = new Sprite(ASSET_STORE.MACHINES!.typeIconSlot)
        sprite.interactive = true
        sprite.buttonMode = true
        sprite.on("pointertap",() => {
            if (this.clicked) {
                this.typeChooseMenu.toggleBlend()
            }
            this.clicked = true;
            setTimeout(() => {this.clicked = false}, 600)
        })
        this.addChild(sprite)
        return sprite
    }
}