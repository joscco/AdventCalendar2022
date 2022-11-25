import {ScalingButton} from "../../../UI/Buttons/ScalingButton";
import {Texture} from "pixi.js";
import {MachineType} from "./Machine";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";
import {ASSET_STORE, EVENT_EMITTER} from "../../../index";

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
        return ASSET_STORE.getTextureAsset(this.type)
    }

    onClick(): void {
        EVENT_EMITTER.emit(`selected_type_${this.type}`)
        this.chooseMenu.machine.setType(this.type)
        this.chooseMenu.toggleBlend()
    }

}