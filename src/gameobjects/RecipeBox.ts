import {IngredientID} from "./Ingredient";

// Klasse zur Überprüfung der Rezepte, kriegt ein Rezept zur Initialisierung
// Checked einen Array von Zutaten und gibt einen bool-Array bezüglich Richtigkeit zurück

export type Recipe = {
    name: string,
    ingredients: IngredientID[]
}

export class RecipeBox {

    recipe: Recipe;

    constructor(recipe: Recipe) {
        this.recipe = recipe
    }

    checkIngredients(ingredients: IngredientID[]): boolean[] {
        let recipeCopy = Object.assign([], this.recipe.ingredients);
        let result = []
        for (let ingredient of ingredients) {
            const index = recipeCopy.indexOf(ingredient);
            if (index !== -1) {
                recipeCopy.splice(index, 1);
                result.push(true)
            } else {
                result.push(false)
            }
        }
        return result
    }
}

export const RECIPES: { [key: string]: Recipe } = {
    SANTAMILK: {name: "Santa's Milk", ingredients: ["milk", "honey"]},
    SCHOKOCROSSIES: {name: "Chocolate Cornflake Cakes", ingredients: ["melted_chocolate", "peeled_nuts", "cornflakes"]},
    MUERBETEIGKEKSE: {name: "Butter Cookies", ingredients: ["flour", "butter", "egg", "sugar"]},
    RUMKUGELN: {name: "Rum Truffles", ingredients: ["butter", "sugar", "melted_chocolate", "rum"]},
    PUNSCH: {name: "Hot Punch", ingredients: ["wine", "spices", "brown_sugar", "lemon_juice"]},
    BETHMAENNCHEN: {name: "Bethmännchen", ingredients: ["flour", "egg", "sugar", "marzipan", "nuts"]},
    ZIMTSTERNE: {name: "Cinnamon Stars", ingredients: ["egg", "sugar", "spices", "grinded_nuts", "nut_aroma"]},
    PRINTEN: {name: "Printen", ingredients: ["flour", "egg", "honey", "candied_lemon_peel", "spices"]},
    ENGELSAUGEN: {
        name: "Angel Eyes",
        ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice", "jam"]
    },
    VANILLEKIPFERL: {
        name: "Vanilla Crescents",
        ingredients: ["flour", "butter", "sugar", "vanilla_sugar", "grinded_nuts"]
    },
    MAKRONEN: {
        name: "Macarons",
        ingredients: ["egg", "sugar", "vanilla_sugar", "grinded_nuts", "nut_aroma", "cherries"]
    },
    FLORENTINER: {name: "Florentines", ingredients: ["butter", "sugar", "melted_chocolate", "honey", "peeled_nuts"]},
    SPRITZGEBAECK: {
        name: "Spritz Biscuits",
        ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "lemon_juice"]
    },
    LEBKUCHEN: {
        name: "Gingerbread",
        ingredients: ["flour", "butter", "egg", "lemon_juice", "honey", "spices", "brown_sugar", "cocoa"]
    },
    SPEKULATIUS: {name: "Speculoos", ingredients: ["flour", "butter", "egg", "sugar", "spices", "grinded_nuts"]},
    PFEFFERNUESSE: {
        name: "Pfeffernüsse",
        ingredients: ["flour", "butter", "egg", "sugar", "honey", "spices", "peeled_nuts", "nut_aroma"]
    },
    PANETTONE: {
        name: "Panettone",
        ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "candied_lemon_peel", "raisins", "cherries"]
    },
    SCHWARZWEISSKEKSE: {
        name: "Chess Cookies",
        ingredients: ["flour", "butter", "egg", "vanilla_sugar", "sugar", "nut_aroma", "cocoa"]
    },
    STOLLEN: {
        name: "Stollen",
        ingredients: ["flour", "butter", "vanilla_sugar", "sugar", "lemon_juice", "candied_lemon_peel", "nut_aroma", "peeled_nuts", "milk", "raisins"]
    },
    SCHOKOLADENBROT: {
        name: "Chocolate Bread",
        ingredients: ["flour", "butter", "egg", "sugar", "melted_chocolate", "grinded_nuts"]
    },
    NUSSECKEN: {
        name: "Nut wedges",
        ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "jam", "melted_chocolate", "grinded_nuts", "peeled_nuts"]
    },
    CORNFLAKEWALNUSSKEKSE: {
        name: "Walnut Cookies",
        ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "melted_chocolate", "grinded_nuts", "cornflakes", "nut_aroma"]
    },
    BAERENTATZEN: {
        name: "Bear Paws",
        ingredients: ["flour", "butter", "egg", "sugar", "vanilla_sugar", "jam", "melted_chocolate", "grinded_nuts"]
    },
    DOMINOSTEINE: {
        name: "Dominosteine",
        ingredients: ["flour", "egg", "sugar", "jam", "marzipan", "melted_chocolate", "spices", "cocoa", "nut_aroma"]
    }
}