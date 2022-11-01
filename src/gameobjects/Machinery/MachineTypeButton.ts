import {ScalingButton} from "../../ui/Buttons/ScalingButton";
import {Texture} from "pixi.js";
import {MachineType} from "./Machine";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";
import {ASSET_STORE} from "../../index";

export class MachineTypeButton extends ScalingButton {

    chooseMenu: MachineTypeChooseMenu;
    type: MachineType

    constructor(type: MachineType, chooseMenu: MachineTypeChooseMenu) {
        super();
        this.chooseMenu = chooseMenu
        this.type = type
        this.updateTexture()
    }

    getTexture(): Texture {
        return ASSET_STORE.MACHINES!.typeIcons[this.type]
    }

    onClick(): void {
        this.chooseMenu.machine.setType(this.type)
        this.chooseMenu.blendOut()
    }

}