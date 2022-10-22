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

export type IngredientConsistency = "sticky" | "liquid" | "poudery" | "solid"

export type IngredientColor = "white" | "red" | "yellow" | "brown"

export type IngredientData = {
    id: string,
    text: string,
    taste: IngredientTaste,
    consistency: IngredientConsistency,
    color: IngredientColor
}

const INGREDIENTS: IngredientData[] = [
    {id: "white_goo", text: "White Goo", taste: "tasteless", color: "white", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "white", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "white", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "yellow", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "yellow", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "yellow", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "yellow", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "red", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "red", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "red", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "red", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "brown", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "brown", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "brown", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "tasteless", color: "brown", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "white", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sweet", color: "white", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "white", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sweet", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "yellow", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sweet", color: "yellow", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "yellow", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sweet", color: "yellow", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "red", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sweet", color: "red", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "red", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sweet", color: "red", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "brown", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sweet", color: "brown", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sweet", color: "brown", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sweet", color: "brown", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sour", color: "white", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sour", color: "white", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sour", color: "white", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sour", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sour", color: "yellow", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sour", color: "yellow", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sour", color: "yellow", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sour", color: "yellow", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sour", color: "red", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sour", color: "red", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sour", color: "red", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sour", color: "red", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "sour", color: "brown", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "sour", color: "brown", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "sour", color: "brown", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "sour", color: "brown", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "white", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "savoury", color: "white", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "white", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "savoury", color: "white", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "yellow", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "savoury", color: "yellow", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "yellow", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "savoury", color: "yellow", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "red", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "savoury", color: "red", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "red", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "savoury", color: "red", consistency: "solid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "brown", consistency: "sticky"},
    {id: "butter", text: "Butter", taste: "savoury", color: "brown", consistency: "liquid"},
    {id: "butter", text: "Butter", taste: "savoury", color: "brown", consistency: "poudery"},
    {id: "butter", text: "Butter", taste: "savoury", color: "brown", consistency: "solid"}
]