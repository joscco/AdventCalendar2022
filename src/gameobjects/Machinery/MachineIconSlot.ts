import {Sprite} from "pixi.js";
import {MachineType} from "./Machine";
import {ASSET_STORE} from "../../index";
import {Texture} from "@pixi/core";

export class MachineIconSlot extends Sprite {
    private iconTypeImage: Sprite;
    private iconCategoryImage: Sprite;

    constructor(initialType: MachineType) {
        super();
        this.iconTypeImage = new Sprite()
        this.iconCategoryImage = new Sprite()
        this.updateType(initialType)
    }

    updateType(type: MachineType) {
        this.iconTypeImage.texture = this.getIconTextureForType(type)
        this.iconCategoryImage.texture = this.getCategoryTextureForType(type);
    }

    scaleUp() {
    }

    scaleDown() {

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
                return ASSET_STORE.MACHINES!.categoryIcons.consistence;
            case "powdery":
            case "liquid":
            case "solid":
            case "sticky":
                return ASSET_STORE.MACHINES!.categoryIcons.taste;
        }
    }

    private getIconTextureForType(type: MachineType): Texture{
        return ASSET_STORE.MACHINES!.typeIcons[type];
    }

}