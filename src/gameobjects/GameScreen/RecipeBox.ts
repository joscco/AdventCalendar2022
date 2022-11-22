import {getNameForID, IngredientID} from "./ConveyorBelt/Ingredient";
import {Container, Graphics, Sprite, Text} from "pixi.js";
import {ASSET_STORE} from "../../index";

export type Recipe = {
    name: string,
    ingredients: IngredientID[]
}

class RecipeBoxIngredient extends Container {
    text: Text;
    strikeLine: Sprite;
    lineMask: Graphics;
    isFulfilled: boolean = false;

    constructor(name: string) {
        super();

        this.text = new Text(name, {fontFamily: "Futurahandwritten", fontSize: 30, fill: 0x777777})
        this.text.anchor.set(0, 0.5)

        this.strikeLine = new Sprite(ASSET_STORE.getTextureAsset("recipeLongStrike"))
        this.strikeLine.anchor.set(0, 0.5)
        this.strikeLine.position.set(-10, 0)

        this.lineMask = new Graphics()
        this.lineMask.beginFill(0x000000)
        this.lineMask.drawRect(0, 0, this.text.width + 15, this.text.height)
        this.lineMask.endFill()
        this.lineMask.scale.set(0, 1)
        this.strikeLine.addChild(this.lineMask)

        this.strikeLine.mask = this.lineMask

        this.addChild(this.text, this.strikeLine)
    }

    setFulfilled(value: boolean) {
        this.isFulfilled = value
        gsap.to(this.lineMask.scale, {x: this.isFulfilled ? 1 : 0, y: 1, duration: 0.4, ease: Quad.easeInOut})
    }

    reset() {
        this.setFulfilled(false)
    }
}

export class RecipeBox extends Sprite {

    recipe: Recipe;
    ingredients: RecipeBoxIngredient[] = [];

    constructor(recipe: Recipe) {
        super()
        this.recipe = recipe
        this.texture = ASSET_STORE.getTextureAsset("recipeBox")
        this.anchor.set(0.5, 0)

        this.addTitle(this.recipe.name)
        this.addChecklist(this.recipe.ingredients)
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

    private addTitle(name: string) {
        let banner = new Sprite(ASSET_STORE.getTextureAsset("recipeNameBanner"))
        banner.anchor.set(0.5)
        banner.position.set(0, 75)

        let title = new Text(name, {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xffffff})
        title.anchor.set(0.5)
        title.position.set(0, -2)
        banner.addChild(title)
        this.addChild(banner)
    }

    private addChecklist(ingredients: IngredientID[]) {
        let sortedIngredients = ingredients.sort((a, b) => a.localeCompare(b))
        sortedIngredients.forEach((id, index) => {
            let ingredientSlot = new RecipeBoxIngredient(getNameForID(id))
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
    SANTAMILK: {name: "Santa's Milk", ingredients: ["milk", "honey"]},
    SCHOKOCROSSIES: {name: "Flake Nests", ingredients: ["melted_chocolate", "peeled_nuts", "cornflakes"]},
    MUERBETEIGKEKSE: {name: "Butter Cookies", ingredients: ["flour", "butter", "egg", "sugar"]},
    RUMKUGELN: {name: "Rum Truffles", ingredients: ["butter", "sugar", "melted_chocolate", "rum_aroma"]},
    BETHMAENNCHEN: {name: "Bethmännchen", ingredients: ["flour", "egg", "sugar", "marzipan", "nuts"]},
    PUNSCH: {name: "Hot Punch", ingredients: ["wine", "spices", "brown_sugar", "lemon_juice"]},
    ZIMTSTERNE: {name: "Cinnamon Stars", ingredients: ["egg", "sugar", "spices", "ground_nuts", "nut_aroma"]},
    PRINTEN: {name: "Printen", ingredients: ["flour", "egg", "honey", "candied_lemon_peel", "spices"]},
    VANILLEKIPFERL: {name: "Vanilla Crescents", ingredients: ["flour", "butter", "sugar", "vanilla_sugar", "ground_nuts"]},
    FLORENTINER: {name: "Florentines", ingredients: ["butter", "sugar", "melted_chocolate", "honey", "peeled_nuts"]},
    MAKRONEN: {name: "Macarons", ingredients: ["egg", "sugar", "vanilla_sugar", "ground_nuts", "nut_aroma", "cherry_sauce"]},
    SPRITZGEBAECK: {name: "Spritz Biscuits", ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice"]},
    SPEKULATIUS: {name: "Speculoos", ingredients: ["flour", "butter", "egg", "sugar", "spices", "ground_nuts"]},
    SCHOKOLADENBROT: {name: "Chocolate Cake", ingredients: ["flour", "butter", "egg", "sugar", "melted_chocolate", "ground_nuts"]},
    ENGELSAUGEN: {name: "Angel Eyes", ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice", "cherry_jam"]},
    SCHWARZWEISSKEKSE: {name: "Chess Cookies", ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "nut_aroma", "cocoa"]},
    LEBKUCHEN: {name: "Gingerbread", ingredients: ["flour", "butter", "egg", "lemon_juice", "honey", "spices", "brown_sugar", "cocoa"]},
    PFEFFERNUESSE: {name: "Pfeffernüsse", ingredients: ["flour", "butter", "egg", "sugar", "honey", "spices", "peeled_nuts", "nut_aroma"]},
    PANETTONE: {name: "Panettone", ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "candied_lemon_peel", "raisins", "cherries"]},
    BAERENTATZEN: {name: "Bear Paws", ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "ground_nuts"]},
    NUSSECKEN: {name: "Nut Wedges", ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "ground_nuts", "peeled_nuts"]},
    DOMINOSTEINE: {name: "Dominosteine", ingredients: ["flour", "egg", "sugar", "cherry_jam", "marzipan", "melted_chocolate", "spices", "cocoa", "nut_aroma"]},
    CORNFLAKEWALNUSSKEKSE: {name: "Walnut Cookies", ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "melted_chocolate", "ground_nuts", "cornflakes", "nut_aroma"]},
    STOLLEN: {name: "Stollen", ingredients: ["flour", "butter", "vanilla_sugar", "sugar", "lemon_juice", "candied_lemon_peel", "nut_aroma", "peeled_nuts", "milk", "raisins"]}
}