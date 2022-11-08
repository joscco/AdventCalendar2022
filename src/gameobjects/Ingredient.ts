// Klasse als Darstellung eines Zutaten-Zustands (Geschmack, Konsistenz, Farbe, Position)
import {Container, Sprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {ASSET_STORE} from "../index";
import {Emitter} from "@pixi/particle-emitter";

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
        this.sprite.position.set(0, 40)
        this.addChild(this.sprite)

        // Must be called after sprite was set
        this.set(this.id)
        this.particleEmitter = this.createParticleEmitter()

        gsap.to(this.sprite.scale, {x: 1.1, y: 0.9, duration: 0.5, yoyo: true, repeat: -1, ease: Back.easeInOut})
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
        this.consistency = element.consistency
        this.color = element.color
        this.update()
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
        return ASSET_STORE.getTextureAsset(this.id)
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
                && element.consistency === consistency
        })!
}

export type IngredientData = {
    text: string,
    taste: IngredientTaste,
    consistency: IngredientConsistence,
    color: IngredientColor
}

export type IngredientTaste = "neutral" | "sweet" | "sour" | "savoury"

export type IngredientConsistence = "sticky" | "liquid" | "powdery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export type IngredientID = keyof typeof INGREDIENTS

export const INGREDIENTS = {
    "cream": {text: "Cream", taste: "neutral", color: "white", consistency: "sticky"},
    "milk": {text: "Milk", taste: "neutral", color: "white", consistency: "liquid"},
    "flour": {text: "Flour", taste: "neutral", color: "white", consistency: "powdery"},
    "cabbage": {text: "White Cabbage", taste: "neutral", color: "white", consistency: "solid"},
    "butter": {text: "Butter", taste: "neutral", color: "yellow", consistency: "sticky"},
    "melted_butter": {text: "Melted Butter", taste: "neutral", color: "yellow", consistency: "liquid"},
    "cornflour": {text: "Cornflour", taste: "neutral", color: "yellow", consistency: "powdery"},
    "cornflakes": {text: "Cornflakes", taste: "neutral", color: "yellow", consistency: "solid"},
    "beet_pudding": {text: "Beet Pudding", taste: "neutral", color: "red", consistency: "sticky"},
    "beet_juice": {text: "Beet Juice", taste: "neutral", color: "red", consistency: "liquid"},
    "beet_flour": {text: "Beet Flour", taste: "neutral", color: "red", consistency: "powdery"},
    "beet": {text: "Red Beet", taste: "neutral", color: "red", consistency: "solid"},
    "mud": {text: "Mud", taste: "neutral", color: "brown", consistency: "sticky"},
    "swamp_water": {text: "Swamp Water", taste: "neutral", color: "brown", consistency: "liquid"},
    "dry_dirt": {text: "Dry Dirt", taste: "neutral", color: "brown", consistency: "powdery"},
    "dirt": {text: "Dirt", taste: "neutral", color: "brown", consistency: "solid"},
    "sweetened_cream": {text: "Sweetened Cream", taste: "sweet", color: "white", consistency: "sticky"},
    "sweetened_milk": {text: "Sweetened Milk", taste: "sweet", color: "white", consistency: "liquid"},
    "sugar": {text: "Sugar", taste: "sweet", color: "white", consistency: "powdery"},
    "marzipan": {text: "Marzipan", taste: "sweet", color: "white", consistency: "solid"},
    "honey": {text: "Honey", taste: "sweet", color: "yellow", consistency: "sticky"},
    "vanilla_milk": {text: "Vanilla Milk", taste: "sweet", color: "yellow", consistency: "liquid"},
    "vanilla_sugar": {text: "Vanilla Sugar", taste: "sweet", color: "yellow", consistency: "powdery"},
    "honey_comb": {text: "Honey Comb", taste: "sweet", color: "yellow", consistency: "solid"},
    "cherry_jam": {text: "Cherry Jam", taste: "sweet", color: "red", consistency: "sticky"},
    "cherry_sauce": {text: "Cherry Sauce", taste: "sweet", color: "red", consistency: "liquid"},
    "cherry_sugar": {text: "Cherry Sugar", taste: "sweet", color: "red", consistency: "powdery"},
    "cherries": {text: "Cherries", taste: "sweet", color: "red", consistency: "solid"},
    "chocolate_pudding": {text: "Chocolate Pudding", taste: "sweet", color: "brown", consistency: "sticky"},
    "melted_chocolate": {text: "Melted Chocolate", taste: "sweet", color: "brown", consistency: "liquid"},
    "brown_sugar": {text: "Brown Sugar", taste: "sweet", color: "brown", consistency: "powdery"},
    "raisins": {text: "Raisins", taste: "sweet", color: "brown", consistency: "solid"},
    "lemon_cream": {text: "Lemon Cream", taste: "sour", color: "white", consistency: "sticky"},
    "expired_milk": {text: "Expired Milk", taste: "sour", color: "white", consistency: "liquid"},
    "lemon_concentrate": {text: "Lemon Concentrate", taste: "sour", color: "white", consistency: "powdery"},
    "old_lemon_candy": {text: "Old Lemon Candy", taste: "sour", color: "white", consistency: "solid"},
    "lemon_pudding": {text: "Lemon Pudding", taste: "sour", color: "yellow", consistency: "sticky"},
    "lemon_juice": {text: "Lemon Juice", taste: "sour", color: "yellow", consistency: "liquid"},
    "lemon_sugar": {text: "Lemon Sugar", taste: "sour", color: "yellow", consistency: "powdery"},
    "candied_lemon_peel": {text: "Candied Lemon Peel", taste: "sour", color: "yellow", consistency: "solid"},
    "currant_pudding": {text: "Currant Pudding", taste: "sour", color: "red", consistency: "sticky"},
    "currant_juice": {text: "Currant Juice", taste: "sour", color: "red", consistency: "liquid"},
    "currant_sugar": {text: "Currant Sugar", taste: "sour", color: "red", consistency: "powdery"},
    "currants": {text: "Currants", taste: "sour", color: "red", consistency: "solid"},
    "rotten_fruits": {text: "Rotten Fruits", taste: "sour", color: "brown", consistency: "sticky"},
    "rotten_fruit_juice": {text: "Rotten Fruit Juice", taste: "sour", color: "brown", consistency: "liquid"},
    "grinded_umeboshi": {text: "Grinded Umeboshi", taste: "sour", color: "brown", consistency: "powdery"},
    "umeboshi": {text: "Umeboshi", taste: "sour", color: "brown", consistency: "solid"},
    "nut_cream": {text: "Nut Cream", taste: "savoury", color: "white", consistency: "sticky"},
    "nut_aroma": {text: "Nut Aroma", taste: "savoury", color: "white", consistency: "liquid"},
    "grinded_nuts": {text: "Grinded Nuts", taste: "savoury", color: "white", consistency: "powdery"},
    "peeled_nuts": {text: "Peeled Nuts", taste: "savoury", color: "white", consistency: "solid"},
    "egg_yolk": {text: "Egg Yolk", taste: "savoury", color: "yellow", consistency: "sticky"},
    "egg": {text: "Egg", taste: "savoury", color: "yellow", consistency: "liquid"},
    "egg_powder": {text: "Egg Powder", taste: "savoury", color: "yellow", consistency: "powdery"},
    "scrambled_egg": {text: "Scrambled Egg", taste: "savoury", color: "yellow", consistency: "solid"},
    "wine_cream": {text: "Wine Cream", taste: "savoury", color: "red", consistency: "sticky"},
    "wine": {text: "Wine", taste: "savoury", color: "red", consistency: "liquid"},
    "spices": {text: "Spices", taste: "savoury", color: "red", consistency: "powdery"},
    "steak": {text: "Steak", taste: "savoury", color: "red", consistency: "solid"},
    "nut_butter": {text: "Nut Butter", taste: "savoury", color: "brown", consistency: "sticky"},
    "rum_aroma": {text: "Rum Aroma", taste: "savoury", color: "brown", consistency: "liquid"},
    "cocoa": {text: "Cocoa", taste: "savoury", color: "brown", consistency: "powdery"},
    "nuts": {text: "Nuts", taste: "savoury", color: "brown", consistency: "solid"}
} as const