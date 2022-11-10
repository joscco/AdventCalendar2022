import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_STORE, SOUND_MANAGER} from "../../index";
import {IngredientCookBook} from "../../gameobjects/IngredientCookBook";

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
        SOUND_MANAGER.playBlub()
        if (this.showingRecipes) {
            this.cookbook.blendOut()
        } else {
            this.cookbook.blendIn();
        }
        this.showingRecipes = !this.showingRecipes
        this.updateTexture()
    }

    close() {
        this.cookbook.hide()
        this.showingRecipes = false
        this.updateTexture()
    }
}