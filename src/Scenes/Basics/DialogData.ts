import {DialogConfig} from "../../gameobjects/Dialog/Dialogs/DialogConfig";
import {sleep} from "../../General/Helpers";
import {DIALOG_MANAGER} from "../../index";

export const DIALOG_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Oh hello! A new face, how nice!"},
                {text: "I am Bernd, but you can also call me Bernie, B-Man, ..., whatever you like."},
                {text: "I own this cute little cookie factory here."}],
            successors: [],
            durationUntilAutoClose: 3000
        }
    ]
}
export const HINTS_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [{text: "God, I really love food so much"}],
            successors: [],
            skippable: true
        }
    ]
}

export const LAST_WORDS_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [{text: "Wow that was great!"}],
            successors: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}