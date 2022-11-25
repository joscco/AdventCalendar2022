import {FactoryScene} from "../FactoryScene";
import {RecipeID} from "../../gameobjects/GameScreen/RecipeBox";
import {App} from "../../index";
import {BlockDefinition, MachineDefinition} from "../../gameobjects/GameScreen/Machinery/Machine";
import {IngredientID} from "../../gameobjects/GameScreen/ConveyorBelt/Ingredient";
import SceneManager from "../../General/SceneManager";
import {Dialog} from "../../gameobjects/Dialog/Dialogs/DialogConfig";
import {CookieEyesConfig} from "../../gameobjects/GameScreen/WinScreen/Cookie";
import {
    CHANGE_TYPE_HINT,
    DIALOG_DAY_1,
    DIALOG_DAY_2,
    DIALOG_DAY_3,
    DIALOG_DAY_4,
    DIALOG_DAY_5,
    DIALOG_DAY_6,
    DIALOG_DAY_7,
    DOUBLE_MACHINES_HINT,
    HINT_DAY_1,
    HINT_DAY_2,
    MOVE_ORDER_LACK_OF_SPACE_HINT,
    IRON_CHAINS_HINT,
    LAST_WORDS_DAY_1,
    LAST_WORDS_DAY_2,
    LAST_WORDS_DAY_3,
    LAST_WORDS_DAY_4,
    LAST_WORDS_DAY_5,
    LAST_WORDS_DAY_6,
    LAST_WORDS_DAY_7,
    TWO_MACHINES_ON_ONE_BELT_HINT,
    LAST_WORDS_DAY_8,
    DIALOG_DAY_8,
    DIALOG_DAY_9,
    LAST_WORDS_DAY_9,
    DIALOG_DAY_10,
    LAST_WORDS_DAY_10,
    QUADRUPLE_MACHINES_HINT,
    DIALOG_DAY_11,
    LAST_WORDS_DAY_11,
    TRIPLE_MACHINES_HINT,
    DIALOG_DAY_12,
    LAST_WORDS_DAY_12,
    DIALOG_DAY_13,
    LAST_WORDS_DAY_13,
    LAST_WORDS_DAY_24,
    DIALOG_DAY_24,
    LAST_WORDS_DAY_23,
    DIALOG_DAY_23,
    LAST_WORDS_DAY_22,
    DIALOG_DAY_22,
    LAST_WORDS_DAY_21,
    DIALOG_DAY_21,
    LAST_WORDS_DAY_20,
    DIALOG_DAY_20,
    LAST_WORDS_DAY_19,
    DIALOG_DAY_19,
    DIALOG_DAY_18,
    LAST_WORDS_DAY_18,
    DIALOG_DAY_17,
    LAST_WORDS_DAY_17,
    DIALOG_DAY_16,
    LAST_WORDS_DAY_16,
    LAST_WORDS_DAY_15,
    DIALOG_DAY_15,
    DIALOG_DAY_14,
    LAST_WORDS_DAY_14,
    BE_FAST_HINT,
    NON_TIMING_FIRST_HINT
} from "./DialogData";

type LevelConfig = {
    level: number;
    recipe: RecipeID;
    conveyorBeltPattern: string;
    machineLayout: MachineDefinition[];
    blocks?: BlockDefinition[];
    startIngredients?: Map<string, IngredientID>;
    hasStepButton?: boolean,
    dialog?: Dialog,
    hints?: Dialog[],
    lastWords?: Dialog
}

type LevelConfigManifest = LevelConfig[]

