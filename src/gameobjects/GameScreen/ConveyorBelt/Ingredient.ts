import {Container, Sprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {ASSET_STORE, LANGUAGE_MANAGER} from "../../../index";
import {Emitter} from "@pixi/particle-emitter";
import {Language, LanguageDependantItem} from "../../../General/LanguageManager";

export class Ingredient extends Container implements LanguageDependantItem {

    private taste: IngredientTaste = "neutral"
    private consistency: IngredientConsistence = "sticky"
    private color: IngredientColor = "white"

    private text?: string
    private readonly sprite: Sprite
    private particleEmitter: Emitter
    private animateTween: gsap.core.Tween;

    constructor(private id: IngredientID = "cream") {
        super()

        this.id = id

        this.sprite = new Sprite()
        this.sprite.anchor.set(0.5, 1)
        this.sprite.texture = this.getTexture()
        this.sprite.position.set(0, 35)
        this.addChild(this.sprite)

        // Must be called after sprite was set
        this.set(this.id)
        this.particleEmitter = this.createParticleEmitter()

        this.animateTween = gsap.to(this.sprite.scale, {
            x: 1.05,
            y: 0.95,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            ease: Expo.easeInOut
        })

        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    setLanguage(newLanguage: Language): void {
        this.text = INGREDIENTS[this.id].text[newLanguage]
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
        this.text = INGREDIENTS[this.id].text[LANGUAGE_MANAGER.getCurrentLanguage()]
    }

    private createParticleEmitter() {
        return new Emitter(this, {
            lifetime: {
                "min": 0.5,
                "max": 0.8
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

    pauseAnimating() {
        this.animateTween.pause()
    }

    resumeAnimating() {
        this.animateTween.resume()
    }
}

export function getNameForID(id: IngredientID, language: Language) {
    return INGREDIENTS[id]!.text[language]
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
    text: { "en": string, "de": string },
    taste: IngredientTaste,
    consistence: IngredientConsistence,
    color: IngredientColor
}

export type IngredientTaste = "neutral" | "sweet" | "sour" | "savoury"

export type IngredientConsistence = "sticky" | "liquid" | "powdery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export const IngredientIDs = [
    "cream", "milk", "flour", "boiled_egg",
    "butter", "melted_butter", "cornflour", "cornflakes",
    "beet_pudding", "beet_juice", "beet_flour", "beet",
    "mud", "swamp_water", "dry_dirt", "dirt",
    "sweetened_cream", "sweetened_milk", "sugar", "marzipan",
    "honey", "vanilla_milk", "vanilla_sugar", "honey_comb",
    "cherry_jam", "cherry_sauce", "cherry_sugar", "cherries",
    "chocolate_pudding", "melted_chocolate", "brown_sugar", "raisins",
    "lemon_cream", "lemon_aroma", "lemon_powder", "old_lemon_candy",
    "lemon_pudding", "lemon_juice", "lemon_sugar", "candied_lemon_peel",
    "currant_pudding", "currant_juice", "currant_sugar", "currants",
    "rotten_fruits", "rotten_fruit_juice", "ground_umeboshi", "umeboshi",
    "nut_cream", "nut_aroma", "ground_nuts", "peeled_nuts",
    "egg", "eggnog", "egg_powder", "scrambled_egg",
    "wine_cream", "wine", "spices", "steak",
    "nut_butter", "rum_aroma", "cocoa", "nuts"] as const

export type IngredientID = typeof IngredientIDs[number]

export const INGREDIENTS: { [id in IngredientID]: IngredientData } = {
    "cream": {text: {en: "Cream", de: "Sahne"}, taste: "neutral", color: "white", consistence: "sticky"}, // -
    "milk": {text: {en: "Milk", de: "Milch"}, taste: "neutral", color: "white", consistence: "liquid"}, // +
    "flour": {text: {en: "Flour", de: "Mehl"}, taste: "neutral", color: "white", consistence: "powdery"}, // +
    "boiled_egg": {text: {en: "Boiled Egg", de: "Gekochtes Ei"}, taste: "neutral", color: "white", consistence: "solid"}, // -

    "butter": {text: {en: "Butter", de: "Butter"}, taste: "neutral", color: "yellow", consistence: "sticky"}, // +
    "melted_butter": {text: {en: "Melted Butter", de: "flüssige Butter"}, taste: "neutral", color: "yellow", consistence: "liquid"}, // -
    "cornflour": {text: {en: "Cornflour", de: "Maismehl"}, taste: "neutral", color: "yellow", consistence: "powdery"}, // -
    "cornflakes": {text: {en: "Cornflakes", de: "Cornflakes"}, taste: "neutral", color: "yellow", consistence: "solid"}, // +

    "beet_pudding": {text: {en: "Beet Pudding", de: "Rübenpudding"}, taste: "neutral", color: "red", consistence: "sticky"}, // -
    "beet_juice": {text: {en: "Beet Juice", de: "Rübensaft"}, taste: "neutral", color: "red", consistence: "liquid"}, // -
    "beet_flour": {text: {en: "Beet Flour", de: "Rübenmehl"}, taste: "neutral", color: "red", consistence: "powdery"}, // -
    "beet": {text: {en: "Red Beet", de: "Rübe"}, taste: "neutral", color: "red", consistence: "solid"}, // -

    "mud": {text: {en: "Mud", de: "Schlamm"}, taste: "neutral", color: "brown", consistence: "sticky"}, // -
    "swamp_water": {text: {en: "Swamp Water", de: "Moorwasser"}, taste: "neutral", color: "brown", consistence: "liquid"}, // -
    "dry_dirt": {text: {en: "Dry Dirt", de: "Staub"}, taste: "neutral", color: "brown", consistence: "powdery"}, // -
    "dirt": {text: {en: "Dirt", de: "Dreck"}, taste: "neutral", color: "brown", consistence: "solid"}, // -

    "sweetened_cream": {text: {en: "Sweetened Cream", de: "Süße Sahne"}, taste: "sweet", color: "white", consistence: "sticky"}, // -
    "sweetened_milk": {text: {en: "Sweetened Milk", de: "Süße Milch"}, taste: "sweet", color: "white", consistence: "liquid"}, // -
    "sugar": {text: {en: "Sugar", de: "Zucker"}, taste: "sweet", color: "white", consistence: "powdery"}, // +
    "marzipan": {text: {en: "Marzipan", de: "Marzipan"}, taste: "sweet", color: "white", consistence: "solid"}, // +

    "honey": {text: {en: "Honey", de: "Honig"}, taste: "sweet", color: "yellow", consistence: "sticky"}, // +
    "vanilla_milk": {text: {en: "Vanilla Milk", de: "Vanillemilch"}, taste: "sweet", color: "yellow", consistence: "liquid"}, // -
    "vanilla_sugar": {text: {en: "Vanilla Sugar", de: "Vanillezucker"}, taste: "sweet", color: "yellow", consistence: "powdery"}, // +
    "honey_comb": {text: {en: "Honey Comb", de: "Honigwabe"}, taste: "sweet", color: "yellow", consistence: "solid"}, // -

    "cherry_jam": {text: {en: "Cherry Jam", de: "Kirschmus"}, taste: "sweet", color: "red", consistence: "sticky"}, // +
    "cherry_sauce": {text: {en: "Cherry Sauce", de: "Kirschsoße"}, taste: "sweet", color: "red", consistence: "liquid"}, // -
    "cherry_sugar": {text: {en: "Cherry Sugar", de: "Kirschzucker"}, taste: "sweet", color: "red", consistence: "powdery"}, // -
    "cherries": {text: {en: "Cherries", de: "Kirschen"}, taste: "sweet", color: "red", consistence: "solid"}, // +

    "chocolate_pudding": {text: {en: "Chocolate Pudding", de: "Schokoladenpudding"}, taste: "sweet", color: "brown", consistence: "sticky"},
    "melted_chocolate": {text: {en: "Melted Chocolate", de: "Geschm. Schokolade"}, taste: "sweet", color: "brown", consistence: "liquid"},
    "brown_sugar": {text: {en: "Brown Sugar", de: "Brauner Zucker"}, taste: "sweet", color: "brown", consistence: "powdery"},
    "raisins": {text: {en: "Raisins", de: "Rosinen"}, taste: "sweet", color: "brown", consistence: "solid"},

    "lemon_cream": {text: {en: "Lemon Cream", de: "Zitronencreme"}, taste: "sour", color: "white", consistence: "sticky"},
    "lemon_aroma": {text: {en: "Lemon Aroma", de: "Zitronenaroma"}, taste: "sour", color: "white", consistence: "liquid"},
    "lemon_sugar": {text: {en: "Lemon Sugar", de: "Zitronenzucker"}, taste: "sour", color: "white", consistence: "powdery"},
    "old_lemon_candy": {text: {en: "Old Lemon Candy", de: "Zitronenbonbon"}, taste: "sour", color: "white", consistence: "solid"},

    "lemon_pudding": {text: {en: "Lemon Pudding", de: "Zitronenpudding"}, taste: "sour", color: "yellow", consistence: "sticky"},
    "lemon_juice": {text: {en: "Lemon Juice", de: "Zitronensaft"}, taste: "sour", color: "yellow", consistence: "liquid"},
    "lemon_powder": {text: {en: "Lemon Powder", de: "Zitronenpulver"}, taste: "sour", color: "yellow", consistence: "powdery"},
    "candied_lemon_peel": {text: {en: "Candied Lemon Peel", de: "Zitronat"}, taste: "sour", color: "yellow", consistence: "solid"},

    "currant_pudding": {text: {en: "Currant Pudding", de: "Zitronat"}, taste: "sour", color: "red", consistence: "sticky"},
    "currant_juice": {text: {en: "Currant Juice", de: "Johannisbeersaft"}, taste: "sour", color: "red", consistence: "liquid"},
    "currant_sugar": {text: {en: "Currant Sugar", de: "Johannisbeerzucker"}, taste: "sour", color: "red", consistence: "powdery"},
    "currants": {text: {en: "Currants", de: "Johannisbeeren"}, taste: "sour", color: "red", consistence: "solid"},

    "rotten_fruits": {text: {en: "Rotten Fruits", de: "Faule Früchte"}, taste: "sour", color: "brown", consistence: "sticky"},
    "rotten_fruit_juice": {text: {en: "Rotten Fruit Juice", de: "Fauler Fruchtsaft"}, taste: "sour", color: "brown", consistence: "liquid"},
    "ground_umeboshi": {text: {en: "Ground Umeboshi", de: "Gemahlene Sauerpflaume"}, taste: "sour", color: "brown", consistence: "powdery"},
    "umeboshi": {text: {en: "Umeboshi", de: "Sauerpflaume"}, taste: "sour", color: "brown", consistence: "solid"},

    "nut_cream": {text: {en: "Nut Cream", de: "Nusscreme"}, taste: "savoury", color: "white", consistence: "sticky"},
    "nut_aroma": {text: {en: "Nut Aroma", de: "Nussaroma"}, taste: "savoury", color: "white", consistence: "liquid"},
    "ground_nuts": {text: {en: "Ground Nuts", de: "Gemahlene Nüsse"}, taste: "savoury", color: "white", consistence: "powdery"},
    "peeled_nuts": {text: {en: "Peeled Nuts", de: "Geschälte Nüsse"}, taste: "savoury", color: "white", consistence: "solid"},

    "egg": {text: {en: "Egg", de: "Ei"}, taste: "savoury", color: "yellow", consistence: "sticky"},
    "eggnog": {text: {en: "Eggnog", de: "Eierlikör"}, taste: "savoury", color: "yellow", consistence: "liquid"},
    "egg_powder": {text: {en: "Egg Powder", de: "Eipulver"}, taste: "savoury", color: "yellow", consistence: "powdery"},
    "scrambled_egg": {text: {en: "Scrambled Egg", de: "Rührei"}, taste: "savoury", color: "yellow", consistence: "solid"},

    "wine_cream": {text: {en: "Wine Cream", de: "Weincreme"}, taste: "savoury", color: "red", consistence: "sticky"},
    "wine": {text: {en: "Wine", de: "Wein"}, taste: "savoury", color: "red", consistence: "liquid"},
    "spices": {text: {en: "Spices", de: "Gewürze"}, taste: "savoury", color: "red", consistence: "powdery"},
    "steak": {text: {en: "Steak", de: "Steak"}, taste: "savoury", color: "red", consistence: "solid"},

    "nut_butter": {text: {en: "Nut Butter", de: "Nussbutter"}, taste: "savoury", color: "brown", consistence: "sticky"},
    "rum_aroma": {text: {en: "Rum Aroma", de: "Rumaroma"}, taste: "savoury", color: "brown", consistence: "liquid"},
    "cocoa": {text: {en: "Cocoa", de: "Kakao"}, taste: "savoury", color: "brown", consistence: "powdery"},
    "nuts": {text: {en: "Nuts", de: "Nüsse"}, taste: "savoury", color: "brown", consistence: "solid"}
} as const