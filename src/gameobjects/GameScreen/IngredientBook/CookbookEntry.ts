import {Container, ITextStyle, Sprite, Text} from "pixi.js";
import {
    getNameForID,
    IngredientColor,
    IngredientConsistence,
    IngredientData,
    IngredientID,
    INGREDIENTS, IngredientTaste
} from "../ConveyorBelt/Ingredient";
import {CenteredSprite} from "../../../General/CenteredSprite";
import {ASSET_STORE, LANGUAGE_MANAGER} from "../../../index";
import {capitalizeFirstLetter} from "../../../General/Helpers";
import {Language, LanguageDependantItem} from "../../../General/LanguageManager";

export class CookbookEntry extends Container implements LanguageDependantItem {

    id: IngredientID
    ingredientData: IngredientData
    // Left Side
    ingredientIcon: Sprite
    ingredientName: Text

    // Right Side
    tasteIcon: Sprite
    tasteText: Text

    plusSign1: Sprite

    consistenceIcon: Sprite
    consistenceText: Text

    plusSign2: Sprite

    colorIcon: Sprite
    colorText: Text

    divider: Sprite

    constructor(id: IngredientID) {
        super();

        let textStyle: Partial<ITextStyle> = {
            fontFamily: "Futurahandwritten",
            fontSize: 35,
            fill: 0x000000,
            fontWeight: "bolder"
        }

        this.id = id
        this.ingredientData = INGREDIENTS[id]

        this.ingredientIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(id))
        this.ingredientIcon.position.set(-450, 0)

        this.ingredientName = new Text(this.ingredientData.text[LANGUAGE_MANAGER.getCurrentLanguage()], textStyle)
        this.ingredientName.anchor.set(0, 0.5)
        this.ingredientName.position.set(-370, 0)

        this.tasteIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(this.ingredientData.taste))
        this.tasteIcon.position.set(100, -20)
        this.tasteText = new Text(getTasteName(this.ingredientData.taste, LANGUAGE_MANAGER.getCurrentLanguage()), textStyle)
        this.tasteText.position.set(100, 40)
        this.tasteText.anchor.set(0.5)

        this.consistenceIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(this.ingredientData.consistence))
        this.consistenceIcon.position.set(265, -20)
        this.consistenceText = new Text(getConsistenceName(this.ingredientData.consistence, LANGUAGE_MANAGER.getCurrentLanguage()), textStyle)
        this.consistenceText.position.set(265, 40)
        this.consistenceText.anchor.set(0.5)

        this.colorIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(this.ingredientData.color))
        this.colorIcon.position.set(430, -20)
        this.colorText = new Text(getColorName(this.ingredientData.color, LANGUAGE_MANAGER.getCurrentLanguage()), textStyle)
        this.colorText.position.set(430, 40)
        this.colorText.anchor.set(0.5)

        this.plusSign1 = new CenteredSprite(ASSET_STORE.getTextureAsset("ingredientOverviewPlus"))
        this.plusSign1.position.set(180, -10)
        this.plusSign2 = new CenteredSprite(ASSET_STORE.getTextureAsset("ingredientOverviewPlus"))
        this.plusSign2.position.set(345, -10)

        this.divider = new CenteredSprite(ASSET_STORE.getTextureAsset("ingredientOverviewSeparator"))
        this.divider.position.set(0, 80)

        this.addChild(this.ingredientIcon, this.ingredientName,
            this.tasteIcon, this.tasteText,
            this.consistenceIcon, this.consistenceText,
            this.colorIcon, this.colorText,
            this.plusSign1, this.plusSign2, this.divider)

        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    setLanguage(newLanguage: Language): void {
        this.cacheAsBitmap = false
        this.colorText.text = getColorName(this.ingredientData.color, newLanguage)
        this.consistenceText.text = getConsistenceName(this.ingredientData.consistence, newLanguage)
        this.tasteText.text = getTasteName(this.ingredientData.taste, newLanguage)
        this.ingredientName.text = getNameForID(this.id, newLanguage)
        this.cacheAsBitmap = true
    }

   hide() {
        this.scale.y = 0
   }

   show() {
        this.scale.y = 1
       this.cacheAsBitmap = true
   }
}

function getColorName(id: IngredientColor, language: Language): string {
    if (language === "en") {
        return capitalizeFirstLetter(id)
    } else {
        switch (id) {
            case "white":
                return "Weiß"
            case "yellow":
                return "Gelb"
            case "brown":
                return "Braun"
            case "red":
                return "Rot"
        }
    }
}

function getConsistenceName(id: IngredientConsistence, language: Language): string  {
    if (language === "en") {
        return capitalizeFirstLetter(id)
    } else {
        switch (id) {
            case "sticky":
                return "Klebrig"
            case "liquid":
                return "Flüssig"
            case "powdery":
                return "Pudrig"
            case "solid":
                return "Fest"
        }
    }
}

function getTasteName(id: IngredientTaste, language: Language): string  {
    if (language === "en") {
        return capitalizeFirstLetter(id)
    } else {
        switch (id) {
            case "neutral":
                return "Neutral"
            case "sweet":
                return "Süß"
            case "sour":
                return "Sauer"
            case "savoury":
                return "Herzhaft"
        }
    }
}