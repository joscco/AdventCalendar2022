import {Container, Sprite} from "pixi.js";
import {Machine, MachineType} from "./Machine";
import {ASSET_STORE} from "../../../index";
import {Texture} from "@pixi/core";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";
import {GridItem} from "../Grid/GridItem";
import {OutlineFilter} from "@pixi/filter-outline";

export class MachineIconSlot extends Container {
    private iconSlot: Sprite;
    private iconTypeImage: Sprite;
    private typeChooseMenu: MachineTypeChooseMenu;
    private gridItem?: GridItem;
    private typeLockOverlay: Sprite;

    constructor(initialType: MachineType, machine: Machine) {
        super();

        this.iconSlot = this.initIconSlot()
        this.iconSlot.anchor.set(0.5)
        this.addChild(this.iconSlot)

        this.iconTypeImage = new Sprite()
        this.iconTypeImage.anchor.set(0.5)

        this.updateType(initialType)

        this.addChild(this.iconTypeImage)

        this.typeChooseMenu = new MachineTypeChooseMenu(machine)



        this.typeLockOverlay = new Sprite(ASSET_STORE.getTextureAsset("lockSymbol"))
        this.typeLockOverlay.anchor.set(0.5)
        this.typeLockOverlay.position.set(25, -20)
        this.typeLockOverlay.visible = false

        this.addChild(this.typeLockOverlay)
        this.addChild(this.typeChooseMenu)
    }

    setGridItem(gridItem: GridItem) {
        this.gridItem = gridItem
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

    private getIconTextureForType(type: MachineType): Texture {
        return ASSET_STORE.getTextureAsset(type);
    }

    private initIconSlot() {
        return new Sprite(ASSET_STORE.getTextureAsset("machineIconSlot"))
    }

    blendOut() {
        if (this.typeChooseMenu.shown) {
            this.typeChooseMenu.toggleBlend()
        }
    }

    toggleBlend() {
        this.typeChooseMenu.toggleBlend()
    }

    isShowingTypeChoosingMenu(): boolean {
        return this.typeChooseMenu.shown
    }

    showAsTypeLocked() {
        this.typeLockOverlay.visible = true
        this.iconTypeImage.tint = 0xeeeeee
        this.iconSlot.visible = false
    }

    showAsTypeVariable() {
        this.typeLockOverlay.visible = false
        this.iconTypeImage.tint = 0xffffff
        this.iconSlot.visible = true

    }

    highlightTypeIcon(iconType: MachineType) {
        this.typeChooseMenu.typeButtons.forEach(button => {
            if (button.type === iconType) {
                button.filters = [new OutlineFilter(10, 0xfd4343, 0.2)]
            }
        })
    }

    unhighlightTypeIcons() {
        this.typeChooseMenu.typeButtons.forEach(button => button.filters = [])
    }
}