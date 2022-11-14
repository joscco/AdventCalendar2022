import {FactoryScene} from "../FactoryScene";
import {RecipeID} from "../../gameobjects/RecipeBox";
import {App} from "../../index";
import {BlockDefinition, MachineDefinition} from "../../gameobjects/Machinery/Machine";
import {IngredientID} from "../../gameobjects/Ingredient";
import SceneManager from "../../General/SceneManager";

type LevelConfig = {
    level: number;
    recipe: RecipeID;
    conveyorBeltPattern: string;
    machines: MachineDefinition[];
    blocks?: BlockDefinition[];
    startIngredients?: Map<string, IngredientID>;
    hasStepButton?: boolean,
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
        ])
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
    },
    {
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
    },
    {
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
    },
    // {
    //     level: 7,
    //     recipe: "ZIMTSTERNE"
    // },{
    //     level: 8,
    //     recipe: "PRINTEN"
    // },{
    //     level: 9,
    //     recipe: "VANILLEKIPFERL"
    // },{
    //     level: 10,
    //     recipe: "FLORENTINER"
    // },{
    //     level: 11,
    //     recipe: "MAKRONEN"
    // },{
    //     level: 12,
    //     recipe: "SPRITZGEBAECK"
    // },{
    //     level: 13,
    //     recipe: "SPEKULATIUS"
    // },{
    //     level: 14,
    //     recipe: "SCHOKOLADENBROT"
    // },{
    //     level: 15,
    //     recipe: "ENGELSAUGEN"
    // },{
    //     level: 16,
    //     recipe: "SCHWARZWEISSKEKSE"
    // },{
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
                        hasStepButton: config.hasStepButton
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