// Klasse als Darstellung eines Zutaten-Zustands (Geschmack, Konsistenz, Farbe, Position)
import {Container, Sprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {ASSET_STORE} from "../index";
import {Emitter} from "@pixi/particle-emitter";
import {TextureAssetID} from "../General/AssetStore";

export class Ingredient extends Container {

    private taste: IngredientTaste = "neutral"
    private consistency: IngredientConsistence = "sticky"
    private color: IngredientColor = "white"
    private text?: string
    private sprite: Sprite
    private particleEmitter: Emitter

    constructor(private id: IngredientID = "cream") {
        super()

        this.id = id

        this.sprite = new Sprite()
        this.sprite.anchor.set(0.5, 1)
        this.sprite.texture = this.getTexture()
        this.sprite.position.set(0, 55)
        this.addChild(this.sprite)

        // Must be called after sprite was set
        this.set(this.id)
        this.particleEmitter = this.createParticleEmitter()

        gsap.to(this.sprite.scale, {x: 1.05, y: 0.95, duration: 0.5, yoyo: true, repeat: -1, ease: Back.easeInOut})
    }

    setTaste(newTaste: IngredientTaste): void {
        this.taste = newTaste
        this.update()
    }

    setConsistence(newConsistency: IngredientConsistence): void {
        this.consistency = newConsistency
        this.update()
    }

    setColor(newColor: IngredientColor): void {
        this.color = newColor
        this.update()
    }

    set(id: IngredientID) {
        let element = INGREDIENTS[id]
        this.taste = element.taste
        this.consistency = element.consistence
        this.color = element.color
        this.update()
    }

    async scaleDown() {
        await gsap.to(this.scale, {x: 0, y: 0, duration: 0.3, ease: Quart.easeInOut})
    }

    async scaleUp() {
        await gsap.to(this.scale, {x: 1, y: 1, duration: 0.3, ease: Quart.easeInOut})
    }

    emitParticles() {
        this.particleEmitter.emitNow()
    }

    updateTexture(): void {
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
        return ASSET_STORE.getTextureAsset(("small_" + this.id) as TextureAssetID)
    }

    getID(): IngredientID {
        return this.id
    }

    getTooltipText(): string {
        return this.text ?? "";
    }

    private update() {
        this.updateTextAndID()
        this.updateTexture()
    }

    private updateTextAndID() {
        this.id = getIDForData(this.taste, this.color, this.consistency)
        this.text = INGREDIENTS[this.id].text
    }

    private createParticleEmitter() {
        return new Emitter(this, {
            lifetime: {
                "min": 0.7,
                "max": 1
            },
            frequency: 1,
            autoUpdate: true,
            emitterLifetime: 0.1,
            particlesPerWave: 15,
            pos: {
                "x": 0,
                "y": 0
            },
            behaviors: [
                {
                    type: "alphaStatic",
                    config: {
                        alpha: 1
                    }
                },
                {
                    type: 'moveSpeedStatic',
                    config: {
                        min: 50,
                        max: 100
                    }
                },
                {
                    type: "scale",
                    config: {
                        "scale": {
                            "list": [{"time": 0, "value": 0}, {"time": 0.8, "value": 1.0}, {"time": 1, "value": 0}]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 0,
                        "maxSpeed": 200,
                        "minStart": 0,
                        "maxStart": 360
                    }
                },
                {
                    type: "textureSingle",
                    "config": {
                        "texture": ASSET_STORE.getTextureAsset("particle")
                    }
                },
                {
                    "type": "spawnPoint",
                    "config": {}
                }
            ]
        });
    }
}

export function getNameForID(id: IngredientID) {
    return INGREDIENTS[id]!.text
}

export function getIDForData(taste: IngredientTaste, color: IngredientColor, consistency: IngredientConsistence): IngredientID {
    return (Object.keys(INGREDIENTS) as IngredientID[])
        .find(key => {
            let element: IngredientData = INGREDIENTS[key]
            return element.taste === taste
                && element.color === color
                && element.consistence === consistency
        })!
}

export type IngredientData = {
    text: string,
    taste: IngredientTaste,
    consistence: IngredientConsistence,
    color: IngredientColor
}

export type IngredientTaste = "neutral" | "sweet" | "sour" | "savoury"

export type IngredientConsistence = "sticky" | "liquid" | "powdery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export const IngredientIDs = [
    "cream", "milk", "flour", "cabbage",
    "butter", "melted_butter", "cornflour", "cornflakes",
    "beet_pudding", "beet_juice", "beet_flour", "beet",
    "mud", "swamp_water", "dry_dirt", "dirt",
    "sweetened_cream", "sweetened_milk", "sugar", "marzipan",
    "honey", "vanilla_milk", "vanilla_sugar", "honey_comb",
    "cherry_jam", "cherry_sauce", "cherry_sugar", "cherries",
    "chocolate_pudding", "melted_chocolate", "brown_sugar", "raisins",
    "lemon_cream", "expired_milk", "lemon_concentrate", "old_lemon_candy",
    "lemon_pudding", "lemon_juice", "lemon_sugar", "candied_lemon_peel",
    "currant_pudding", "currant_juice", "currant_sugar", "currants",
    "rotten_fruits", "rotten_fruit_juice", "grinded_umeboshi", "umeboshi",
    "nut_cream", "nut_aroma", "grinded_nuts", "peeled_nuts",
    "egg_yolk", "egg", "egg_powder", "scrambled_egg",
    "wine_cream", "wine", "spices", "steak",
    "nut_butter", "rum_aroma", "cocoa", "nuts"] as const

export type IngredientID = typeof IngredientIDs[number]

export const INGREDIENTS: {[id in IngredientID]: IngredientData} = {
    "cream": {text: "Cream", taste: "neutral", color: "white", consistence: "sticky"},
    "milk": {text: "Milk", taste: "neutral", color: "white", consistence: "liquid"},
    "flour": {text: "Flour", taste: "neutral", color: "white", consistence: "powdery"},
    "cabbage": {text: "White Cabbage", taste: "neutral", color: "white", consistence: "solid"},
    "butter": {text: "Butter", taste: "neutral", color: "yellow", consistence: "sticky"},
    "melted_butter": {text: "Melted Butter", taste: "neutral", color: "yellow", consistence: "liquid"},
    "cornflour": {text: "Cornflour", taste: "neutral", color: "yellow", consistence: "powdery"},
    "cornflakes": {text: "Cornflakes", taste: "neutral", color: "yellow", consistence: "solid"},
    "beet_pudding": {text: "Beet Pudding", taste: "neutral", color: "red", consistence: "sticky"},
    "beet_juice": {text: "Beet Juice", taste: "neutral", color: "red", consistence: "liquid"},
    "beet_flour": {text: "Beet Flour", taste: "neutral", color: "red", consistence: "powdery"},
    "beet": {text: "Red Beet", taste: "neutral", color: "red", consistence: "solid"},
    "mud": {text: "Mud", taste: "neutral", color: "brown", consistence: "sticky"},
    "swamp_water": {text: "Swamp Water", taste: "neutral", color: "brown", consistence: "liquid"},
    "dry_dirt": {text: "Dry Dirt", taste: "neutral", color: "brown", consistence: "powdery"},
    "dirt": {text: "Dirt", taste: "neutral", color: "brown", consistence: "solid"},
    "sweetened_cream": {text: "Sweetened Cream", taste: "sweet", color: "white", consistence: "sticky"},
    "sweetened_milk": {text: "Sweetened Milk", taste: "sweet", color: "white", consistence: "liquid"},
    "sugar": {text: "Sugar", taste: "sweet", color: "white", consistence: "powdery"},
    "marzipan": {text: "Marzipan", taste: "sweet", color: "white", consistence: "solid"},
    "honey": {text: "Honey", taste: "sweet", color: "yellow", consistence: "sticky"},
    "vanilla_milk": {text: "Vanilla Milk", taste: "sweet", color: "yellow", consistence: "liquid"},
    "vanilla_sugar": {text: "Vanilla Sugar", taste: "sweet", color: "yellow", consistence: "powdery"},
    "honey_comb": {text: "Honey Comb", taste: "sweet", color: "yellow", consistence: "solid"},
    "cherry_jam": {text: "Cherry Jam", taste: "sweet", color: "red", consistence: "sticky"},
    "cherry_sauce": {text: "Cherry Sauce", taste: "sweet", color: "red", consistence: "liquid"},
    "cherry_sugar": {text: "Cherry Sugar", taste: "sweet", color: "red", consistence: "powdery"},
    "cherries": {text: "Cherries", taste: "sweet", color: "red", consistence: "solid"},
    "chocolate_pudding": {text: "Chocolate Pudding", taste: "sweet", color: "brown", consistence: "sticky"},
    "melted_chocolate": {text: "Melted Chocolate", taste: "sweet", color: "brown", consistence: "liquid"},
    "brown_sugar": {text: "Brown Sugar", taste: "sweet", color: "brown", consistence: "powdery"},
    "raisins": {text: "Raisins", taste: "sweet", color: "brown", consistence: "solid"},
    "lemon_cream": {text: "Lemon Cream", taste: "sour", color: "white", consistence: "sticky"},
    "expired_milk": {text: "Expired Milk", taste: "sour", color: "white", consistence: "liquid"},
    "lemon_concentrate": {text: "Lemon Concentrate", taste: "sour", color: "white", consistence: "powdery"},
    "old_lemon_candy": {text: "Old Lemon Candy", taste: "sour", color: "white", consistence: "solid"},
    "lemon_pudding": {text: "Lemon Pudding", taste: "sour", color: "yellow", consistence: "sticky"},
    "lemon_juice": {text: "Lemon Juice", taste: "sour", color: "yellow", consistence: "liquid"},
    "lemon_sugar": {text: "Lemon Sugar", taste: "sour", color: "yellow", consistence: "powdery"},
    "candied_lemon_peel": {text: "Candied Lemon Peel", taste: "sour", color: "yellow", consistence: "solid"},
    "currant_pudding": {text: "Currant Pudding", taste: "sour", color: "red", consistence: "sticky"},
    "currant_juice": {text: "Currant Juice", taste: "sour", color: "red", consistence: "liquid"},
    "currant_sugar": {text: "Currant Sugar", taste: "sour", color: "red", consistence: "powdery"},
    "currants": {text: "Currants", taste: "sour", color: "red", consistence: "solid"},
    "rotten_fruits": {text: "Rotten Fruits", taste: "sour", color: "brown", consistence: "sticky"},
    "rotten_fruit_juice": {text: "Rotten Fruit Juice", taste: "sour", color: "brown", consistence: "liquid"},
    "grinded_umeboshi": {text: "Grinded Umeboshi", taste: "sour", color: "brown", consistence: "powdery"},
    "umeboshi": {text: "Umeboshi", taste: "sour", color: "brown", consistence: "solid"},
    "nut_cream": {text: "Nut Cream", taste: "savoury", color: "white", consistence: "sticky"},
    "nut_aroma": {text: "Nut Aroma", taste: "savoury", color: "white", consistence: "liquid"},
    "grinded_nuts": {text: "Grinded Nuts", taste: "savoury", color: "white", consistence: "powdery"},
    "peeled_nuts": {text: "Peeled Nuts", taste: "savoury", color: "white", consistence: "solid"},
    "egg_yolk": {text: "Egg Yolk", taste: "savoury", color: "yellow", consistence: "sticky"},
    "egg": {text: "Egg", taste: "savoury", color: "yellow", consistence: "liquid"},
    "egg_powder": {text: "Egg Powder", taste: "savoury", color: "yellow", consistence: "powdery"},
    "scrambled_egg": {text: "Scrambled Egg", taste: "savoury", color: "yellow", consistence: "solid"},
    "wine_cream": {text: "Wine Cream", taste: "savoury", color: "red", consistence: "sticky"},
    "wine": {text: "Wine", taste: "savoury", color: "red", consistence: "liquid"},
    "spices": {text: "Spices", taste: "savoury", color: "red", consistence: "powdery"},
    "steak": {text: "Steak", taste: "savoury", color: "red", consistence: "solid"},
    "nut_butter": {text: "Nut Butter", taste: "savoury", color: "brown", consistence: "sticky"},
    "rum_aroma": {text: "Rum Aroma", taste: "savoury", color: "brown", consistence: "liquid"},
    "cocoa": {text: "Cocoa", taste: "savoury", color: "brown", consistence: "powdery"},
    "nuts": {text: "Nuts", taste: "savoury", color: "brown", consistence: "solid"}
} as const