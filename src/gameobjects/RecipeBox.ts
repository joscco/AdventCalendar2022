import {getNameForID, IngredientID} from "./Ingredient";
import {Container, Graphics, Sprite, Text} from "pixi.js";
import {ASSET_STORE} from "../index";

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
        banner.position.set(0, 90)

        let title = new Text(name, {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xffffff})
        title.anchor.set(0.5)
        title.position.set(0, -7)
        banner.addChild(title)
        this.addChild(banner)
    }

    private addChecklist(ingredients: IngredientID[]) {
        ingredients.forEach((id, index) => {
            let ingredientSlot = new RecipeBoxIngredient(getNameForID(id))
            this.ingredients.push(ingredientSlot)
            ingredientSlot.position.set(-120, 175 + index * 50)
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
    MUERBETEIGKEKSE: {name: "Butter Cookies", ingredients: ["flour", "butter", "egg_yolk", "sugar"]},
    RUMKUGELN: {name: "Rum Truffles", ingredients: ["butter", "sugar", "melted_chocolate", "rum_aroma"]},
    PUNSCH: {name: "Hot Punch", ingredients: ["wine", "spices", "brown_sugar", "lemon_juice"]},
    BETHMAENNCHEN: {name: "Bethmännchen", ingredients: ["flour", "egg_yolk", "sugar", "marzipan", "nuts"]},
    ZIMTSTERNE: {name: "Cinnamon Stars", ingredients: ["egg_yolk", "sugar", "spices", "grinded_nuts", "nut_aroma"]},
    PRINTEN: {name: "Printen", ingredients: ["flour", "egg_yolk", "honey", "candied_lemon_peel", "spices"]},
    ENGELSAUGEN: {name: "Angel Eyes", ingredients: ["flour", "butter", "egg_yolk", "sugar", "vanilla_sugar", "lemon_juice", "cherry_jam"]},
    VANILLEKIPFERL: {name: "Vanilla Crescents", ingredients: ["flour", "butter", "sugar", "vanilla_sugar", "grinded_nuts"]},
    MAKRONEN: {name: "Macarons", ingredients: ["egg_yolk", "sugar", "vanilla_sugar", "grinded_nuts", "nut_aroma", "cherry_sauce"]},
    FLORENTINER: {name: "Florentines", ingredients: ["butter", "sugar", "melted_chocolate", "honey", "peeled_nuts"]},
    SPRITZGEBAECK: {name: "Spritz Biscuits", ingredients: ["flour", "butter", "egg_yolk", "sugar", "vanilla_sugar", "lemon_juice"]},
    LEBKUCHEN: {name: "Gingerbread", ingredients: ["flour", "butter", "egg_yolk", "lemon_juice", "honey", "spices", "brown_sugar", "cocoa"]},
    SPEKULATIUS: {name: "Speculoos", ingredients: ["flour", "butter", "egg_yolk", "sugar", "spices", "grinded_nuts"]},
    PFEFFERNUESSE: {name: "Pfeffernüsse", ingredients: ["flour", "butter", "egg_yolk", "sugar", "honey", "spices", "peeled_nuts", "nut_aroma"]},
    PANETTONE: {name: "Panettone", ingredients: ["flour", "butter", "egg_yolk", "vanilla_sugar", "sugar", "candied_lemon_peel", "raisins", "cherries"]},
    SCHWARZWEISSKEKSE: {name: "Chess Cookies", ingredients: ["flour", "butter", "egg_yolk", "vanilla_sugar", "sugar", "nut_aroma", "cocoa"]},
    STOLLEN: {name: "Stollen", ingredients: ["flour", "butter", "vanilla_sugar", "sugar", "lemon_juice", "candied_lemon_peel", "nut_aroma", "peeled_nuts", "milk", "raisins"]},
    SCHOKOLADENBROT: {name: "Chocolate Bread", ingredients: ["flour", "butter", "egg_yolk", "sugar", "melted_chocolate", "grinded_nuts"]},
    NUSSECKEN: {name: "Nut wedges", ingredients: ["flour", "butter", "egg_yolk", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "grinded_nuts", "peeled_nuts"]},
    CORNFLAKEWALNUSSKEKSE: {name: "Walnut Cookies", ingredients: ["flour", "butter", "egg_yolk", "sugar", "vanilla_sugar", "melted_chocolate", "grinded_nuts", "cornflakes", "nut_aroma"]},
    BAERENTATZEN: {name: "Bear Paws", ingredients: ["flour", "butter", "egg_yolk", "sugar", "vanilla_sugar", "cherry_jam", "melted_chocolate", "grinded_nuts"]},
    DOMINOSTEINE: {name: "Dominosteine", ingredients: ["flour", "egg_yolk", "sugar", "cherry_jam", "marzipan", "melted_chocolate", "spices", "cocoa", "nut_aroma"]}
}