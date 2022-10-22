import {Ingredient} from "./Ingredient";

describe('Ingredient Tests', () => {
        test('Setting up a grid with two dimensions work', () => {
            let ingredient = new Ingredient()
            expect(ingredient.getTaste()).toBe("tasteless")
            expect(ingredient.getConsistency()).toBe("sticky")
            expect(ingredient.getColor()).toBe("white")
        });
    }

    // Test Color update
    // Test Taste Update
    // Test Consistency Update
    // Test Tooltip
    // Test ID Setting
)