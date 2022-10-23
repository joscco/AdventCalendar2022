import {IngredientID} from "./Ingredient";

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