import {Ingredient} from "./Ingredient";

describe('Ingredient Tests', () => {
        test('Ingredient is set up as cream per default', () => {
            let ingredient = new Ingredient()
            expect(ingredient.getTaste()).toBe("neutral")
            expect(ingredient.getConsistency()).toBe("sticky")
            expect(ingredient.getColor()).toBe("white")
            expect(ingredient.getID()).toBe("cream")
        });

        test('Updating taste updates ingredient data', () => {
            let ingredient = new Ingredient()
            ingredient.setTaste("sweet")
            expect(ingredient.getTaste()).toBe("sweet")
            expect(ingredient.getID()).toBe("sweetened_cream")
        })

        test('Updating consistency updates ingredient data', () => {
            let ingredient = new Ingredient()
            ingredient.setConsistency("liquid")
            expect(ingredient.getConsistency()).toBe("liquid")
            expect(ingredient.getID()).toBe("milk")
        })

        test('Updating color updates ingredient data', () => {
            let ingredient = new Ingredient()
            ingredient.setColor("yellow")
            expect(ingredient.getColor()).toBe("yellow")
            expect(ingredient.getID()).toBe("butter")
        })

        test('Tooltip text is updated', () => {
            let ingredient = new Ingredient()
            expect(ingredient.getTooltipText()).toBe("Cream")
            ingredient.setColor("yellow")
            expect(ingredient.getTooltipText()).toBe("Butter")
        })
    }

    // Test Tooltip
)