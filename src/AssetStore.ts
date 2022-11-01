import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";
import {MachineShape, MachineType} from "./gameobjects/Machinery/Machine";
import {IngredientID} from "./gameobjects/Ingredient";

export class AssetStore {
    START_SCENE?: StartSceneAssets
    LEVEL_SCENE?: LevelSceneAssets
    GAME_SCENE?: GameSceneAssets
    MAIN_FONT?: FontFace
    MACHINES?: MachineAssets
    BELT_TILES?: BeltTileAssets
    TOOLTIP?: TooltipAssets
    INGREDIENTS?: IngredientAssets

    constructor() {
        this.addAssets()
    }

    async loadAssets() {
        this.MAIN_FONT = await Assets.load("font") as FontFace
        this.START_SCENE = this.prepareStartSceneAssets(await Assets.loadBundle("startSceneAssets"))
        this.LEVEL_SCENE = this.prepareLevelSceneAssets(await Assets.loadBundle("levelSceneAssets"))
        this.GAME_SCENE = this.prepareGameSceneAssets(await Assets.loadBundle("gameSceneAssets"))
        this.BELT_TILES = this.prepareBeltTileAssets(await Assets.loadBundle("beltTileAssets"))
        this.MACHINES = this.prepareMachineAssets(await Assets.loadBundle("machines"), await Assets.loadBundle("machineIcons"))
        this.TOOLTIP = this.prepareTooltipAssets(await Assets.loadBundle("tooltipAssets"))
        this.INGREDIENTS = this.prepareIngredientAssets(await Assets.loadBundle("ingredients"))
    }

