import {ScalingButton} from "./ScalingButton";
import {Texture} from "@pixi/core";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
import {FactoryScene} from "../../scenes/FactoryScene";

export class StepButton extends ScalingButton {

    factoryScene: FactoryScene

    constructor(factoryScene: FactoryScene) {
        super();
        this.factoryScene = factoryScene
    }

    getTexture(): Texture | null {
        return ASSET_STORE.getTextureAsset("proceedButton");
    }

    async onClick(): Promise<void> {
        SOUND_MANAGER.playBlub()
        this.factoryScene.checkRecipe()
        // Wait one second until all belts have adapted
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}