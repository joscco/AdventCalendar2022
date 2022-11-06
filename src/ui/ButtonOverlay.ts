import {Container, Texture} from "pixi.js";
import {Button} from "./Buttons/Button";
import {ASSET_STORE} from "../index";
import {ScalingButton} from "./Buttons/ScalingButton";
import {BackToLevelScreenButton} from "./Buttons/BackToLevelScreenButton";

class RecipeOverviewButton extends ScalingButton {
    getTexture(): Texture | null {
        return ASSET_STORE.GAME_SCENE!.recipeButton;
    }

    onClick(): void {
    }
}

export class UIButtonOverlay extends Container {
    private backToLevelScreenButton: Button;
    private recipeButton: Button;

    constructor() {
        super();

        this.backToLevelScreenButton = new BackToLevelScreenButton()
        this.recipeButton = new RecipeOverviewButton()

        this.backToLevelScreenButton.position.set(125, 125)
        this.recipeButton.position.set(300, 125)

        this.addChild(this.backToLevelScreenButton, this.recipeButton)
    }
}