    private addAssets() {
        Assets.add("font", "assets/fonts/FuturaHandwritten.ttf")

        Assets.addBundle("startSceneAssets", {
            torso: "assets/startScreen/bernd/body_middle.png",
            backTorso: "assets/startScreen/bernd/backBody.png",
            head: "assets/startScreen/bernd/head.png",
            eyes_closed: "assets/startScreen/bernd/closed_eyes.png",
            eyes_open: "assets/startScreen/bernd/open_eyes.png",
            left_arm_leaning: "assets/startScreen/bernd/leftArmLeaning.png",
            left_arm_showing: "assets/startScreen/bernd/leftArmShowing.png",
            right_arm_leaning: "assets/startScreen/bernd/rightArmLeaning.png",
            backgroundPattern: "assets/startScreen/backgroundPattern.png",
            pretitle: "assets/startScreen/pretitle.png",
            startButton: "assets/startScreen/startButton.png",
            title_0: "assets/startScreen/titleLetters/title0.png",
            title_1: "assets/startScreen/titleLetters/title1.png",
            title_2: "assets/startScreen/titleLetters/title2.png",
            title_3: "assets/startScreen/titleLetters/title3.png",
            title_4: "assets/startScreen/titleLetters/title4.png",
            title_5: "assets/startScreen/titleLetters/title5.png",
            title_6: "assets/startScreen/titleLetters/title6.png",
            title_7: "assets/startScreen/titleLetters/title7.png",
            title_8: "assets/startScreen/titleLetters/title8.png",
            title_9: "assets/startScreen/titleLetters/title9.png",
            title_10: "assets/startScreen/titleLetters/title10.png",
            title_11: "assets/startScreen/titleLetters/title11.png",
            title_12: "assets/startScreen/titleLetters/title12.png",
            title_13: "assets/startScreen/titleLetters/title13.png",
            title_14: "assets/startScreen/titleLetters/title14.png",
        });

        Assets.addBundle("gameSceneAssets", {
            emptyField: "assets/gameScreen/grids/emptyField.png",
            machineOuterGrid: "assets/gameScreen/grids/machineOuterGrid.png",
            recipeBox: "assets/gameScreen/grids/recipeBox.png",
            backButton: "assets/gameScreen/buttons/backButton.png",
            muteButton: "assets/gameScreen/buttons/muteButton.png",
            soundButton: "assets/gameScreen/buttons/soundButton.png",
            recipeButton: "assets/gameScreen/buttons/recipeButton.png"
        })

        Assets.addBundle("levelSceneAssets", {
            levelSceneTitle: "assets/levelScreen/levelSceneTitle.png",
            enabledLevel: "assets/levelScreen/enabledLevel.png",
            unenabledLevel: "assets/levelScreen/unenabledLevel.png",
            levelStar: "assets/levelScreen/levelStar.png",
        })

        Assets.addBundle("beltTileAssets", {
            startField: "assets/gameScreen/beltTiles/startField.png",
            moveField0: "assets/gameScreen/beltTiles/moveField0.png",
            moveField1: "assets/gameScreen/beltTiles/moveField1.png",
            endField: "assets/gameScreen/beltTiles/endField.png",
            goodFieldOverlay: "assets/gameScreen/beltTiles/goodFieldOverlay.png",
            badFieldOverlay: "assets/gameScreen/beltTiles/badFieldOverlay.png"
        })

        Assets.addBundle("ingredients", {
            cream: "assets/gameScreen/ingredients/cream.png"
        })

        Assets.addBundle("machines", {
            small_1x1: "assets/gameScreen/machines/1x1_small.png",
            small_1x2: "assets/gameScreen/machines/1x2_small.png",
            small_1x3: "assets/gameScreen/machines/1x3_small.png",
            small_2x1: "assets/gameScreen/machines/2x1_small.png",
            small_2x2: "assets/gameScreen/machines/2x2_small.png",
            small_2x3: "assets/gameScreen/machines/2x3_small.png",
            small_3x1: "assets/gameScreen/machines/3x1_small.png",
            small_3x2: "assets/gameScreen/machines/3x2_small.png",
            small_3x3: "assets/gameScreen/machines/3x3_small.png",
            big_1x1: "assets/gameScreen/machines/1x1_big.png",
            big_1x2: "assets/gameScreen/machines/1x2_big.png",
            big_1x3: "assets/gameScreen/machines/1x3_big.png",
            big_2x1: "assets/gameScreen/machines/2x1_big.png",
            big_2x2: "assets/gameScreen/machines/2x2_big.png",
            big_2x3: "assets/gameScreen/machines/2x3_big.png",
            big_3x1: "assets/gameScreen/machines/3x1_big.png",
            big_3x2: "assets/gameScreen/machines/3x2_big.png",
            big_3x3: "assets/gameScreen/machines/3x3_big.png"
        })

        Assets.addBundle("machineIcons", {
            iconSlot: "assets/gameScreen/machines/machineIcons/machineIconHolder.png",
            menuRect: "assets/gameScreen/machines/machineIcons/menuRect.png",
            menuSpike: "assets/gameScreen/machines/machineIcons/menuSpike.png",
            color: "assets/gameScreen/machines/machineIcons/color.png",
            taste: "assets/gameScreen/machines/machineIcons/taste.png",
            consistence: "assets/gameScreen/machines/machineIcons/consistence.png",
            white: "assets/gameScreen/machines/machineIcons/white.png",
            red: "assets/gameScreen/machines/machineIcons/red.png",
            yellow: "assets/gameScreen/machines/machineIcons/yellow.png",
            brown: "assets/gameScreen/machines/machineIcons/brown.png",
            neutral: "assets/gameScreen/machines/machineIcons/neutral.png",
            sweet: "assets/gameScreen/machines/machineIcons/sweet.png",
            sour: "assets/gameScreen/machines/machineIcons/sour.png",
            savoury: "assets/gameScreen/machines/machineIcons/savoury.png",
            sticky: "assets/gameScreen/machines/machineIcons/sticky.png",
            liquid: "assets/gameScreen/machines/machineIcons/liquid.png",
            powdery: "assets/gameScreen/machines/machineIcons/powdery.png",
            solid: "assets/gameScreen/machines/machineIcons/solid.png",
        })

        Assets.addBundle("tooltipAssets", {
            tooltipRectangle: 'assets/gameScreen/tooltip/tooltipRect.png',
            tooltipSpike: 'assets/gameScreen/tooltip/tooltipTriangle.png'
        })
    }

    private prepareTooltipAssets(rawAssets: any): TooltipAssets {
        return {
            tooltipRectangle: rawAssets.tooltipRectangle,
            tooltipSpike: rawAssets.tooltipSpike
        }
    }

    private prepareStartSceneAssets(rawAssets: any): StartSceneAssets {
        return {
            torso: rawAssets.torso,
            backTorso: rawAssets.backTorso,
            head: rawAssets.head,
            eyes_closed: rawAssets.eyes_closed,
            eyes_open: rawAssets.eyes_open,
            left_arm_leaning: rawAssets.left_arm_leaning,
            left_arm_showing: rawAssets.left_arm_showing,
            right_arm_leaning: rawAssets.right_arm_leaning,
            backgroundPattern: rawAssets.backgroundPattern,
            startButton: rawAssets.startButton,
            pretitle: rawAssets.pretitle,
            titleLetters: [
                rawAssets.title_0, rawAssets.title_1, rawAssets.title_2, rawAssets.title_3,
                rawAssets.title_4, rawAssets.title_5, rawAssets.title_6, rawAssets.title_7,
                rawAssets.title_8, rawAssets.title_9, rawAssets.title_10, rawAssets.title_11,
                rawAssets.title_12, rawAssets.title_13, rawAssets.title_14
            ]
        }
    }