export const LEVEL_MANIFEST: LevelConfigManifest = [
    {
        level: 1,
        conveyorBeltPattern:
            "A2|A1|A0\n" +
            "A3|  |B3\n" +
            "B0|B1|B2",
        recipe: "SANTAMILK",
        machineLayout: [{shape: "1x1", index: {row: 1, column: 1}, type: "liquid", typeFixed: true, id: "A"}],
        startIngredients: new Map([
            ["A", "honey"],
            ["B", "cream"]
        ]),
        dialog: new Dialog(DIALOG_DAY_1),
        hints: [new Dialog(HINT_DAY_1)],
        lastWords: new Dialog(LAST_WORDS_DAY_1)
    }, {
        level: 2,
        conveyorBeltPattern:
            "A2|A1|A0|B0\n" +
            "A3|  |  |B1\n" +
            "C3|  |  |B2\n" +
            "C2|C1|C0|B3",
        recipe: "SCHOKOCROSSIES",
        startIngredients: new Map([
            ["A", "brown_sugar"],
            ["B", "nuts"],
            ["C", "cornflour"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 2, column: 2}}
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 1, column: 1}, type: "liquid", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 2}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 1}, type: "solid", typeFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_2),
        hints: [new Dialog(HINT_DAY_2)],
        lastWords: new Dialog(LAST_WORDS_DAY_2)
    }, {
        level: 3,
        conveyorBeltPattern:
            "A0|B3|C0|D3\n" +
            "A1|B2|C1|D2\n" +
            "A2|B1|C2|D1\n" +
            "A3|B0|C3|D0",
        recipe: "MUERBETEIGKEKSE",
        startIngredients: new Map([
            ["A", "brown_sugar"],
            ["B", "dry_dirt"],
            ["C", "cream"],
            ["D", "nut_cream"]
        ]),
        machineLayout: [
            {shape: "1x2", index: {row: 1, column: 0}, type: "yellow", typeFixed: true},
            {shape: "1x2", index: {row: 2, column: 2}, type: "white", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_3),
        hints: [new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_3)
    }, {
        level: 4,
        recipe: "RUMKUGELN",
        conveyorBeltPattern:
            "A3|B0|B1|B2|B3\n" +
            "A2|  |  |  |C0\n" +
            "A1|  |  |  |C1\n" +
            "A0|  |  |  |C2\n" +
            "D3|D2|D1|D0|C3",
        startIngredients: new Map([
            ["A", "cream"],
            ["B", "flour"],
            ["C", "cocoa"],
            ["D", "rotten_fruit_juice"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 1, column: 1}},
            {shape: "1x1", index: {row: 3, column: 1}},
            {shape: "1x1", index: {row: 1, column: 3}},
            {shape: "1x1", index: {row: 3, column: 3}}
        ],
        machineLayout: [
            // Types should be fixed!
            {shape: "1x1", index: {row: 1, column: 2}, type: "sour"},
            {shape: "1x1", index: {row: 2, column: 1}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 2}, type: "savoury", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "sweet", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 2}, type: "liquid", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_4),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(TWO_MACHINES_ON_ONE_BELT_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_4)
    }, {
        level: 5,
        recipe: "BETHMAENNCHEN",
        conveyorBeltPattern:
            "A0|B3|B0|  |D0|D3\n" +
            "A1|B2|B1|  |D1|D2\n" +
            "A2|  |  |  |  |  \n" +
            "A3|C2|C1|  |E1|E2\n" +
            "A4|C3|C0|  |E0|E3",
        startIngredients: new Map([
            ["A", "brown_sugar"],
            ["B", "honey_comb"],
            ["C", "umeboshi"],
            ["D", "dry_dirt"],
            ["D", "egg_powder"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 3}},
            {shape: "1x1", index: {row: 2, column: 1}},
            {shape: "1x1", index: {row: 2, column: 5}},
            {shape: "1x1", index: {row: 4, column: 3}}
        ],
        machineLayout: [
            // Types should be fixed!
            {shape: "1x1", index: {row: 1, column: 3}, type: "savoury", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 2}, type: "sticky", typeFixed: true},
            {shape: "1x2", index: {row: 2, column: 3}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 3}, type: "sweet"}
        ],
        dialog: new Dialog(DIALOG_DAY_5),
        hints: [new Dialog(DOUBLE_MACHINES_HINT), new Dialog(CHANGE_TYPE_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_5)
    }, {
        level: 6,
        recipe: "PUNSCH",
        conveyorBeltPattern:
            "A6|A5|A4|A3|A2|A1|A0|  \n" +
            "B0|B1|  |  |  |  |D3|D4\n" +
            "  |B2|  |  |  |  |D2|  \n" +
            "B4|B3|  |  |  |  |D1|D0\n" +
            "C0|C1|C2|C3|C4|C5|C6|C7",
        startIngredients: new Map([
            ["A", "wine_cream"],
            ["B", "sugar"],
            ["C", "ground_nuts"],
            ["D", "lemon_aroma"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 7}},
            {shape: "1x1", index: {row: 1, column: 2}},
            {shape: "1x1", index: {row: 1, column: 4}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 2, column: 0}},
            {shape: "1x1", index: {row: 2, column: 2}},
            {shape: "1x1", index: {row: 2, column: 5}},
            {shape: "1x1", index: {row: 2, column: 7}},
            {shape: "1x1", index: {row: 3, column: 2}},
            {shape: "1x1", index: {row: 3, column: 3}},
            {shape: "1x1", index: {row: 3, column: 4}},
            {shape: "1x1", index: {row: 3, column: 5}},
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 1, column: 3}, type: "red", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 4}, type: "brown", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 3}, type: "liquid", typeFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_6),
        hints: [new Dialog(MOVE_ORDER_LACK_OF_SPACE_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_6)
    }, {
        level: 7,
        recipe: "ZIMTSTERNE",
        conveyorBeltPattern:
            "A0|A1|A2|A3\n" +
            "B0|B1|B2|B3\n" +
            "C0|C1|C2|C3\n" +
            "D0|D1|D2|D3\n" +
            "E0|E1|E2|E3",
        startIngredients: new Map([
            ["A", "steak"],
            ["B", "sweetened_cream"],
            ["C", "scrambled_egg"],
            ["D", "rum_aroma"],
            ["E", "nuts"]
        ]),
        machineLayout: [
            {shape: "1x1", index: {row: 4, column: 1}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 2}, type: "solid", positionFixed: true},
            {shape: "2x1", index: {row: 2, column: 1}, type: "red"},
            {shape: "2x1", index: {row: 0, column: 2}, type: "solid", positionFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_7),
        hints: [new Dialog(IRON_CHAINS_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_7)
    }, {
        level: 8,
        recipe: "PRINTEN",
        conveyorBeltPattern:
            "A10|A11|A0|  |D0|D11|D10\n" +
            "A9 |B0 |A1|C0|D1|E0 |D9\n" +
            "A8 |B1 |A2|C1|D2|E1 |D8\n" +
            "A7 |B2 |A3|C2|D3|E2 |D7\n" +
            "A6 |A5 |A4|  |D4|D5 |D6",
        startIngredients: new Map([
            ["A", "honey"],
            ["B", "cream"],
            ["C", "egg_powder"],
            ["D", "sugar"],
            ["E", "currant_sugar"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 3}},
            {shape: "1x1", index: {row: 4, column: 3}}
        ],
        machineLayout: [
            {shape: "1x2", index: {row: 2, column: 0}, type: "liquid"},
            {shape: "1x1", index: {row: 2, column: 2}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "sweet"},
            {shape: "1x1", index: {row: 2, column: 4}, type: "liquid"},
            {shape: "1x1", index: {row: 2, column: 5}, type: "liquid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 6}, type: "sour", typeFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_8),
        hints: [new Dialog(IRON_CHAINS_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_8)
    }, {
        level: 9,
        recipe: "VANILLEKIPFERL",
        conveyorBeltPattern:
            "A3|A2|A1|A0|D3|D2|D1\n" +
            "A4|E0|E1|  |D4|  |D0\n" +
            "A5|E5|E2|  |D5|  |C5\n" +
            "B0|E4|E3|  |  |  |C4\n" +
            "B1|B2|B3|C0|C1|C2|C3",
        startIngredients: new Map([
            ["A", "mud"],
            ["B", "milk"],
            ["C", "cherry_sugar"],
            ["D", "peeled_nuts"],
            ["E", "cherries"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 2, column: 3}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 2, column: 5}},
            {shape: "1x1", index: {row: 3, column: 5}},
        ],
        machineLayout: [
            // Types should be fixed!
            {shape: "2x1", index: {row: 0, column: 2}, type: "brown", positionFixed: true},
            {shape: "1x1", index: {row: 1, column: 3}, type: "liquid"},
            {shape: "1x1", index: {row: 3, column: 3}, type: "brown"},
            {shape: "1x1", index: {row: 3, column: 4}, type: "liquid"},
            {shape: "1x1", index: {row: 3, column: 6}, type: "powdery", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_9),
        hints: [new Dialog(IRON_CHAINS_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_9)
    }, {
        level: 10,
        recipe: "FLORENTINER",
        conveyorBeltPattern:
            "A4|A3|A2|D2|D3|D4\n" +
            "  |A0|A1|D1|D0|  \n" +
            "  |B0|B1|E1|E0|  \n" +
            "B4|B3|B2|E2|E3|E4\n" +
            "  |C0|C1|C2|C3|  ",
        startIngredients: new Map([
            ["A", "melted_butter"],
            ["B", "currant_sugar"],
            ["C", "egg"],
            ["D", "nuts"],
            ["E", "currant_juice"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 1, column: 0}},
            {shape: "1x1", index: {row: 2, column: 0}},
            {shape: "1x1", index: {row: 4, column: 0}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 2, column: 5}},
            {shape: "1x1", index: {row: 4, column: 5}},
        ],
        machineLayout: [
            // Types should be fixed!
            {shape: "2x2", index: {row: 0, column: 2}, type: "savoury"},
            {shape: "1x1", index: {row: 0, column: 1}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 4}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 1}, type: "red", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 4}, type: "red", positionFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_10),
        hints: [new Dialog(IRON_CHAINS_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(QUADRUPLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_10)
    }, {
        level: 11,
        recipe: "MAKRONEN",
        conveyorBeltPattern:
            "A0|B4|C0|  |  |D0|E4|F0\n" +
            "A1|B3|C1|  |  |D1|E3|F1\n" +
            "A2|B2|C2|  |  |D2|E2|F2\n" +
            "A3|B1|C3|  |  |D3|E1|F3\n" +
            "A4|B0|C4|  |  |D4|E0|F4",
        startIngredients: new Map([
            ["A", "raisins"],
            ["B", "mud"],
            ["C", "lemon_pudding"],
            ["D", "ground_nuts"],
            ["E", "beet_pudding"],
            ["F", "lemon_powder"]
        ]),
        machineLayout: [
            // Types should be fixed!
            {shape: "1x2", index: {row: 0, column: 3}, type: "powdery", typeFixed: true},
            {shape: "1x2", index: {row: 1, column: 3}, type: "sour"},
            {shape: "1x2", index: {row: 2, column: 3}, type: "sweet", typeFixed: true},
            {shape: "1x2", index: {row: 3, column: 3}, type: "sticky"},
            {shape: "1x2", index: {row: 4, column: 3}, type: "white", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_11),
        hints: [new Dialog(IRON_CHAINS_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_11)
    }, {
        level: 12,
        recipe: "SPRITZGEBAECK",
        conveyorBeltPattern:
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "A0|B0|B1|B2|  |F2|F1|F0|E0\n" +
            "A1|A2|A3|B3|  |F3|E3|E2|E1\n" +
            "C0|C1|A4|B4|  |F4|E4|D1|D0\n" +
            "C3|C2|A5|B5|  |F5|E5|D2|D3",
        startIngredients: new Map([
            ["A", "raisins"],
            ["B", "vanilla_milk"],
            ["C", "milk"],
            ["D", "lemon_aroma"],
            ["E", "nut_aroma"],
            ["F", "nut_butter"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 4, column: 4}},
            {shape: "1x1", index: {row: 5, column: 4}},
            {shape: "1x1", index: {row: 0, column: 0}},
            {shape: "1x1", index: {row: 1, column: 0}},
            {shape: "1x1", index: {row: 1, column: 1}},
            {shape: "1x1", index: {row: 1, column: 2}},
            {shape: "1x1", index: {row: 0, column: 7}},
            {shape: "1x1", index: {row: 0, column: 8}},
            {shape: "1x1", index: {row: 1, column: 6}},
            {shape: "1x1", index: {row: 1, column: 7}},
            {shape: "1x1", index: {row: 1, column: 8}},
        ],
        machineLayout: [
            {shape: "1x3", index: {row: 0, column: 1}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 4}, type: "powdery", typeFixed: true},
            {shape: "1x2", index: {row: 0, column: 5}, type: "solid"},
            {shape: "1x1", index: {row: 1, column: 3}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 4}, type: "sour"},
            {shape: "1x1", index: {row: 1, column: 5}, type: "white", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_12),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(TRIPLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_12)
    }, {
        level: 13,
        recipe: "SPEKULATIUS",
        conveyorBeltPattern:
            "A1|A0|C5|C4|C3|C2|C1|  |  \n" +
            "A2|D7|D6|D5|D4|D3|C0|  |  \n" +
            "A3|D8|E0|F3|F2|D2|B9|  |  \n" +
            "A4|D9|E1|F0|F1|D1|B8|  |  \n" +
            "A5|B0|E2|E3|E4|D0|B7|  |  \n" +
            "A6|B1|B2|B3|B4|B5|B6|  |  ",
        startIngredients: new Map([
            ["A", "flour"],
            ["B", "lemon_powder"],
            ["C", "eggnog"],
            ["D", "cocoa"],
            ["E", "cream"],
            ["F", "currant_sugar"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 7}},
            {shape: "1x1", index: {row: 0, column: 8}},
            {shape: "1x1", index: {row: 1, column: 7}},
            {shape: "1x1", index: {row: 1, column: 8}},
        ],
        machineLayout: [
            {shape: "1x2", index: {row: 5, column: 7}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 7}, type: "sweet", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 8}, type: "red"},
            {shape: "1x1", index: {row: 3, column: 7}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 8}, type: "savoury", typeFixed: true},
            {shape: "1x2", index: {row: 4, column: 7}, type: "liquid"}
        ],
        dialog: new Dialog(DIALOG_DAY_13),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_13)
    }, {
        level: 14,
        recipe: "SCHOKOLADENBROT",
        conveyorBeltPattern:
            "  |  |  |  |  |  |  |  \n" +
            "A0|  |  |  |  |  |F0|F1\n" +
            "A1|B0|  |  |  |E0|E1|F2\n" +
            "A2|B1|C0|C1|C2|C3|E2|F3\n" +
            "A3|B2|B3|E6|E5|E4|E3|F4\n" +
            "D0|D1|D2|D3|D4|D5|F6|F5",
        startIngredients: new Map([
            ["A", "cream"],
            ["B", "currant_pudding"],
            ["C", "egg_powder"],
            ["D", "flour"],
            ["E", "honey"],
            ["F", "nuts"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 0}},
            {shape: "1x1", index: {row: 0, column: 3}},
            {shape: "1x1", index: {row: 0, column: 6}},
            {shape: "1x1", index: {row: 0, column: 7}},
            {shape: "1x1", index: {row: 1, column: 1}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 2, column: 2}},
            {shape: "1x1", index: {row: 2, column: 4}},
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 2}, type: "red"},
            {shape: "1x1", index: {row: 0, column: 4}, type: "sweet", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 5}, type: "brown", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 2}, type: "neutral", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 3}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 4}, type: "liquid", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 7}, type: "yellow", positionFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_14),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_14)
    }, {
        level: 15,
        recipe: "ENGELSAUGEN",
        conveyorBeltPattern:
            "A0|A1|D4|D3|D2|D1|  |  \n" +
            "  |A2|C4|  |C0|D0|  |  \n" +
            "A4|A3|C3|C2|C1|G3|G4|G5\n" +
            "B4|B3|E4|E3|E2|G2|G1|G6\n" +
            "  |B2|E5|E0|E1|F0|G0|G7\n" +
            "B0|B1|F4|F3|F2|F1|  |  ",
        startIngredients: new Map([
            ["A", "rum_aroma"],
            ["B", "ground_nuts"],
            ["C", "nut_butter"],
            ["D", "ground_nuts"],
            ["E", "beet_pudding"],
            ["F", "vanilla_sugar"],
            ["G", "chocolate_pudding"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 1, column: 0}},
            {shape: "1x1", index: {row: 1, column: 3}},
            {shape: "1x1", index: {row: 4, column: 0}},
            {shape: "1x1", index: {row: 5, column: 7}},
        ],
        machineLayout: [
            {shape: "2x2", index: {row: 0, column: 6}, type: "brown"},
            {shape: "1x1", index: {row: 0, column: 3}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 1, column: 1}, type: "savoury", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 1}, type: "red", typeFixed: true},
            {shape: "1x1", index: {row: 5, column: 3}, type: "red", positionFixed: true},
            {shape: "1x1", index: {row: 5, column: 6}, type: "sweet", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_15),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(QUADRUPLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_15)
    }, {
        level: 16,
        recipe: "SCHWARZWEISSKEKSE",
        conveyorBeltPattern:
            "  |A2|A1|A0|F4|F3|F2|F1|  \n" +
            "A4|A3|  |  |F5|  |  |F0|G0\n" +
            "B0|  |C1|C0|F6|F7|F8|  |G1\n" +
            "B1|  |C2|D0|D1|D2|F9|  |G2\n" +
            "B2|B3|  |E0|E1|D3|  |G4|G3\n" +
            "  |B4|B5|E3|E2|G7|G6|G5|  ",
        startIngredients: new Map([
            ["A", "milk"],
            ["B", "lemon_sugar"],
            ["C", "nut_butter"],
            ["D", "sweetened_milk"],
            ["E", "nut_cream"],
            ["F", "swamp_water"],
            ["G", "scrambled_egg"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 0}},
            {shape: "1x1", index: {row: 0, column: 8}},
            {shape: "1x1", index: {row: 1, column: 2}},
            {shape: "1x1", index: {row: 1, column: 3}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 1, column: 6}},
            {shape: "1x1", index: {row: 2, column: 1}},
            {shape: "1x1", index: {row: 2, column: 7}},
            {shape: "1x1", index: {row: 3, column: 1}},
            {shape: "1x1", index: {row: 3, column: 7}},
            {shape: "1x1", index: {row: 4, column: 2}},
            {shape: "1x1", index: {row: 4, column: 6}},
            {shape: "1x1", index: {row: 5, column: 0}},
            {shape: "1x1", index: {row: 5, column: 8}},
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "sweet", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 0}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 4}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 7}, type: "solid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 2}, type: "liquid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 8}, type: "sweet", positionFixed: true},
            {shape: "1x1", index: {row: 0, column: 5}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 6}, type: "powdery", typeFixed: true},
            {shape: "2x1", index: {row: 0, column: 4}, type: "brown"},
        ],
        dialog: new Dialog(DIALOG_DAY_16),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_16)
    }, {
        level: 17,
        recipe: "LEBKUCHEN",
        conveyorBeltPattern:
            "A2|A1|A0|E4|E3|E2|E1|F2|G7\n" +
            "A3|D0|D1|E5|H6|  |E0|F1|G6\n" +
            "A4|  |D2|D3|H5|H4|  |F0|G5\n" +
            "A5|B0|  |D4|D5|H3|H2|  |G4\n" +
            "A6|B1|C0|  |D6|C5|H1|H0|G3\n" +
            "A7|B2|C1|C2|C3|C4|G0|G1|G2",
        startIngredients: new Map([
            ["A", "currant_juice"],
            ["B", "sweetened_cream"],
            ["C", "boiled_egg"],
            ["D", "melted_chocolate"],
            ["E", "rum_aroma"],
            ["F", "mud"],
            ["G", "rotten_fruits"],
            ["H", "peeled_nuts"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 2, column: 1}},
            {shape: "1x1", index: {row: 3, column: 2}},
            {shape: "1x1", index: {row: 4, column: 3}},
            {shape: "1x1", index: {row: 1, column: 5}},
            {shape: "1x1", index: {row: 2, column: 6}},
            {shape: "1x1", index: {row: 3, column: 7}},
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 4}, type: "white", positionFixed: true},
            {shape: "1x1", index: {row: 0, column: 5}, type: "liquid", positionFixed: true},
            {shape: "1x2", index: {row: 1, column: 7}, type: "brown", positionFixed: true},
            {shape: "1x2", index: {row: 2, column: 3}, type: "sticky", positionFixed: true},
            {shape: "1x2", index: {row: 3, column: 4}, type: "red", positionFixed: true},
            {shape: "1x2", index: {row: 4, column: 0}, type: "white", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 8}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 5, column: 3}, type: "solid", positionFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_17),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_17)
    }, {
        level: 18,
        recipe: "PFEFFERNUESSE",
        conveyorBeltPattern:
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "A0|B0|C0|C1|C2|C3|C4|C5|C6\n" +
            "A1|B1|D3|D2|D1|D0|F0|F1|F2\n" +
            "A2|B2|D4|E0|  |  |G0|H1|H0\n" +
            "A3|D6|D5|E1|E2|G2|G1|H2|H3",
        startIngredients: new Map([
            ["A", "lemon_sugar"],
            ["B", "boiled_egg"],
            ["C", "melted_chocolate"],
            ["D", "egg_powder"],
            ["E", "sugar"],
            ["F", "marzipan"],
            ["G", "cream"],
            ["H", "lemon_aroma"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 0, column: 0}},
            {shape: "1x1", index: {row: 1, column: 0}},
            {shape: "1x1", index: {row: 1, column: 1}},
            {shape: "1x1", index: {row: 1, column: 2}},
            {shape: "1x1", index: {row: 1, column: 3}},
            {shape: "1x1", index: {row: 1, column: 6}},
            {shape: "1x1", index: {row: 1, column: 7}},
            {shape: "1x1", index: {row: 1, column: 8}},
            {shape: "1x1", index: {row: 4, column: 4}},
            {shape: "1x1", index: {row: 4, column: 5}}
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "red", typeFixed: true},
            {shape: "1x2", index: {row: 0, column: 2}, type: "neutral"},
            {shape: "1x1", index: {row: 0, column: 4}, type: "solid"},
            {shape: "1x1", index: {row: 0, column: 5}, type: "neutral", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 6}, type: "liquid"},
            {shape: "1x1", index: {row: 0, column: 7}, type: "white"},
            {shape: "1x1", index: {row: 0, column: 8}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 4}, type: "sweet"},
            {shape: "1x1", index: {row: 1, column: 5}, type: "white"}
        ],
        dialog: new Dialog(DIALOG_DAY_18),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_18)
    }, {
        level: 19,
        recipe: "PANETTONE",
        conveyorBeltPattern:
            "A0|A1|C1|C2|C3|D0|D1|D2|D3\n" +
            "  |A2|C0|  |C4|C5|C6|C7|  \n" +
            "A4|A3|  |  |  |  |E1|E0|  \n" +
            "B0|B1|  |  |  |F5|E2|E3|  \n" +
            "  |B2|B5|F2|F3|F4|G1|G0|H0\n" +
            "  |B3|B4|F1|F0|G3|G2|H2|H1",
        startIngredients: new Map([
            ["A", "nut_butter"],
            ["B", "steak"],
            ["C", "lemon_aroma"],
            ["D", "cream"],
            ["E", "honey_comb"],
            ["F", "umeboshi"],
            ["G", "steak"],
            ["H", "melted_butter"]
        ]),
        blocks: [
            {shape: "1x1", index: {row: 1, column: 0}},
            {shape: "1x1", index: {row: 1, column: 3}},
            {shape: "1x1", index: {row: 1, column: 8}},
            {shape: "1x1", index: {row: 2, column: 2}},
            {shape: "1x1", index: {row: 2, column: 5}},
            {shape: "1x1", index: {row: 2, column: 8}},
            {shape: "1x1", index: {row: 3, column: 2}},
            {shape: "1x1", index: {row: 3, column: 3}},
            {shape: "1x1", index: {row: 3, column: 4}},
            {shape: "1x1", index: {row: 3, column: 8}},
            {shape: "1x1", index: {row: 4, column: 0}},
            {shape: "1x1", index: {row: 5, column: 0}},
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 3}, type: "sweet", typeFixed: true},
            {shape: "3x1", index: {row: 0, column: 6}, type: "solid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "sour", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 4}, type: "brown"},
            {shape: "1x2", index: {row: 4, column: 5}, type: "sweet", positionFixed: true, typeFixed: true},
            {shape: "1x1", index: {row: 5, column: 1}, type: "red", positionFixed: true},
            {shape: "1x1", index: {row: 5, column: 8}, type: "solid", positionFixed: true}
        ],
        dialog: new Dialog(DIALOG_DAY_19),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(TRIPLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_19)
    }, {
        level: 20,
        recipe: "BAERENTATZEN",
        conveyorBeltPattern:
            "A0|B0|E0|E1|F0|G1|G0|H0\n" +
            "A1|B1|  |E2|F1|G2|H2|H1\n" +
            "A2|B2|  |E3|F2|G3|H3|H4\n" +
            "A3|B3|  |E4|F3|G4|G5|H5\n" +
            "A4|C5|C4|C3|C2|C1|C0|H6\n" +
            "A5|D3|D2|D1|D0|  |  |H7",
        startIngredients: new Map([
            ["A", "flour"],
            ["B", "rotten_fruit_juice"],
            ["C", "cream"],
            ["D", "peeled_nuts"],
            ["E", "cherry_sugar"],
            ["F", "cocoa"],
            ["G", "beet"],
            ["H", "cherries"],
        ]),
        blocks: [
            {shape: "1x1", index: {row: 1, column: 2}},
            {shape: "1x1", index: {row: 2, column: 2}},
            {shape: "1x1", index: {row: 3, column: 2}},
            {shape: "1x1", index: {row: 5, column: 5}},
            {shape: "1x1", index: {row: 5, column: 6}}
        ],
        machineLayout: [
            {shape: "1x1", index: {row: 1, column: 0}, type: "sweet", typeFixed: true},
            {shape: "2x1", index: {row: 4, column: 3}, type: "solid", positionFixed: true},
            {shape: "1x3", index: {row: 1, column: 5}, type: "yellow", typeFixed: true},
            {shape: "1x3", index: {row: 2, column: 5}, type: "sticky", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_20),
        hints: [new Dialog(BE_FAST_HINT), new Dialog(NON_TIMING_FIRST_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(TRIPLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_20)
    }, {
        level: 21,
        recipe: "NUSSECKEN",
        conveyorBeltPattern:
            "A0|B0|C0|D0|E0|F0|G0|H0|I0\n" +
            "A1|B1|C1|D1|E1|F1|G1|H1|I1\n" +
            "A2|B2|C2|D2|E2|F2|G2|H2|I2\n" +
            "A3|B3|C3|D3|E3|  |  |  |  \n" +
            "A4|B4|  |D4|E4|  |  |  |  \n" +
            "A5|  |  |D5|E5|  |  |  |  ",
        startIngredients: new Map([
            ["A", "spices"],
            ["B", "steak"],
            ["C", "beet_flour"],
            ["D", "beet_pudding"],
            ["E", "cherry_sauce"],
            ["F", "rum_aroma"],
            ["G", "flour"],
            ["H", "melted_butter"],
            ["I", "cherry_sugar"],
        ]),
        blocks: [
            {shape: "1x1", index: {row: 3, column: 5}},
            {shape: "1x1", index: {row: 3, column: 6}},
            {shape: "1x1", index: {row: 3, column: 7}},
            {shape: "1x1", index: {row: 3, column: 8}},
            {shape: "1x1", index: {row: 4, column: 2}},
            {shape: "1x1", index: {row: 5, column: 1}},
            {shape: "1x1", index: {row: 5, column: 2}},
            {shape: "1x1", index: {row: 5, column: 5}},
        ],
        machineLayout: [
            {shape: "1x2", index: {row: 2, column: 0}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 5}, type: "powdery", typeFixed: true},
            {shape: "1x2", index: {row: 4, column: 6}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 8}, type: "savoury", typeFixed: true},
            {shape: "1x1", index: {row: 5, column: 6}, type: "white", typeFixed: true},
            {shape: "1x2", index: {row: 5, column: 7}, type: "sour"}
        ],
        dialog: new Dialog(DIALOG_DAY_21),
        hints: [new Dialog(BE_FAST_HINT), new Dialog(NON_TIMING_FIRST_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_21)
    }, {
        level: 22,
        recipe: "DOMINOSTEINE",
        conveyorBeltPattern:
            "A0|B0|C0|D0|E0|F0|G0|H0|I0\n" +
            "A1|B1|C1|D1|E1|F1|G1|H1|I1\n" +
            "A2|B2|C2|D2|E2|F2|G2|H2|I2\n" +
            "A3|B3|C3|D3|E3|F3|G3|H3|I3\n" +
            "A4|B4|C4|D4|E4|F4|G4|H4|I4\n" +
            "A5|B5|C5|D5|E5|F5|G5|H5|I5",
        startIngredients: new Map([
            ["A", "cream"],
            ["B", "sweetened_milk"],
            ["C", "swamp_water"],
            ["D", "nuts"],
            ["E", "sweetened_cream"],
            ["F", "currant_sugar"],
            ["G", "cornflour"],
            ["H", "brown_sugar"],
            ["I", "candied_lemon_peel"],
        ]),
        machineLayout: [
            {shape: "1x1", index: {row: 3, column: 0}, type: "liquid", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 8}, type: "sweet", positionFixed: true},
            {shape: "1x2", index: {row: 1, column: 0}, type: "sour", positionFixed: true},
            {shape: "1x2", index: {row: 1, column: 4}, type: "yellow", positionFixed: true},
            {shape: "1x2", index: {row: 1, column: 7}, type: "liquid", positionFixed: true},
            {shape: "1x2", index: {row: 2, column: 1}, type: "solid", positionFixed: true},
            {shape: "1x2", index: {row: 2, column: 6}, type: "red", positionFixed: true, typeFixed: true},
            {shape: "1x2", index: {row: 3, column: 2}, type: "white", positionFixed: true, typeFixed: true},
            {shape: "1x2", index: {row: 3, column: 5}, type: "sweet", positionFixed: true},
            {shape: "1x2", index: {row: 4, column: 3}, type: "sticky", positionFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_22),
        hints: [new Dialog(BE_FAST_HINT), new Dialog(NON_TIMING_FIRST_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_22)
    }, {
        level: 23,
        recipe: "CORNFLAKEWALNUSSKEKSE",
        conveyorBeltPattern:
            "A0|A1|A2|A3|A4|A5|A6|A7|I0\n" +
            "B0|B1|B2|B3|B4|B5|B6|D2|I1\n" +
            "C0|C1|C2|C3|C4|C5|D0|D1|I2\n" +
            "E1|E0|F5|F4|F3|F2|F1|F0|I3\n" +
            "E2|G6|G5|G4|G3|G2|G1|G0|I4\n" +
            "H7|H6|H5|H4|H3|H2|H1|H0|I5",
        startIngredients: new Map([
            ["A", "candied_lemon_peel"],
            ["B", "sugar"],
            ["C", "eggnog"],
            ["D", "lemon_powder"],
            ["E", "marzipan"],
            ["F", "lemon_juice"],
            ["G", "sugar"],
            ["H", "lemon_aroma"],
            ["I", "rotten_fruit_juice"],
        ]),
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "neutral", typeFixed: true},
            {shape: "2x1", index: {row: 2, column: 3}, type: "sticky", typeFixed: true, positionFixed: true},
            {shape: "1x2", index: {row: 2, column: 7}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 0}, type: "solid", positionFixed: true},
            {shape: "1x1", index: {row: 5, column: 6}, type: "savoury", typeFixed: true},
        ],
        dialog: new Dialog(DIALOG_DAY_23),
        hints: [new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_23)
    }, {
        level: 24,
        recipe: "STOLLEN",
        conveyorBeltPattern:
            "  |A3|B3|E3|  |G0|  |I0|J0\n" +
            "  |A2|B2|E2|E1|G1|  |I1|J1\n" +
            "A0|A1|B1|B0|E0|G2|H3|I2|J2\n" +
            "C0|C1|D1|D0|F0|G3|H2|I3|J3\n" +
            "  |C2|D2|F2|F1|G4|H1|  |J4\n" +
            "  |C3|D3|F3|  |G5|H0|  |J5",
        startIngredients: new Map([
            ["A", "beet_pudding"],
            ["B", "cherry_jam"],
            ["C", "cherry_sauce"],
            ["D", "cherries"],
            ["E", "marzipan"],
            ["F", "lemon_powder"],
            ["G", "mud"],
            ["H", "nut_cream"],
            ["I", "melted_chocolate"],
            ["J", "eggnog"],
        ]),
        machineLayout: [
            {shape: "1x1", index: {row: 0, column: 6}, type: "liquid", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 0}, type: "solid", typeFixed: true},
            {shape: "1x2", index: {row: 1, column: 6}, type: "powdery", typeFixed: true},
            {shape: "2x2", index: {row: 2, column: 1}, type: "brown", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 8}, type: "red", positionFixed: true},
            {shape: "1x2", index: {row: 4, column: 1}, type: "neutral", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 3}, type: "sour", positionFixed: true},
            {shape: "1x2", index: {row: 4, column: 4}, type: "white", positionFixed: true, typeFixed: true},
        ],
        blocks: [
            {shape: "1x1", index: {row: 0, column: 0}},
            {shape: "1x1", index: {row: 0, column: 4}},
            {shape: "1x1", index: {row: 4, column: 0}},
            {shape: "1x1", index: {row: 4, column: 7}},
            {shape: "1x1", index: {row: 5, column: 0}},
            {shape: "1x1", index: {row: 5, column: 4}},
            {shape: "1x1", index: {row: 5, column: 7}}
        ],
        dialog: new Dialog(DIALOG_DAY_24),
        hints: [new Dialog(BE_FAST_HINT), new Dialog(NON_TIMING_FIRST_HINT), new Dialog(CHANGE_TYPE_HINT), new Dialog(DOUBLE_MACHINES_HINT), new Dialog(IRON_CHAINS_HINT), new Dialog(QUADRUPLE_MACHINES_HINT)],
        lastWords: new Dialog(LAST_WORDS_DAY_24)
    }
]

