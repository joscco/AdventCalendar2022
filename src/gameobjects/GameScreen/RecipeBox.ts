import {getNameForID, IngredientID} from "./ConveyorBelt/Ingredient";
import {Container, Graphics, Sprite, Text} from "pixi.js";
import {ASSET_STORE, LANGUAGE_MANAGER} from "../../index";
import {Language, LanguageDependantItem} from "../../General/LanguageManager";

export type Recipe = {
    name: {en: string, de: string},
    ingredients: IngredientID[]
}

class RecipeBoxIngredient extends Container implements LanguageDependantItem {
    itemID: IngredientID
    textObject: Text;
    strikeLine: Sprite;
    lineMask: Graphics;
    isFulfilled: boolean = false;

    constructor(id: IngredientID) {
        super();

        this.itemID = id
        this.textObject = new Text(id, {fontFamily: "Futurahandwritten", fontSize: 30, fill: 0x777777})
        this.textObject.anchor.set(0, 0.5)

        this.strikeLine = new Sprite(ASSET_STORE.getTextureAsset("recipeLongStrike"))
        this.strikeLine.anchor.set(0, 0.5)
        this.strikeLine.position.set(-10, 0)

        this.lineMask = new Graphics()
        this.lineMask.beginFill(0x000000)
        this.lineMask.drawRect(0, 0, this.textObject.width + 15, this.textObject.height)
        this.lineMask.endFill()
        this.lineMask.scale.set(0, 1)
        this.strikeLine.addChild(this.lineMask)

        this.strikeLine.mask = this.lineMask

        this.addChild(this.textObject, this.strikeLine)

        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    setLanguage(newLanguage: Language): void {
        this.textObject.text = getNameForID(this.itemID, newLanguage)
    }

    setFulfilled(value: boolean) {
        this.isFulfilled = value
        gsap.to(this.lineMask.scale, {x: this.isFulfilled ? 1 : 0, y: 1, duration: 0.4, ease: Quad.easeInOut})
    }

    reset() {
        this.setFulfilled(false)
    }
}

export class RecipeBox extends Sprite implements LanguageDependantItem {

    titleText: Text
    recipe: Recipe;
    ingredients: RecipeBoxIngredient[] = [];

    constructor(recipe: Recipe) {
        super()
        this.recipe = recipe
        this.texture = ASSET_STORE.getTextureAsset("recipeBox")
        this.anchor.set(0.5, 0)

        this.titleText = this.addTitle(this.recipe.name[LANGUAGE_MANAGER.getCurrentLanguage()])
        this.addChecklist(this.recipe.ingredients)
    }

    setLanguage(newLanguage: Language): void {
        this.titleText.text = this.recipe.name[newLanguage]
    }

    checkIngredientsAreProvided(neededIngredients: IngredientID[], providedIngredients: IngredientID[]): boolean[] {
        let provisionCopy = Object.assign([], providedIngredients);
        let result = []
        for (let neededIngredient of neededIngredients) {
            const index = provisionCopy.indexOf(neededIngredient);
            if (index !== -1) {
                provisionCopy.splice(index, 1);
                result.push(true)
            } else {
                result.push(false)
            }
        }
        return result
    }

    private addTitle(name: string): Text {
        let banner = new Sprite(ASSET_STORE.getTextureAsset("recipeNameBanner"))
        banner.anchor.set(0.5)
        banner.position.set(0, 75)

        let title = new Text(name, {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xffffff})
        title.anchor.set(0.5)
        title.position.set(0, -2)
        banner.addChild(title)
        this.addChild(banner)

        return title
    }

