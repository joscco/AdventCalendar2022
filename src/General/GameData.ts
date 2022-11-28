import {INGREDIENT_ALARM, INGREDIENT_COOKBOOK, LEVEL_SCREEN} from "../index";
import {IngredientID} from "../GameObjects/GameScreen/Ingredient";
import {Language} from "./LanguageManager";

export type GameState = {
    unlockedLevel: number,
    unlockedIngredients: IngredientID[],
    preferredLanguage: Language
}

const INITIAL_GAMESTATE: GameState = {
    unlockedLevel: 1,
    unlockedIngredients: ["cream"],
    preferredLanguage: "en"
}

export class GameData {
    private GAME_STATE_KEY: string = "berndsBakeryGame"
    private currentState: GameState

    constructor() {
        this.currentState = this.loadGame()
    }

    private unite(newState: GameState, oldState: GameState): GameState {
        return {
            preferredLanguage: newState.preferredLanguage,
            unlockedLevel: Math.max(newState.unlockedLevel, oldState.unlockedLevel),
            unlockedIngredients: [...new Set([...newState.unlockedIngredients, ...oldState.unlockedIngredients])]
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

    savePreferredLanguage(newLanguage: Language) {
        this.currentState.preferredLanguage = newLanguage
        this.saveGame(this.currentState)
    }

    private saveGame(newState: GameState): void {
        let finalState = this.unite(newState, this.loadGame())
        localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(finalState))
        this.currentState = finalState
    }

    getUnlockedLevels(): number {
        return this.currentState.unlockedLevel;
    }

    getUnlockedIngredients(): IngredientID[] {
        return this.currentState.unlockedIngredients;
    }

    getPreferredLanguage() {
        return this.currentState.preferredLanguage;
    }

    private loadGame(): GameState {
        try {
            let lastGameStateRaw = localStorage.getItem(this.GAME_STATE_KEY)
            if (!lastGameStateRaw) {
                // No stored game state found, return to initial one
                return INITIAL_GAMESTATE
            }

            let parsedGameState = JSON.parse(lastGameStateRaw)
            if (parsedGameState && this.isGameState(parsedGameState)) {
                // Game State found and parsed
                return parsedGameState as GameState
            }
        } catch (err) {
            console.log("You must allow cookies in order for Bernd to remember your unlocked levels!")
        }

        // Game State was found but could not be parsed
        return INITIAL_GAMESTATE
    }

    private isGameState(state: any): state is GameState {
        return (state as GameState).unlockedLevel !== undefined
            && (state as GameState).unlockedIngredients !== undefined
            && (state as GameState).preferredLanguage !== undefined;
    }
}