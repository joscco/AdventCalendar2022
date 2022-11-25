import {Container} from "pixi.js";
import {IngredientCookbookButton} from "../../../UI/Buttons/IngredientCookbookButton";
import {IngredientCookbookCloseButton} from "../../../UI/Buttons/IngredientCookbookCloseButton";
import {IngredientCookbook} from "./IngredientCookbook";
import {IngredientID} from "../ConveyorBelt/Ingredient";
import {EVENT_EMITTER, GAME_HEIGHT} from "../../../index";
import {OutlineFilter} from "@pixi/filter-outline";

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
        this.cookbookButton.position.set(130, GAME_HEIGHT - 130)
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
        EVENT_EMITTER.emit("closed_ingredient_cookbook")
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

    blendOutButton() {
        this.cookbookButton.interactive = false
        this.showingButton = false
        this.cookbookButton.blendOut()
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

    disableButton() {
        this.cookbookButton.interactive = false
    }

    enableButton() {
        this.cookbookButton.interactive = true
    }

    highlightButton() {
        this.cookbookButton.filters = [new OutlineFilter(10, 0xfd4343, 0.2)]
    }

    unhighlightButton() {
        this.cookbookButton.filters = []
    }

    enableCancelButton() {
        this.closeButton.interactive = true
    }

    disableCancelButton() {
        this.closeButton.interactive = false
    }

    highlightCancelButton() {
        this.closeButton.filters = [new OutlineFilter(10, 0xfd4343, 0.2)]
    }

    unhighlightCancelButton() {
        this.closeButton.filters = []
    }
}