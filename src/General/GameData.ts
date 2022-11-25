import {INGREDIENT_ALARM, INGREDIENT_COOKBOOK, LEVEL_SCREEN} from "../index";
import {IngredientID} from "../gameobjects/GameScreen/ConveyorBelt/Ingredient";

export type GameState = {
    unlockedLevel: number,
    unlockedIngredients: IngredientID[]
}

const INITIAL_GAMESTATE: GameState = {unlockedLevel: 1, unlockedIngredients: ["cream"]}

export class GameData {
    private GAME_STATE_KEY: string = "berndsBakeryGame"
    private currentState: GameState

    constructor() {
        this.currentState = this.loadGame()
    }

    private unite(state1: GameState, state2: GameState): GameState {
        return {
            unlockedLevel: Math.max(state1.unlockedLevel, state2.unlockedLevel),
            unlockedIngredients: [...new Set([...state1.unlockedIngredients, ...state2.unlockedIngredients])]
        }
    }

    saveUnlockedLevel(unlockedLevel: number): void {
        this.currentState.unlockedLevel = unlockedLevel
        this.saveGame(this.currentState)

        // Update Game
        LEVEL_SCREEN.updateLevelButtons()
    }

    private addNewIngredient(newIngredient: IngredientID) {
        this.currentState.unlockedIngredients.push(newIngredient);
    }

    saveNewUnlockedIngredient(newIngredient: IngredientID) {
        if (this.currentState.unlockedIngredients.indexOf(newIngredient) === -1) {
            this.addNewIngredient(newIngredient)
            this.saveGame(this.currentState)

            // Update Game
            INGREDIENT_COOKBOOK.updateEntries(this.currentState.unlockedIngredients)
            INGREDIENT_ALARM.blendIn(newIngredient)
        }
    }

    private saveGame(gameState: GameState): void {
        let newState = this.unite(gameState, this.loadGame())
        localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(newState))
        this.currentState = newState
    }

    getUnlockedLevels(): number {
        return this.currentState.unlockedLevel;
    }

    getUnlockedIngredients(): IngredientID[] {
        return this.currentState.unlockedIngredients;
    }

    private loadGame(): GameState {
        let lastGameStateRaw = localStorage.getItem(this.GAME_STATE_KEY)
        if (!lastGameStateRaw) {
            // No stored game state found, return to initial one
            return INITIAL_GAMESTATE
        }

        try {
            let parsedGameState = JSON.parse(lastGameStateRaw)
            if (parsedGameState && this.isGameState(parsedGameState)) {
                // Game State found and parsed
                return parsedGameState as GameState
            }
        } catch (err) {
        }

        // Game State was found but could not be parsed
        return INITIAL_GAMESTATE
    }

    private isGameState(state: any): state is GameState {
        return (state as GameState).unlockedLevel !== undefined
            && (state as GameState).unlockedIngredients !== undefined;
    }
}