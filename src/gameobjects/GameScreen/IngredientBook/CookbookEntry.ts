import {Container, ITextStyle, Sprite, Text} from "pixi.js";
import {IngredientID, INGREDIENTS} from "../ConveyorBelt/Ingredient";
import {CenteredSprite} from "../../../General/CenteredSprite";
import {ASSET_STORE} from "../../../index";
import {capitalizeFirstLetter} from "../../../General/Helpers";

export class CookbookEntry extends Container {

    id: IngredientID
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

        let textStyle: Partial<ITextStyle> = {fontFamily: "Futurahandwritten", fontSize: 35, fill: 0x000000, fontWeight: "bolder"}

        this.id = id
        let ingredientData = INGREDIENTS[id]

        this.ingredientIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(id))
        this.ingredientIcon.position.set(-450, 0)

        this.ingredientName = new Text(ingredientData.text, textStyle)
        this.ingredientName.anchor.set(0, 0.5)
        this.ingredientName.position.set(-370, 0)

        this.tasteIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(ingredientData.taste))
        this.tasteIcon.position.set(100, -20)
        this.tasteText = new Text(capitalizeFirstLetter(ingredientData.taste), textStyle)
        this.tasteText.position.set(100, 40)
        this.tasteText.anchor.set(0.5)

        this.consistenceIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(ingredientData.consistence))
        this.consistenceIcon.position.set(265, -20)
        this.consistenceText = new Text(capitalizeFirstLetter(ingredientData.consistence), textStyle)
        this.consistenceText.position.set(265, 40)
        this.consistenceText.anchor.set(0.5)

        this.colorIcon = new CenteredSprite(ASSET_STORE.getTextureAsset(ingredientData.color))
        this.colorIcon.position.set(430, -20)
        this.colorText = new Text(capitalizeFirstLetter(ingredientData.color), textStyle)
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
    }

   hide() {
        this.scale.y = 0
   }

   show() {
        this.scale.y = 1
       this.cacheAsBitmap = true
   }
}