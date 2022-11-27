import {Sprite, Text} from "pixi.js";
import {ASSET_MANAGER, GAME_WIDTH, LANGUAGE_MANAGER} from "../../index";
import {IngredientID, INGREDIENTS} from "./Ingredient";
import {IngredientAlarmCancelButton} from "../../UI/Buttons/IngredientAlarmCancelButton";
import {Language, LanguageDependantItem} from "../../General/LanguageManager";

export class UnlockedIngredientAlarm extends Sprite implements LanguageDependantItem {

    ingredientIcon: Sprite
    title: Text
    ingredientName: Text
    cancelButton: IngredientAlarmCancelButton
    shown: boolean = false
    blendOutTimeout?: NodeJS.Timer

    constructor() {
        super(ASSET_MANAGER.getTextureAsset("ingredientOverviewAlarm"));
        this.anchor.set(0.5)
        this.position.set(GAME_WIDTH / 2, -200)

        this.ingredientIcon = new Sprite()
        this.ingredientIcon.anchor.set(0.5)
        this.ingredientIcon.position.set(-240, 0)

        this.title = new Text("New Ingredient!", {fontFamily: "Futurahandwritten", fontSize: 45, fill: 0xFDAC47})
        this.title.anchor.set(0.5)
        this.title.position.set(60, -45)

        this.ingredientName = new Text("", {fontFamily: "Futurahandwritten", fontSize: 55, fill: 0xFFFFFF})
        this.ingredientName.anchor.set(0.5)
        this.ingredientName.position.set(60, 30)

        this.cancelButton = new IngredientAlarmCancelButton()
        this.cancelButton.position.set(this.width / 2 - 5, -this.height / 2 + 5)

        this.addChild(this.ingredientIcon, this.ingredientName, this.title, this.cancelButton)

        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    setLanguage(newLanguage: Language): void {
        this.title.text = newLanguage === "en" ? "New Ingredient!" : "Neue Zutat!"
    }


    async blendIn(newIngredient: IngredientID) {
        await this.blendOut()
        this.ingredientName.text = INGREDIENTS[newIngredient].text[LANGUAGE_MANAGER.getCurrentLanguage()]
        this.ingredientIcon.texture = ASSET_MANAGER.getTextureAsset(newIngredient)
        await gsap.to(this.position, {y: 150, duration: 0.5, ease: Back.easeInOut})
        this.shown = true

        setTimeout(() => this.blendOut(), 1000)
    }

    async blendOut() {
        clearTimeout(this.blendOutTimeout)
        if (this.shown) {
            this.shown = false
            await gsap.to(this.position, {y: -200, duration: 0.5, ease: Back.easeInOut})
        }
    }

}