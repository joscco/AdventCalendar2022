// Klasse als Darstellung eines Zutaten-Zustands (Geschmack, Konsistenz, Farbe, Position)
import {Container, Sprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {ASSET_STORE} from "../index";

export class Ingredient extends Container {

    ingredientData?: IngredientData;
    sprite: Sprite

    constructor(private taste: IngredientTaste = "neutral",
                private consistency: IngredientConsistence = "sticky",
                private color: IngredientColor = "white") {
        super()
        this.taste = taste
        this.consistency = consistency
        this.color = color
        this.updateIngredientData()
        this.sprite = new Sprite()
        this.sprite.anchor.set(0.5, 1)
        this.sprite.texture = this.getTexture()
        this.sprite.position.set(0, 40)
        this.addChild(this.sprite)

        gsap.to(this.sprite.scale, {x: 1.1, y:0.9, duration: 0.5, yoyo: true, repeat: -1, ease: Back.easeInOut})
    }

    setTaste(newTaste: IngredientTaste) : void {
        this.taste = newTaste
        this.updateIngredientData()
        this.sprite.texture = this.getTexture()
    }

    setConsistence(newConsistency: IngredientConsistence) : void {
        this.consistency = newConsistency
        this.updateIngredientData()
        this.sprite.texture = this.getTexture()
    }

    setColor(newColor: IngredientColor) : void {
        this.color = newColor
        this.updateIngredientData()
        this.sprite.texture = this.getTexture()
    }

    getTaste(): IngredientTaste {
        return this.taste
    }

    getConsistency(): IngredientConsistence {
        return this.consistency
    }

    getColor(): IngredientColor {
        return this.color
    }

    getTexture(): Texture {
        return ASSET_STORE.getTextureAsset(this.ingredientData!.id as IngredientID)
    }

    getID(): IngredientID | null {
        return this.ingredientData?.id ?? null
    }

    getTooltipText(): string {
        return this.ingredientData?.text ?? "";
    }

    private matches(data: IngredientData) {
        return this.getTaste() === data.taste
            && this.getConsistency() === data.consistency
            && this.getColor() === data.color
    }

    private updateIngredientData() {
        this.ingredientData = INGREDIENTS.find(data => this.matches(data))
    }
}

export type IngredientTaste = "neutral" | "sweet" | "sour" | "savoury"

export type IngredientConsistence = "sticky" | "liquid" | "powdery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export type IngredientData = {
    text: string,
    taste: IngredientTaste,
    consistency: IngredientConsistence,
    color: IngredientColor,
    [key: string]: any
}

export function getNameForID(id: IngredientID) {
    return INGREDIENTS.find(i => i.id === id)!.text
}

export type IngredientID = typeof INGREDIENTS[number]["id"]

