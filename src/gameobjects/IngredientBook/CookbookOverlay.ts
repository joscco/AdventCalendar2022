import {Container} from "pixi.js";
import {IngredientCookbookButton} from "../../UI/Buttons/IngredientCookbookButton";
import {IngredientCookbookCloseButton} from "../../UI/Buttons/IngredientCookbookCloseButton";
import {IngredientCookbook} from "../IngredientCookbook";
import {IngredientID} from "../Ingredient";

export class CookbookOverlay extends Container {

    showingCookBook: boolean
    showingButton: boolean

    cookbookButton: IngredientCookbookButton
    cookbook: IngredientCookbook
    closeButton: IngredientCookbookCloseButton

    constructor() {
        super()

        this.showingCookBook = false
        this.showingButton = false

        this.cookbookButton = new IngredientCookbookButton(this)
        this.cookbookButton.position.set(300, 125)
        this.cookbookButton.hide()

        this.cookbook = new IngredientCookbook(this)

        this.closeButton = new IngredientCookbookCloseButton(this)
        this.closeButton.position.set(-540, 20)
        this.cookbook.addChild(this.closeButton)

        this.addChild(this.cookbookButton, this.cookbook)
    }

    toggleBlendCookbook() {
        if (this.showingCookBook) {
            this.blendOutCookbook()
        } else {
            this.blendInCookbook()
        }
    }

    async blendOutCookbook() {
        this.showingCookBook = false
        this.cookbookButton.updateTexture()
        await this.cookbook.blendOut()
    }

    async blendInCookbook() {
        this.showingCookBook = true
        this.cookbookButton.updateTexture()
        await this.cookbook.blendIn()
    }

    hideCookbook() {
        this.showingCookBook = false
        this.cookbook.hide()
        this.cookbookButton.updateTexture()
    }

    showCookbook() {
        this.showingCookBook = true
        this.cookbook.show()
        this.cookbookButton.updateTexture()
    }

    showButton() {
        this.cookbookButton.show()
        this.cookbookButton.interactive = true
        this.showingButton = true
    }

    hideButton() {
        this.cookbookButton.hide()
        this.cookbookButton.interactive = false
        this.showingButton = false
    }

    updateEntries(unlockedIngredients: IngredientID[]) {
        this.cookbook.updateEntries(unlockedIngredients)
    }
}