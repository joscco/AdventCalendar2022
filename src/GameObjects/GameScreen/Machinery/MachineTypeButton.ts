import {ScalingButton} from "../../../UI/Buttons/ScalingButton";
import {Texture} from "pixi.js";
import {MachineType} from "./Machine";
import {MachineTypeChooseMenu} from "./MachineTypeChooseMenu";
import {ASSET_MANAGER, EVENT_EMITTER, LANGUAGE_MANAGER, TOOLTIP_MANAGER} from "../../../index";
import {Language, LanguageDependantItem} from "../../../General/LanguageManager";
import {capitalizeFirstLetter} from "../../../General/Helpers";
import {Tooltipable} from "../../Tooltip/TooltipManager";

export class MachineTypeButton extends ScalingButton implements LanguageDependantItem, Tooltipable {

    tooltipText: string
    chooseMenu: MachineTypeChooseMenu;
    type: MachineType

    constructor(type: MachineType, chooseMenu: MachineTypeChooseMenu) {
        super();
        this.chooseMenu = chooseMenu
        this.type = type
        this.tooltipText = ""

        this.updateTexture()
        TOOLTIP_MANAGER.registerTooltipFor(this)
        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    isTooltipEnabled(): boolean {
        return true
    }

    getTooltipText() {
        return this.tooltipText;
    }

    getTexture(): Texture {
        return ASSET_MANAGER.getTextureAsset(this.type)
    }

    onClick(): void {
        EVENT_EMITTER.emit(`selected_type_${this.type}`)
        this.chooseMenu.machine.setType(this.type)
        this.chooseMenu.toggleBlend()
    }

    setLanguage(newLanguage: Language): void {
        this.tooltipText = getNameForMachineType(this.type, newLanguage)
    }
}

function getNameForMachineType(type: MachineType, language: Language): string{
    if (language === "en") {
        return capitalizeFirstLetter(type)
    } else {
        switch (type) {
            case "neutral":
                return "Neutral";
            case "sweet":
                return "Süß";
            case "sour":
                return "Sauer";
            case "savoury":
                return "Herzhaft";
            case "sticky":
                return "Klebrig";
            case "liquid":
                return "Flüssig";
            case "powdery":
                return "Pudrig";
            case "solid":
                return "Fest";
            case "white":
                return "Weiß"
            case "yellow":
                return "Gelb"
            case "brown":
                return "Braun"
            case "red":
                return "Rot"
        }
    }
}