import {ScalingButton} from "./ScalingButton";
import {ASSET_STORE, SCENE_TRANSITION_MANAGER} from "../../index";
import {Text, Texture} from "pixi.js";

export class LevelButton extends ScalingButton {

    n: number
    enabled: boolean

    onClick(): void {
        SCENE_TRANSITION_MANAGER.transitionTo("level_" + this.n)
    }

    isScalingEnabled(): boolean {
        return this.enabled
    }

    getTexture(): Texture | null {
        return getRecipeTextureForDay(this.n)
    }

    constructor(n: number, enabled: boolean) {
        super();
        this.n = n
        this.enabled = enabled
        this.sprite.scale.set(0.43)
        if (!this.enabled) {
            this.sprite.tint = 0x000000
        }
        let text = new Text(this.n, {
            fontFamily: "Futurahandwritten",
            fontSize: 100,
            fill: this.enabled ? 0x000000 : 0xffffff,
            stroke: this.enabled ?  0xffffff: 0x000000,
            strokeThickness: this.enabled ? 15 : 30,
            lineJoin: "round"
        })
        text.anchor.set(0.5)
        this.addChild(text)
        this.updateTexture()
    }
}

export function getRecipeTextureForDay(day: number): Texture {
    switch (day) {
        case 1:
            return ASSET_STORE.getTextureAsset("SANTAMILK")
        case 2:
            return ASSET_STORE.getTextureAsset("SCHOKOCROSSIES")
        case 3:
            return ASSET_STORE.getTextureAsset("MUERBETEIGKEKSE")
        case 4:
            return ASSET_STORE.getTextureAsset("RUMKUGELN")
        case 5:
            return ASSET_STORE.getTextureAsset("PUNSCH")
        case 6:
            return ASSET_STORE.getTextureAsset("BETHMAENNCHEN")
        case 7:
            return ASSET_STORE.getTextureAsset("ZIMTSTERNE")
        case 8:
            return ASSET_STORE.getTextureAsset("PRINTEN")
        case 9:
            return ASSET_STORE.getTextureAsset("ENGELSAUGEN")
        case 10:
            return ASSET_STORE.getTextureAsset("VANILLEKIPFERL")
        case 11:
            return ASSET_STORE.getTextureAsset("MAKRONEN")
        case 12:
            return ASSET_STORE.getTextureAsset("FLORENTINER")
        case 13:
            return ASSET_STORE.getTextureAsset("SPRITZGEBAECK")
        case 14:
            return ASSET_STORE.getTextureAsset("LEBKUCHEN")
        case 15:
            return ASSET_STORE.getTextureAsset("SPEKULATIUS")
        case 16:
            return ASSET_STORE.getTextureAsset("PFEFFERNUESSE")
        case 17:
            return ASSET_STORE.getTextureAsset("PANETTONE")
        case 18:
            return ASSET_STORE.getTextureAsset("SCHWARZWEISSKEKSE")
        case 19:
            return ASSET_STORE.getTextureAsset("STOLLEN")
        case 20:
            return ASSET_STORE.getTextureAsset("SCHOKOLADENBROT")
        case 21:
            return ASSET_STORE.getTextureAsset("NUSSECKEN")
        case 22:
            return ASSET_STORE.getTextureAsset("CORNFLAKEWALNUSSKEKSE")
        case 23:
            return ASSET_STORE.getTextureAsset("BAERENTATZEN")
        default:
            return ASSET_STORE.getTextureAsset("DOMINOSTEINE")
    }
}