export class LevelInitiator {
    static addLevels(sceneManager: SceneManager) {
        LEVEL_MANIFEST.forEach(config => {
            sceneManager.add("level_" + config.level,
                new FactoryScene(
                    {
                        app: App,
                        level: config.level,
                        conveyorBeltPattern: config.conveyorBeltPattern,
                        recipe: config.recipe,
                        machineLayout: config.machineLayout,
                        blockLayout: config.blocks,
                        startIngredients: config.startIngredients,
                        hasStepButton: config.hasStepButton,
                        dialog: config.dialog,
                        hints: config.hints,
                        lastWords: config.lastWords
                    }
                ))
        })
    }

    static getRecipeForDay(day: number): RecipeID {
        let config = LEVEL_MANIFEST.find(config => config.level == day)
        if (!config) {
            //throw Error("No level config found for day " + day)
            return "RUMKUGELN"
        }
        return config.recipe
    }

    static getCookieEyeConfigForRecipe(recipeID: RecipeID): CookieEyesConfig {
        switch (recipeID) {
            case "SANTAMILK":
                return {x: 0, y: 30};
            case "SCHOKOCROSSIES":
                return {x: 25, y: 10, useUnderlay: true, underlayColor: 0xeead48};
            case "MUERBETEIGKEKSE":
                return {x: 0, y: 30};
            case "RUMKUGELN":
                return {x: 0, y: 5, useUnderlay: true, underlayColor: 0xd89956};
            case "PUNSCH":
                return {x: 0, y: 45};
            case "BETHMAENNCHEN":
                return {x: 0, y: 0};
            case "ZIMTSTERNE":
                return {x: 0, y: 20};
            case "PRINTEN":
                return {x: 0, y: 15};
            case "ENGELSAUGEN":
                return {x: 0, y: 0};
            case "VANILLEKIPFERL":
                return {x: 0, y: 40};
            case "MAKRONEN":
                return {x: 0, y: 0};
            case "FLORENTINER":
                return {x: 0, y: 0};
            case "SPRITZGEBAECK":
                return {x: 0, y: 40};
            case "LEBKUCHEN":
                return {x: 0, y: -165};
            case "SPEKULATIUS":
                return {x: 0, y: 30};
            case "PFEFFERNUESSE":
                return {x: 0, y: 0};
            case "PANETTONE":
                return {x: 0, y: 30};
            case "SCHWARZWEISSKEKSE":
                return {x: 0, y: 10};
            case "STOLLEN":
                return {x: 0, y: -10};
            case "SCHOKOLADENBROT":
                return {x: 0, y: 0};
            case "NUSSECKEN":
                return {x: 0, y: 20};
            case "CORNFLAKEWALNUSSKEKSE":
                return {x: 0, y: 75, useUnderlay: true, underlayColor: 0xd1a949};
            case "BAERENTATZEN":
                return {x: 0, y: 130};
            case "DOMINOSTEINE":
                return {x: 0, y: 0};
        }
    }
}
