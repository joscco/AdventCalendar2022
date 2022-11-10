import {INGREDIENT_COOKBOOK, LEVEL_SCREEN} from "../index";
import {IngredientID} from "../gameobjects/Ingredient";

export class GameData {
    private GAME_STATE_KEY: string = "berndsBakeryGame"

    private initialGameState: GAME_STATE = { unlockedLevel: 1, unlockedIngredients: ["cream"] }

    private currentState: GAME_STATE

    constructor() {
        this.currentState = this.loadGame()
    }

    saveUnlockedLevel(unlockedLevel: number): void {
        this.saveGame(unlockedLevel, this.currentState.unlockedIngredients)
        // Update everything
        LEVEL_SCREEN.updateLevelButtons()
    }

    // Todo: Hübscher Machen
    saveNewUnlockedIngredient(newIngredient: IngredientID) {
        if (this.currentState.unlockedIngredients.indexOf(newIngredient) === -1) {
            this.currentState.unlockedIngredients.push(newIngredient);
            this.saveGame(this.currentState.unlockedLevel, this.currentState.unlockedIngredients)
            INGREDIENT_COOKBOOK.updateEntries()
        }
    }

    private saveGame(unlockedLevel: number, unlockedIngredients: IngredientID[]): void {
        let gameState: GAME_STATE = {
            unlockedLevel: unlockedLevel,
            unlockedIngredients: unlockedIngredients
        }

        localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(gameState))
        this.currentState = gameState
    }

    getUnlockedLevels(): number {
        return this.currentState.unlockedLevel;
    }

    getUnlockedIngredients(): IngredientID[] {
        return this.currentState.unlockedIngredients;
    }

    private loadGame(): GAME_STATE {
        let lastGameStateRaw = localStorage.getItem(this.GAME_STATE_KEY)
        if (!lastGameStateRaw) {
            // No stored game state found, return to initial one
            return this.initialGameState
        }

        try {
            let parsedGameState = JSON.parse(lastGameStateRaw)
            if (parsedGameState && this.isGameState(parsedGameState)) {
                // Game State found and parsed
                return parsedGameState as GAME_STATE
            }
        } catch (err) {
        }

        // Game State was found but could not be parsed
        return this.initialGameState
    }

    private isGameState(state: any): state is GAME_STATE {
        return (state as GAME_STATE).unlockedLevel !== undefined && (state as GAME_STATE).unlockedIngredients !== undefined;
    }
}

export type GAME_STATE = {
    unlockedLevel: number,
    unlockedIngredients: IngredientID[]
}