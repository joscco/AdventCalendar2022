import {Sprite, Text} from "pixi.js";
import {ASSET_STORE, GAME_WIDTH} from "../../../index";
import {IngredientID, INGREDIENTS} from "../ConveyorBelt/Ingredient";
import {IngredientAlarmCancelButton} from "../../../UI/Buttons/IngredientAlarmCancelButton";

export class UnlockedIngredientAlarm extends Sprite {

    ingredientIcon: Sprite
    title: Text
    ingredientName: Text
    cancelButton: IngredientAlarmCancelButton
    shown: boolean = false
    blendOutTimeout?: NodeJS.Timer

    constructor() {
        super(ASSET_STORE.getTextureAsset("ingredientOverviewAlarm"));
        this.anchor.set(0.5)
        this.position.set(GAME_WIDTH / 2,- 200)

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
    }


    async blendIn(newIngredient: IngredientID) {
        await this.blendOut()
        this.ingredientName.text = INGREDIENTS[newIngredient].text
        this.ingredientIcon.texture = ASSET_STORE.getTextureAsset(newIngredient)
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