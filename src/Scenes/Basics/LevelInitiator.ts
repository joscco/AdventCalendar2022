import {FactoryScene} from "../FactoryScene";
import {RecipeID} from "../../gameobjects/GameScreen/RecipeBox";
import {App} from "../../index";
import {BlockDefinition, MachineDefinition} from "../../gameobjects/GameScreen/Machinery/Machine";
import {IngredientID} from "../../gameobjects/GameScreen/ConveyorBelt/Ingredient";
import SceneManager from "../../General/SceneManager";
import {Dialog} from "../../gameobjects/Dialog/Dialogs/DialogConfig";

type LevelConfig = {
    level: number;
    recipe: RecipeID;
    conveyorBeltPattern: string;
    machines: MachineDefinition[];
    blocks?: BlockDefinition[];
    startIngredients?: Map<string, IngredientID>;
    hasStepButton?: boolean,
    dialog?: Dialog,
    hints?: Dialog[]
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
        machines: [{shape: "1x1", index: {row: 1, column: 1}, type: "liquid"}],
        startIngredients: new Map([
            ["A", "honey"],
            ["B", "cream"]
        ]),
        dialog: new Dialog({
            nodes: [
                {
                    id: "start",
                    speeches: [
                        {text: "Oh hello! A new face, how nice!"},
                        {text: "I am Bernd, but you can also call me Bernie, B-Man, ..., whatever you like."},
                        {text: "I own this cute little cookie factory here."}],
                    successors: [{on: "clicked_music_button", nextID: null}]
                }
            ],
            startNodeID: "start"
        }),
        hints: [new Dialog({
            nodes: [
                {
                    id: "start",
                    speeches: [
                        {text: "God, I really love food so much"}],
                    successors: []
                }
            ],
            startNodeID: "start"
        })]
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
        machines: [
            {shape: "1x1", index: {row: 1, column: 1}, type: "liquid"},
            {shape: "1x1", index: {row: 1, column: 2}, type: "white"},
            {shape: "1x1", index: {row: 2, column: 1}, type: "solid"}
        ]
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
        machines: [
            // Types should be fixed!
            {shape: "1x2", index: {row: 1, column: 0}, type: "yellow"},
            {shape: "1x2", index: {row: 2, column: 2}, type: "white"},
        ]
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
        machines: [
            // Types should be fixed!
            {shape: "1x1", index: {row: 1, column: 2}, type: "sweet"},
            {shape: "1x1", index: {row: 2, column: 1}, type: "yellow"},
            {shape: "1x1", index: {row: 2, column: 2}, type: "savoury"},
            {shape: "1x1", index: {row: 2, column: 3}, type: "sweet"},
            {shape: "1x1", index: {row: 3, column: 2}, type: "liquid"},
        ]
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
        machines: [
            // Types should be fixed!
            {shape: "1x1", index: {row: 1, column: 3}, type: "savoury", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 2}, type: "sticky", typeFixed: true},
            {shape: "1x2", index: {row: 2, column: 3}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 3}, type: "sweet"}
        ]
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
            ["C", "grinded_nuts"],
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
        machines: [
            // Types should be fixed!
            {shape: "1x1", index: {row: 1, column: 3}, type: "red"},
            {shape: "1x1", index: {row: 2, column: 3}, type: "yellow"},
            {shape: "1x1", index: {row: 2, column: 4}, type: "brown"},
            {shape: "1x1", index: {row: 4, column: 3}, type: "liquid"}
        ]
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
        machines: [
            {shape: "1x1", index: {row: 4, column: 1}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 2}, type: "solid", positionFixed: true},
            {shape: "2x1", index: {row: 2, column: 1}, type: "red"},
            {shape: "2x1", index: {row: 0, column: 2}, type: "solid", positionFixed: true}
        ]
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
        machines: [
            {shape: "1x2", index: {row: 2, column: 0}, type: "liquid"},
            {shape: "1x1", index: {row: 2, column: 2}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "sweet"},
            {shape: "1x1", index: {row: 2, column: 4}, type: "liquid"},
            {shape: "1x1", index: {row: 2, column: 5}, type: "liquid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 6}, type: "sour", typeFixed: true}
        ]
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
        machines: [
            // Types should be fixed!
            {shape: "2x1", index: {row: 0, column: 2}, type: "brown", positionFixed: true},
            {shape: "1x1", index: {row: 1, column: 3}, type: "liquid"},
            {shape: "1x1", index: {row: 3, column: 3}, type: "brown"},
            {shape: "1x1", index: {row: 3, column: 4}, type: "liquid"},
            {shape: "1x1", index: {row: 3, column: 6}, type: "powdery", typeFixed: true},
        ]
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
        machines: [
            // Types should be fixed!
            {shape: "2x2", index: {row: 0, column: 2}, type: "savoury"},
            {shape: "1x1", index: {row: 0, column: 1}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 4}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 1}, type: "red", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 4}, type: "red", positionFixed: true},
        ]
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
            ["D", "grinded_nuts"],
            ["E", "beet_pudding"],
            ["F", "lemon_powder"]
        ]),
        machines: [
            // Types should be fixed!
            {shape: "1x2", index: {row: 0, column: 3}, type: "powdery", typeFixed: true},
            {shape: "1x2", index: {row: 1, column: 3}, type: "sour"},
            {shape: "1x2", index: {row: 2, column: 3}, type: "sweet", typeFixed: true},
            {shape: "1x2", index: {row: 3, column: 3}, type: "sticky"},
            {shape: "1x2", index: {row: 4, column: 3}, type: "white", typeFixed: true},
        ]
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
        machines: [
            {shape: "1x3", index: {row: 0, column: 1}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 4}, type: "powdery", typeFixed: true},
            {shape: "1x2", index: {row: 0, column: 5}, type: "solid"},
            {shape: "1x1", index: {row: 1, column: 3}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 4}, type: "sour"},
            {shape: "1x1", index: {row: 1, column: 5}, type: "white", typeFixed: true},
        ]
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
            {shape: "1x1", index: {row: 5, column: 7}},
            {shape: "1x1", index: {row: 5, column: 8}},
        ],
        machines: [
            {shape: "1x2", index: {row: 1, column: 7}, type: "yellow", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 7}, type: "sweet", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 8}, type: "red"},
            {shape: "1x1", index: {row: 3, column: 7}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 3, column: 8}, type: "savoury", typeFixed: true},
            {shape: "1x2", index: {row: 4, column: 7}, type: "liquid"}
        ]
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
        machines: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 2}, type: "red"},
            {shape: "1x1", index: {row: 0, column: 4}, type: "sweet", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 5}, type: "brown", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 2}, type: "neutral", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 3}, type: "sticky", typeFixed: true},
            {shape: "1x1", index: {row: 1, column: 4}, type: "liquid", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 3}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 2, column: 7}, type: "yellow", positionFixed: true},
        ]
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
            ["B", "grinded_nuts"],
            ["C", "nut_butter"],
            ["D", "grinded_nuts"],
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
        machines: [
            {shape: "2x2", index: {row: 0, column: 6}, type: "brown"},
            {shape: "1x1", index: {row: 0, column: 3}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 1, column: 1}, type: "savoury", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 1}, type: "red", typeFixed: true},
            {shape: "1x1", index: {row: 5, column: 3}, type: "red", positionFixed: true},
            {shape: "1x1", index: {row: 5, column: 6}, type: "sweet", typeFixed: true},
        ]
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
            ["B", "grinded_umeboshi"],
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
        machines: [
            {shape: "1x1", index: {row: 0, column: 1}, type: "sweet", positionFixed: true},
            {shape: "1x1", index: {row: 3, column: 0}, type: "sour", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 1}, type: "yellow", positionFixed: true},
            {shape: "1x1", index: {row: 4, column: 4}, type: "white", typeFixed: true},
            {shape: "1x1", index: {row: 4, column: 7}, type: "solid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 2}, type: "liquid", positionFixed: true},
            {shape: "1x1", index: {row: 2, column: 8}, type: "sweet", positionFixed: true},
            {shape: "1x1", index: {row: 0, column: 5}, type: "powdery", typeFixed: true},
            {shape: "1x1", index: {row: 0, column: 6}, type: "powdery", typeFixed: true},
            {shape: "2x1", index: {row: 0, column: 4}, type: "brown"},
        ]
    },
    // {
    //     level: 17,
    //     recipe: "LEBKUCHEN"
    // },{
    //     level: 18,
    //     recipe: "PFEFFERNUESSE"
    // },{
    //     level: 19,
    //     recipe: "PANETTONE"
    // },{
    //     level: 20,
    //     recipe: "BAERENTATZEN"
    // },{
    //     level: 21,
    //     recipe: "NUSSECKEN"
    // },{
    //     level: 22,
    //     recipe: "CORNFLAKEWALNUSSKEKSE"
    // },{
    //     level: 23,
    //     recipe: "DOMINOSTEINE"
    // },{
    //     level: 24,
    //     recipe: "STOLLEN"
    // }
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
                        machineLayout: config.machines,
                        blockLayout: config.blocks,
                        startIngredients: config.startIngredients,
                        hasStepButton: config.hasStepButton,
                        dialog: config.dialog,
                        hints: config.hints
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
}