    private addChecklist(ingredients: IngredientID[]) {
        let sortedIngredients = ingredients.sort((a, b) => a.localeCompare(b))
        sortedIngredients.forEach((id, index) => {
            let ingredientSlot = new RecipeBoxIngredient(id)
            this.ingredients.push(ingredientSlot)
            ingredientSlot.position.set(-140, 150 + index * 45)
            this.addChild(ingredientSlot)
        })
    }
}

export const RecipeIDs = [
    "SANTAMILK",
    "SCHOKOCROSSIES",
    "MUERBETEIGKEKSE",
    "RUMKUGELN",
    "PUNSCH",
    "BETHMAENNCHEN",
    "ZIMTSTERNE",
    "PRINTEN",
    "ENGELSAUGEN",
    "VANILLEKIPFERL",
    "MAKRONEN",
    "FLORENTINER",
    "SPRITZGEBAECK",
    "LEBKUCHEN",
    "SPEKULATIUS",
    "PFEFFERNUESSE",
    "PANETTONE",
    "SCHWARZWEISSKEKSE",
    "STOLLEN",
    "SCHOKOLADENBROT",
    "NUSSECKEN",
    "CORNFLAKEWALNUSSKEKSE",
    "BAERENTATZEN",
    "DOMINOSTEINE"
    ] as const

export type RecipeID = typeof RecipeIDs[number]

export const RECIPES: { [keys in RecipeID]: Recipe } = {
    SANTAMILK: {name: {en: "Santa's Milk", de: "Weihnachtsmilch"}, ingredients: ["milk", "honey"]},
    SCHOKOCROSSIES: {name: {en: "Flake Nests", de: "Schokocrossies"}, ingredients: ["melted_chocolate", "peeled_nuts", "cornflakes"]},
    MUERBETEIGKEKSE: {name: {en: "Butter Cookies", de: "Mürbeteigkekse"}, ingredients: ["flour", "butter", "egg", "sugar"]},
    RUMKUGELN: {name: {en: "Rum Truffles", de: "Rumkugeln"}, ingredients: ["butter", "sugar", "melted_chocolate", "rum_aroma"]},
    BETHMAENNCHEN: {name: {en: "Bethmännchen", de: "Bethmännchen"}, ingredients: ["flour", "egg", "sugar", "marzipan", "nuts"]},
    PUNSCH: {name: {en: "Hot Punch", de: "Heißer Punsch"}, ingredients: ["wine", "spices", "brown_sugar", "lemon_juice"]},
    ZIMTSTERNE: {name: {en: "Cinnamon Stars", de: "Zimtsterne"}, ingredients: ["egg", "sugar", "spices", "ground_nuts", "nut_aroma"]},
    PRINTEN: {name: {en: "Printen", de: "Printen"}, ingredients: ["flour", "egg", "honey", "candied_lemon_peel", "spices"]},
    VANILLEKIPFERL: {name: {en: "Vanilla Crescents", de: "Vanillekipferl"}, ingredients: ["flour", "butter", "sugar", "vanilla_sugar", "ground_nuts"]},
    FLORENTINER: {name: {en: "Florentines", de: "Florentiner"}, ingredients: ["butter", "sugar", "melted_chocolate", "honey", "peeled_nuts"]},
    MAKRONEN: {name: {en: "Macarons", de: "Makronen"}, ingredients: ["egg", "sugar", "vanilla_sugar", "ground_nuts", "nut_aroma", "cherry_sauce"]},
    SPRITZGEBAECK: {name: {en: "Spritz Biscuits", de: "Spritzgebäck"}, ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice"]},
    SPEKULATIUS: {name: {en: "Speculoos", de: "Spekulatius"}, ingredients: ["flour", "butter", "egg", "sugar", "spices", "ground_nuts"]},
    SCHOKOLADENBROT: {name: {en: "Chocolate Cake", de: "Schokoladenbrot"}, ingredients: ["flour", "butter", "egg", "sugar", "melted_chocolate", "ground_nuts"]},
    ENGELSAUGEN: {name: {en: "Angel Eyes", de: "Engelsaugen"}, ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice", "cherry_jam"]},
    SCHWARZWEISSKEKSE: {name: {en: "Chess Cookies", de: "Schwarzweißkekse"}, ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "nut_aroma", "cocoa"]},
    LEBKUCHEN: {name: {en: "Gingerbread", de: "Lebkuchen"}, ingredients: ["flour", "butter", "egg", "lemon_juice", "honey", "spices", "brown_sugar", "cocoa"]},
    PFEFFERNUESSE: {name: {en: "Pfeffernüsse", de: "Pfeffernüsse"}, ingredients: ["flour", "butter", "egg", "sugar", "honey", "spices", "peeled_nuts", "nut_aroma"]},
    PANETTONE: {name: {en: "Panettone", de: "Panettone"}, ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "candied_lemon_peel", "raisins", "cherries"]},
    BAERENTATZEN: {name: {en: "Bear Paws", de: "Bärentatzen"}, ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "ground_nuts"]},
    NUSSECKEN: {name: {en: "Nut Wedges", de: "Nussecken"}, ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "ground_nuts", "peeled_nuts"]},
    DOMINOSTEINE: {name: {en: "Dominosteine", de: "Dominosteine"}, ingredients: ["flour", "egg", "sugar", "cherry_jam", "marzipan", "melted_chocolate", "spices", "cocoa", "nut_aroma"]},
    CORNFLAKEWALNUSSKEKSE: {name: {en: "Walnut Cookies", de: "Walnusskekse"}, ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "melted_chocolate", "ground_nuts", "cornflakes", "nut_aroma"]},
    STOLLEN: {name: {en: "Stollen", de: "Stollen"}, ingredients: ["flour", "butter", "vanilla_sugar", "sugar", "lemon_juice", "candied_lemon_peel", "nut_aroma", "peeled_nuts", "milk", "raisins"]}
}