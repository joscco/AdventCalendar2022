import {ScalingButton} from "./ScalingButton";
import {IngredientCookBook} from "../../scenes/FactoryScene";
import {Texture} from "pixi.js";
import {ASSET_STORE} from "../../index";

export class RecipeOverviewButton extends ScalingButton {
    showingRecipes: boolean = false
    cookbook: IngredientCookBook

    constructor(cookbook: IngredientCookBook) {
        super();
        this.cookbook = cookbook
    }

    getTexture(): Texture | null {
        return this.showingRecipes
            ? ASSET_STORE.getTextureAsset("recipeButtonOpen")
            : ASSET_STORE.getTextureAsset("recipeButtonClosed");
    }

    onClick(): void {
        if (this.showingRecipes) {
            this.cookbook.blendOut()
        } else {
            this.cookbook.blendIn();
        }
        this.showingRecipes = !this.showingRecipes
        this.updateTexture()
    }
}