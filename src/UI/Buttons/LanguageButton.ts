import {ScalingButton} from "./ScalingButton";
import {Texture} from "@pixi/core";
import {ASSET_STORE, GAME_DATA, LANGUAGE_MANAGER, SOUND_MANAGER} from "../../index";

export class LanguageButton extends ScalingButton {

    getTexture(): Texture | null {
        return GAME_DATA.getPreferredLanguage() === "en"
            ? ASSET_STORE.getTextureAsset("english_flag")
            : ASSET_STORE.getTextureAsset("german_flag");
    }

    onClick(): void {
        LANGUAGE_MANAGER.swapLanguage()
        SOUND_MANAGER.playBlub()
        this.updateTexture()
    }

}