    private prepareGameSceneAssets(rawAssets: any): GameSceneAssets {
        return {
            emptyField: rawAssets.emptyField,
            machineOuterGrid: rawAssets.machineOuterGrid,
            recipeBox: rawAssets.recipeBox,
            backButton: rawAssets.backButton,
            muteButton: rawAssets.muteButton,
            soundButton: rawAssets.soundButton,
            recipeButton: rawAssets.recipeButton
        }
    }

    private prepareBeltTileAssets(rawBeltTileAssets: any): BeltTileAssets {
        return {
            startField: rawBeltTileAssets.startField,
            moveFields: [rawBeltTileAssets.moveField0, rawBeltTileAssets.moveField1],
            endField: rawBeltTileAssets.endField,
            goodFieldOverlay: rawBeltTileAssets.goodFieldOverlay,
            badFieldOverlay: rawBeltTileAssets.badFieldOverlay
        }
    }

    private prepareMachineAssets(rawMachineAssets: any, rawMachineIconAssets: any): MachineAssets {
        return {
            big: {
                "1x1": rawMachineAssets.big_1x1,
                "1x2": rawMachineAssets.big_1x2,
                "1x3": rawMachineAssets.big_1x3,
                "2x1": rawMachineAssets.big_2x1,
                "2x2": rawMachineAssets.big_2x2,
                "2x3": rawMachineAssets.big_2x3,
                "3x1": rawMachineAssets.big_3x1,
                "3x2": rawMachineAssets.big_3x2,
                "3x3": rawMachineAssets.big_3x3
            },
            small: {
                "1x1": rawMachineAssets.small_1x1,
                "1x2": rawMachineAssets.small_1x2,
                "1x3": rawMachineAssets.small_1x3,
                "2x1": rawMachineAssets.small_2x1,
                "2x2": rawMachineAssets.small_2x2,
                "2x3": rawMachineAssets.small_2x3,
                "3x1": rawMachineAssets.small_3x1,
                "3x2": rawMachineAssets.small_3x2,
                "3x3": rawMachineAssets.small_3x3
            },
            categoryIcons: {
                color: rawMachineIconAssets.color,
                taste: rawMachineIconAssets.taste,
                consistence: rawMachineIconAssets.consistence,
            },
            typeIcons: {
                white: rawMachineIconAssets.white,
                red: rawMachineIconAssets.red,
                yellow: rawMachineIconAssets.yellow,
                brown: rawMachineIconAssets.brown,
                neutral: rawMachineIconAssets.neutral,
                sweet: rawMachineIconAssets.sweet,
                sour: rawMachineIconAssets.sour,
                savoury: rawMachineIconAssets.savoury,
                sticky: rawMachineIconAssets.sticky,
                liquid: rawMachineIconAssets.liquid,
                powdery: rawMachineIconAssets.powdery,
                solid: rawMachineIconAssets.solid
            },
            typeIconSlot: rawMachineIconAssets.iconSlot,
            menuRect: rawMachineIconAssets.menuRect,
            menuSpike: rawMachineIconAssets.menuSpike
        }
    }

    private prepareLevelSceneAssets(rawLevelSceneAssets: any): LevelSceneAssets {
        return {
            levelSceneTitle: rawLevelSceneAssets.levelSceneTitle,
            enabledLevel: rawLevelSceneAssets.enabledLevel,
            unenabledLevel: rawLevelSceneAssets.unenabledLevel,
            levelStar: rawLevelSceneAssets.levelStar,
        }
    }