export const INGREDIENTS = [
    {id: "cream", text: "Cream", taste: "neutral", color: "white", consistency: "sticky"},
    {id: "milk", text: "Milk", taste: "neutral", color: "white", consistency: "liquid"},
    {id: "flour", text: "Flour", taste: "neutral", color: "white", consistency: "powdery"},
    {id: "cabbage", text: "White Cabbage", taste: "neutral", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "neutral", color: "yellow", consistency: "sticky"},
    {id: "melted_butter", text: "Melted Butter", taste: "neutral", color: "yellow", consistency: "liquid"},
    {id: "cornflour", text: "Cornflour", taste: "neutral", color: "yellow", consistency: "powdery"},
    {id: "cornflakes", text: "Cornflakes", taste: "neutral", color: "yellow", consistency: "solid"},
    {id: "beet_pudding", text: "Beet Pudding", taste: "neutral", color: "red", consistency: "sticky"},
    {id: "beet_juice", text: "Beet Juice", taste: "neutral", color: "red", consistency: "liquid"},
    {id: "beet_flour", text: "Beet Flour", taste: "neutral", color: "red", consistency: "powdery"},
    {id: "beet", text: "Red Beet", taste: "neutral", color: "red", consistency: "solid"},
    {id: "mud", text: "Mud", taste: "neutral", color: "brown", consistency: "sticky"},
    {id: "swamp_water", text: "Swamp Water", taste: "neutral", color: "brown", consistency: "liquid"},
    {id: "dry_dirt", text: "Dry Dirt", taste: "neutral", color: "brown", consistency: "powdery"},
    {id: "dirt", text: "Dirt", taste: "neutral", color: "brown", consistency: "solid"},
    {id: "sweetened_cream", text: "Sweetened Cream", taste: "sweet", color: "white", consistency: "sticky"},
    {id: "sweetened_milk", text: "Sweetened Milk", taste: "sweet", color: "white", consistency: "liquid"},
    {id: "sugar", text: "Sugar", taste: "sweet", color: "white", consistency: "powdery"},
    {id: "marzipan", text: "Marzipan", taste: "sweet", color: "white", consistency: "solid"},
    {id: "honey", text: "Honey", taste: "sweet", color: "yellow", consistency: "sticky"},
    {id: "vanilla_milk", text: "Vanilla Milk", taste: "sweet", color: "yellow", consistency: "liquid"},
    {id: "vanilla_sugar", text: "Vanilla Sugar", taste: "sweet", color: "yellow", consistency: "powdery"},
    {id: "honey_comb", text: "Honey Comb", taste: "sweet", color: "yellow", consistency: "solid"},
    {id: "cherry_jam", text: "Cherry Jam", taste: "sweet", color: "red", consistency: "sticky"},
    {id: "cherry_sauce", text: "Cherry Sauce", taste: "sweet", color: "red", consistency: "liquid"},
    {id: "cherry_sugar", text: "Cherry Sugar", taste: "sweet", color: "red", consistency: "powdery"},
    {id: "cherries", text: "Cherries", taste: "sweet", color: "red", consistency: "solid"},
    {id: "chocolate_pudding", text: "Chocolate Pudding", taste: "sweet", color: "brown", consistency: "sticky"},
    {id: "melted_chocolate", text: "Melted Chocolate", taste: "sweet", color: "brown", consistency: "liquid"},
    {id: "brown_sugar", text: "Brown Sugar", taste: "sweet", color: "brown", consistency: "powdery"},
    {id: "raisins", text: "Raisins", taste: "sweet", color: "brown", consistency: "solid"},
    {id: "lemon_cream", text: "Lemon Cream", taste: "sour", color: "white", consistency: "sticky"},
    {id: "expired_milk", text: "Expired Milk", taste: "sour", color: "white", consistency: "liquid"},
    {id: "lemon_concentrate", text: "Lemon Concentrate", taste: "sour", color: "white", consistency: "powdery"},
    {id: "old_lemon_candy", text: "Old Lemon Candy", taste: "sour", color: "white", consistency: "solid"},
    {id: "lemon_pudding", text: "Lemon Pudding", taste: "sour", color: "yellow", consistency: "sticky"},
    {id: "lemon_juice", text: "Lemon Juice", taste: "sour", color: "yellow", consistency: "liquid"},
    {id: "lemon_sugar", text: "Lemon Sugar", taste: "sour", color: "yellow", consistency: "powdery"},
    {id: "candied_lemon_peel", text: "Candied Lemon Peel", taste: "sour", color: "yellow", consistency: "solid"},
    {id: "currant_pudding", text: "Currant Pudding", taste: "sour", color: "red", consistency: "sticky"},
    {id: "currant_juice", text: "Currant Juice", taste: "sour", color: "red", consistency: "liquid"},
    {id: "currant_sugar", text: "Currant Sugar", taste: "sour", color: "red", consistency: "powdery"},
    {id: "currants", text: "Currants", taste: "sour", color: "red", consistency: "solid"},
    {id: "rotten_fruits", text: "Rotten Fruits", taste: "sour", color: "brown", consistency: "sticky"},
    {id: "rotten_fruit_juice", text: "Rotten Fruit Juice", taste: "sour", color: "brown", consistency: "liquid"},
    {id: "grinded_umeboshi", text: "Grinded Umeboshi", taste: "sour", color: "brown", consistency: "powdery"},
    {id: "umeboshi", text: "Umeboshi", taste: "sour", color: "brown", consistency: "solid"},
    {id: "nut_cream", text: "Nut Cream", taste: "savoury", color: "white", consistency: "sticky"},
    {id: "nut_aroma", text: "Nut Aroma", taste: "savoury", color: "white", consistency: "liquid"},
    {id: "grinded_nuts", text: "Grinded Nuts", taste: "savoury", color: "white", consistency: "powdery"},
    {id: "peeled_nuts", text: "Peeled Nuts", taste: "savoury", color: "white", consistency: "solid"},
    {id: "egg_yolk", text: "Egg Yolk", taste: "savoury", color: "yellow", consistency: "sticky"},
    {id: "egg", text: "Egg", taste: "savoury", color: "yellow", consistency: "liquid"},
    {id: "egg_powder", text: "Egg Powder", taste: "savoury", color: "yellow", consistency: "powdery"},
    {id: "scrambled_egg", text: "Scrambled Egg", taste: "savoury", color: "yellow", consistency: "solid"},
    {id: "wine_cream", text: "Wine Cream", taste: "savoury", color: "red", consistency: "sticky"},
    {id: "wine", text: "Wine", taste: "savoury", color: "red", consistency: "liquid"},
    {id: "spices", text: "Spices", taste: "savoury", color: "red", consistency: "powdery"},
    {id: "steak", text: "Steak", taste: "savoury", color: "red", consistency: "solid"},
    {id: "nut_butter", text: "Nut Butter", taste: "savoury", color: "brown", consistency: "sticky"},
    {id: "rum_aroma", text: "Rum Aroma", taste: "savoury", color: "brown", consistency: "liquid"},
    {id: "cocoa", text: "Cocoa", taste: "savoury", color: "brown", consistency: "powdery"},
    {id: "nuts", text: "Nuts", taste: "savoury", color: "brown", consistency: "solid"}
] as const