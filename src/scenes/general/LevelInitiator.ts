import {FactoryScene} from "../FactoryScene";
import {RecipeID} from "../../gameobjects/RecipeBox";
import {App} from "../../index";
import {MachineDefinition} from "../../gameobjects/Machinery/Machine";
import {IngredientID} from "../../gameobjects/Ingredient";
import SceneManager from "../../general/SceneManager";

type LevelConfig = {
    level: number;
    recipe: RecipeID;
    conveyorBeltPattern: string;
    machines: MachineDefinition[];
    startIngredients?: Map<string, IngredientID>;
    hasStepButton?: boolean
}

type LevelConfigManifest = LevelConfig[]

const LEVEL_MANIFEST: LevelConfigManifest = [
    {
        level: 0,
        conveyorBeltPattern:
        // At most 6 rows, 9 columns
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  \n" +
            "  |  |  |  |  |  |  |  |  ",
        recipe: "SANTAMILK",
        machines: [{shape: "1x1", index: {row: 1, column: 1}, type: "liquid"},
            {shape: "1x2", index: {row: 1, column: 2}, type: "liquid"},
            {shape: "1x3", index: {row: 1, column: 4}, type: "liquid"},
            {shape: "2x1", index: {row: 1, column: 7}, type: "liquid"}],
        startIngredients: new Map([
            ["A", "honey"],
            ["B", "cream"]
        ])
    },
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
            "A0|B0|C0|C1|C2\n" +
            "A1|B1|B2|B3|B4\n" +
            "A2|A3|A4|A5|  ",
        recipe: "NUSSECKEN",
        machines: [{shape: "1x1", index: {row: 0, column: 0}}]
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
                        machineLayout: config.machines,
                        startIngredients: config.startIngredients,
                        hasStepButton: config.hasStepButton
                    }
                ))
        })
    }

    static getRecipeForDay(day: number): RecipeID{
        let config = LEVEL_MANIFEST.find(config => config.level == day)
        if (!config) {
            //throw Error("No level config found for day " + day)
            return "RUMKUGELN"
        }
        return config.recipe
    }
}