    private prepareIngredientAssets(rawIngredientAssets: any): IngredientAssets {
        return {
            textures: {
                "cream": rawIngredientAssets.cream,
                "milk":rawIngredientAssets.cream,
                "flour":rawIngredientAssets.cream,
                "cabbage":rawIngredientAssets.cream,
                "butter":rawIngredientAssets.cream,
                "melted_butter":rawIngredientAssets.cream,
                "cornflour":rawIngredientAssets.cream,
                "cornflakes":rawIngredientAssets.cream,
                "beet_pudding":rawIngredientAssets.cream,
                "beet_juice":rawIngredientAssets.cream,
                "beet_flour":rawIngredientAssets.cream,
                "beet":rawIngredientAssets.cream,
                "mud":rawIngredientAssets.cream,
                "swamp_water":rawIngredientAssets.cream,
                "dry_dirt":rawIngredientAssets.cream,
                "dirt":rawIngredientAssets.cream,
                "sweetened_cream":rawIngredientAssets.cream,
                "sweetened_milk":rawIngredientAssets.cream,
                "sugar":rawIngredientAssets.cream,
                "marzipan":rawIngredientAssets.cream,
                "honey":rawIngredientAssets.cream,
                "vanilla_milk":rawIngredientAssets.cream,
                "vanilla_sugar":rawIngredientAssets.cream,
                "honey_comb":rawIngredientAssets.cream,
                "jam":rawIngredientAssets.cream,
                "cherry_sauce":rawIngredientAssets.cream,
                "cherry_sugar":rawIngredientAssets.cream,
                "cherries":rawIngredientAssets.cream,
                "chocolate_pudding":rawIngredientAssets.cream,
                "melted_chocolate":rawIngredientAssets.cream,
                "brown_sugar":rawIngredientAssets.cream,
                "raisins":rawIngredientAssets.cream,
                "lemon_cream":rawIngredientAssets.cream,
                "expired_milk":rawIngredientAssets.cream,
                "lemon_concentrate":rawIngredientAssets.cream,
                "old_lemon_candy":rawIngredientAssets.cream,
                "lemon_pudding":rawIngredientAssets.cream,
                "lemon_juice":rawIngredientAssets.cream,
                "lemon_sugar":rawIngredientAssets.cream,
                "candied_lemon_peel":rawIngredientAssets.cream,
                "currant_pudding":rawIngredientAssets.cream,
                "currant_juice":rawIngredientAssets.cream,
                "currant_sugar":rawIngredientAssets.cream,
                "currants":rawIngredientAssets.cream,
                "rotten_fruits":rawIngredientAssets.cream,
                "rotten_fruit_juice":rawIngredientAssets.cream,
                "grinded_umeboshi":rawIngredientAssets.cream,
                "umeboshi":rawIngredientAssets.cream,
                "nut_cream":rawIngredientAssets.cream,
                "nut_aroma":rawIngredientAssets.cream,
                "grinded_nuts":rawIngredientAssets.cream,
                "peeled_nuts":rawIngredientAssets.cream,
                "egg_yolk":rawIngredientAssets.cream,
                "egg":rawIngredientAssets.cream,
                "egg_powder":rawIngredientAssets.cream,
                "scrambled_egg":rawIngredientAssets.cream,
                "wine_cream":rawIngredientAssets.cream,
                "wine":rawIngredientAssets.cream,
                "spices":rawIngredientAssets.cream,
                "steak":rawIngredientAssets.cream,
                "nut_butter":rawIngredientAssets.cream,
                "rum":rawIngredientAssets.cream,
                "cocoa":rawIngredientAssets.cream,
                "nuts":rawIngredientAssets.cream
            }
        };
    }
}

export interface IngredientAssets {
    textures: {
        [keys in IngredientID]: Texture
    }
}

export interface TooltipAssets {
    tooltipRectangle: Texture,
    tooltipSpike: Texture
}

export interface BeltTileAssets {
    startField: Texture,
    moveFields: Texture[],
    endField: Texture,
    goodFieldOverlay: Texture,
    badFieldOverlay: Texture
}

export interface MachineAssets {
    big: {
        [keys in MachineShape]: Texture
    },
    small: {
        [keys in MachineShape]: Texture
    },
    categoryIcons: {
        color: Texture,
        consistence: Texture,
        taste: Texture
    }
    typeIcons: {
        [keys in MachineType]: Texture
    },
    typeIconSlot: Texture,
    menuRect: Texture,
    menuSpike: Texture
}

export interface StartSceneAssets {
    torso: Texture,
    backTorso: Texture,
    head: Texture,
    eyes_closed: Texture,
    eyes_open: Texture,
    left_arm_leaning: Texture,
    left_arm_showing: Texture,
    right_arm_leaning: Texture,
    backgroundPattern: Texture,
    pretitle: Texture,
    startButton: Texture,
    titleLetters: Texture[]
}

export interface LevelSceneAssets {
    levelSceneTitle: Texture,
    enabledLevel: Texture,
    unenabledLevel: Texture
    levelStar: Texture,
}

export interface GameSceneAssets {
    emptyField: Texture,
    machineOuterGrid: Texture,
    recipeBox: Texture,
    backButton: Texture,
    muteButton: Texture,
    soundButton: Texture,
    recipeButton: Texture
}