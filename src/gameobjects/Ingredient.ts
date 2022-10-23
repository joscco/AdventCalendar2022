export class Ingredient {

    ingredientData?: IngredientData;

    taste: IngredientTaste
    consistency: IngredientConsistency
    color: IngredientColor

    constructor(taste: IngredientTaste = "tasteless",
                consistency: IngredientConsistency = "sticky",
                color: IngredientColor = "white") {
        this.taste = taste
        this.consistency = consistency
        this.color = color
        this.updateIngredientData()
    }

    getTaste(): IngredientTaste {
        return this.taste
    }

    getConsistency(): IngredientConsistency {
        return this.consistency
    }

    getColor(): IngredientColor {
        return this.color
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

export type IngredientTaste = "tasteless" | "sweet" | "sour" | "savoury"

export type IngredientConsistency = "sticky" | "liquid" | "powdery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export type IngredientData = {
    id: IngredientID,
    text: string,
    taste: IngredientTaste,
    consistency: IngredientConsistency,
    color: IngredientColor
}

export type IngredientID = "cream" | "milk" | "flour" | "cabbage"
    | "butter" | "melted_butter" | "cornflour" | "cornflakes"
    | "beet_pudding" | "beet_juice" | "beet_flour" | "beet"
    | "mud" | "swamp_water" | "dry_dirt" | "dirt"
    | "sweetened_cream" | "sweetened_milk" | "sugar" | "marzipan"
    | "honey" | "vanilla_milk" | "vanilla_sugar" | "honey_comb"
    | "jam" | "cherry_sauce" | "cherry_sugar" | "cherries"
    | "chocolate_pudding" | "melted_chocolate" | "brown_sugar" | "raisins"
    | "lemon_cream" | "expired_milk" | "lemon_concentrate" | "old_lemon_candy"
    | "lemon_pudding" | "lemon_juice" | "lemon_sugar" | "candied_lemon_peel"
    | "currant_pudding" | "currant_juice" | "currant_sugar" | "currants"
    | "rotten_fruits" | "rotten_fruit_juice" | "grinded_umeboshi" | "umeboshi"
    | "nut_cream" | "nut_aroma" | "grinded_nuts" | "peeled_nuts"
    | "egg_cream" | "egg" | "egg_powder" | "scrambled_egg"
    | "wine_cream" | "wine" | "spices" | "steak"
    | "nut_butter" | "rum" | "cocoa" | "nuts"

export const INGREDIENTS: IngredientData[] = [
    {id: "cream", text: "Cream", taste: "tasteless", color: "white", consistency: "sticky"},
    {id: "milk", text: "Milk", taste: "tasteless", color: "white", consistency: "liquid"},
    {id: "flour", text: "Flour", taste: "tasteless", color: "white", consistency: "powdery"},
    {id: "cabbage", text: "White Cabbage", taste: "tasteless", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "yellow", consistency: "sticky"},
    {id: "melted_butter", text: "Melted Butter", taste: "tasteless", color: "yellow", consistency: "liquid"},
    {id: "cornflour", text: "Cornflour", taste: "tasteless", color: "yellow", consistency: "powdery"},
    {id: "cornflakes", text: "Cornflakes", taste: "tasteless", color: "yellow", consistency: "solid"},
    {id: "beet_pudding", text: "Beet Pudding", taste: "tasteless", color: "red", consistency: "sticky"},
    {id: "beet_juice", text: "Beet Juice", taste: "tasteless", color: "red", consistency: "liquid"},
    {id: "beet_flour", text: "Butter", taste: "tasteless", color: "red", consistency: "powdery"},
    {id: "beet", text: "Butter", taste: "tasteless", color: "red", consistency: "solid"},
    {id: "mud", text: "Butter", taste: "tasteless", color: "brown", consistency: "sticky"},
    {id: "swamp_water", text: "Butter", taste: "tasteless", color: "brown", consistency: "liquid"},
    {id: "dry_dirt", text: "Butter", taste: "tasteless", color: "brown", consistency: "powdery"},
    {id: "dirt", text: "Butter", taste: "tasteless", color: "brown", consistency: "solid"},
    {id: "sweetened_cream", text: "Butter", taste: "sweet", color: "white", consistency: "sticky"},
    {id: "sweetened_milk", text: "Butter", taste: "sweet", color: "white", consistency: "liquid"},
    {id: "sugar", text: "Butter", taste: "sweet", color: "white", consistency: "powdery"},
    {id: "marzipan", text: "Butter", taste: "sweet", color: "white", consistency: "solid"},
    {id: "honey", text: "Butter", taste: "sweet", color: "yellow", consistency: "sticky"},
    {id: "vanilla_milk", text: "Butter", taste: "sweet", color: "yellow", consistency: "liquid"},
    {id: "vanilla_sugar", text: "Butter", taste: "sweet", color: "yellow", consistency: "powdery"},
    {id: "honey_comb", text: "Butter", taste: "sweet", color: "yellow", consistency: "solid"},
    {id: "jam", text: "Butter", taste: "sweet", color: "red", consistency: "sticky"},
    {id: "cherry_sauce", text: "Butter", taste: "sweet", color: "red", consistency: "liquid"},
    {id: "cherry_sugar", text: "Butter", taste: "sweet", color: "red", consistency: "powdery"},
    {id: "cherries", text: "Butter", taste: "sweet", color: "red", consistency: "solid"},
    {id: "chocolate_pudding", text: "Butter", taste: "sweet", color: "brown", consistency: "sticky"},
    {id: "melted_chocolate", text: "Butter", taste: "sweet", color: "brown", consistency: "liquid"},
    {id: "brown_sugar", text: "Butter", taste: "sweet", color: "brown", consistency: "powdery"},
    {id: "raisins", text: "Butter", taste: "sweet", color: "brown", consistency: "solid"},
    {id: "lemon_cream", text: "Butter", taste: "sour", color: "white", consistency: "sticky"},
    {id: "expired_milk", text: "Butter", taste: "sour", color: "white", consistency: "liquid"},
    {id: "lemon_concentrate", text: "Butter", taste: "sour", color: "white", consistency: "powdery"},
    {id: "old_lemon_candy", text: "Butter", taste: "sour", color: "white", consistency: "solid"},
    {id: "lemon_pudding", text: "Butter", taste: "sour", color: "yellow", consistency: "sticky"},
    {id: "lemon_juice", text: "Butter", taste: "sour", color: "yellow", consistency: "liquid"},
    {id: "lemon_sugar", text: "Butter", taste: "sour", color: "yellow", consistency: "powdery"},
    {id: "candied_lemon_peel", text: "Butter", taste: "sour", color: "yellow", consistency: "solid"},
    {id: "currant_pudding", text: "Butter", taste: "sour", color: "red", consistency: "sticky"},
    {id: "currant_juice", text: "Butter", taste: "sour", color: "red", consistency: "liquid"},
    {id: "currant_sugar", text: "Butter", taste: "sour", color: "red", consistency: "powdery"},
    {id: "currants", text: "Butter", taste: "sour", color: "red", consistency: "solid"},
    {id: "rotten_fruits", text: "Butter", taste: "sour", color: "brown", consistency: "sticky"},
    {id: "rotten_fruit_juice", text: "Butter", taste: "sour", color: "brown", consistency: "liquid"},
    {id: "grinded_umeboshi", text: "Butter", taste: "sour", color: "brown", consistency: "powdery"},
    {id: "umeboshi", text: "Butter", taste: "sour", color: "brown", consistency: "solid"},
    {id: "nut_cream", text: "Butter", taste: "savoury", color: "white", consistency: "sticky"},
    {id: "nut_aroma", text: "Butter", taste: "savoury", color: "white", consistency: "liquid"},
    {id: "grinded_nuts", text: "Butter", taste: "savoury", color: "white", consistency: "powdery"},
    {id: "peeled_nuts", text: "Butter", taste: "savoury", color: "white", consistency: "solid"},
    {id: "egg_cream", text: "Butter", taste: "savoury", color: "yellow", consistency: "sticky"},
    {id: "egg", text: "Butter", taste: "savoury", color: "yellow", consistency: "liquid"},
    {id: "egg_powder", text: "Butter", taste: "savoury", color: "yellow", consistency: "powdery"},
    {id: "scrambled_egg", text: "Butter", taste: "savoury", color: "yellow", consistency: "solid"},
    {id: "wine_cream", text: "Butter", taste: "savoury", color: "red", consistency: "sticky"},
    {id: "wine", text: "Butter", taste: "savoury", color: "red", consistency: "liquid"},
    {id: "spices", text: "Butter", taste: "savoury", color: "red", consistency: "powdery"},
    {id: "steak", text: "Butter", taste: "savoury", color: "red", consistency: "solid"},
    {id: "nut_butter", text: "Butter", taste: "savoury", color: "brown", consistency: "sticky"},
    {id: "rum", text: "Rum", taste: "savoury", color: "brown", consistency: "liquid"},
    {id: "cocoa", text: "Butter", taste: "savoury", color: "brown", consistency: "powdery"},
    {id: "nuts", text: "Butter", taste: "savoury", color: "brown", consistency: "solid"}
]

export const RECIPES: { [key: string]: IngredientID[] } = {
    SANTAMILK: ["milk", "honey"],
    SCHOKOCROSSIES: ["melted_chocolate", "peeled_nuts", "cornflakes"],
    MUERBETEIGKEKSE: ["flour", "butter", "egg", "sugar"],
    RUMKUGELN: ["butter", "sugar", "melted_chocolate", "rum"],
    PUNSCH: ["wine", "spices", "brown_sugar", "lemon_juice"],
    BETHMAENNCHEN: ["flour", "egg", "sugar", "marzipan", "nuts"],
    ZIMTSTERNE: ["egg", "sugar", "spices", "grinded_nuts", "nut_aroma"],
    PRINTEN: ["flour", "egg", "honey", "candied_lemon_peel", "spices"],
    ENGELSAUGEN: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice", "jam"],
    VANILLEKIPFERL: ["flour", "butter", "sugar", "vanilla_sugar", "grinded_nuts"],
    MAKRONEN: ["egg", "sugar", "vanilla_sugar", "grinded_nuts", "nut_aroma", "cherries"],
    FLORENTINER: ["butter", "sugar", "melted_chocolate", "honey", "peeled_nuts"],
    SPRITZGEBAECK: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice"],
    LEBKUCHEN: ["flour", "butter", "egg", "lemon_juice", "honey", "spices", "brown_sugar", "cocoa"],
    SPEKULATIUS: ["flour", "butter", "egg", "sugar", "spices", "grinded_nuts"],
    PFEFFERNUESSE: ["flour", "butter", "egg", "sugar", "honey", "spices", "peeled_nuts", "nut_aroma"],
    PANETTONE: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "candied_lemon_peel", "raisins", "cherries"],
    SCHWARZWEISSKEKSE: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "nut_aroma", "cocoa"],
    STOLLEN: ["flour", "butter", "vanilla_sugar", "sugar", "lemon_juice", "candied_lemon_peel", "nut_aroma", "peeled_nuts", "milk", "raisins"],
    SCHOKOLADENBROT: ["flour", "butter", "egg", "sugar", "melted_chocolate", "grinded_nuts"],
    NUSSECKEN: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "jam", "melted_chocolate", "grinded_nuts", "peeled_nuts"],
    CORNFLAKEWALNUSSKEKSE: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "melted_chocolate", "grinded_nuts", "cornflakes", "nut_aroma"],
    BAERENTATZEN: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "jam", "melted_chocolate", "grinded_nuts"],
    DOMINOSTEINE: ["flour", "egg", "sugar", "jam", "marzipan", "melted_chocolate", "spices", "cocoa", "nut_aroma"]
}