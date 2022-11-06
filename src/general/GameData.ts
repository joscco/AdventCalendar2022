import {LEVEL_SCREEN} from "../index";

export class GameData {
    private GAME_STATE_KEY: string = "berndsBakeryGame"

    private initialGameState: GAME_STATE = { unlockedLevel: 1 }

    private currentState: GAME_STATE

    constructor() {
        this.currentState = this.loadGame()
    }

    saveGame(unlockedLevel: number): void {
        let gameState: GAME_STATE = {
            unlockedLevel: unlockedLevel
        }
        localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(gameState))

        // Update everything
        LEVEL_SCREEN.updateLevelButtons()
    }

    getUnlockedLevels(): number {
        return this.currentState.unlockedLevel;
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
        return (state as GAME_STATE).unlockedLevel !== undefined;
    }
}

export type GAME_STATE = {
    unlockedLevel: number
}