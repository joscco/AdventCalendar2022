import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";
import {MachineShape, MachineType} from "./gameobjects/Machinery/Machine";
import {IngredientID} from "./gameobjects/Ingredient";
import {RECIPES} from "./gameobjects/RecipeBox";

export class AssetStore {
    START_SCENE?: StartSceneAssets
    LEVEL_SCENE?: LevelSceneAssets
    GAME_SCENE?: GameSceneAssets
    MAIN_FONT?: FontFace
    MACHINES?: MachineAssets
    BELT_TILES?: BeltTileAssets
    TOOLTIP?: TooltipAssets
    INGREDIENTS?: IngredientAssets
    COOKIES?: CookieAssets

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
        this.COOKIES = this.prepareCookieAssets(await Assets.loadBundle("cookies"))
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
            recipeButton: "assets/gameScreen/buttons/recipeButton.png",
            winScreen:"assets/gameScreen/winScreen/background.png",
            winScreenBanner: "assets/gameScreen/winScreen/banner.png",
        })

        Assets.addBundle("levelSceneAssets", {
            levelSceneTitle: "assets/levelScreen/levelSceneTitle.png",
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
            whiteIngredient: "assets/gameScreen/ingredients/whiteIngredient.png",
            yellowIngredient: "assets/gameScreen/ingredients/yellowIngredient.png",
            redIngredient: "assets/gameScreen/ingredients/redIngredient.png",
            brownIngredient: "assets/gameScreen/ingredients/brownIngredient.png",

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

        Assets.addBundle("cookies", {
            SANTAMILK: "assets/gameScreen/cookies/santamilk.png",
            SCHOKOCROSSIES: "assets/gameScreen/cookies/schokocrossies.png",
            MUERBETEIGKEKSE: "assets/gameScreen/cookies/muerbeteigkekse.png",
            RUMKUGELN: "assets/gameScreen/cookies/rumkugeln.png",
            PUNSCH: "assets/gameScreen/cookies/punsch.png",
            BETHMAENNCHEN: "assets/gameScreen/cookies/bethmaennchen.png",
            ZIMTSTERNE: "assets/gameScreen/cookies/zimtsterne.png",
            PRINTEN: "assets/gameScreen/cookies/printen.png",
            ENGELSAUGEN: "assets/gameScreen/cookies/engelsaugen.png",
            VANILLEKIPFERL: "assets/gameScreen/cookies/vanillekipferl.png",
            MAKRONEN: "assets/gameScreen/cookies/makronen.png",
            FLORENTINER: "assets/gameScreen/cookies/florentiner.png",
            SPRITZGEBAECK: "assets/gameScreen/cookies/spritzgebaeck.png",
            LEBKUCHEN: "assets/gameScreen/cookies/lebkuchen.png",
            SPEKULATIUS: "assets/gameScreen/cookies/spekulatius.png",
            PFEFFERNUESSE: "assets/gameScreen/cookies/pfeffernuss.png",
            PANETTONE: "assets/gameScreen/cookies/panettone.png",
            SCHWARZWEISSKEKSE: "assets/gameScreen/cookies/schwarzweissgebaeck.png",
            STOLLEN: "assets/gameScreen/cookies/stollen.png",
            SCHOKOLADENBROT: "assets/gameScreen/cookies/schokoladenbrot.png",
            NUSSECKEN: "assets/gameScreen/cookies/nussecken.png",
            CORNFLAKEWALNUSSKEKSE: "assets/gameScreen/cookies/haferflockenwalnuss.png",
            BAERENTATZEN: "assets/gameScreen/cookies/baerentatzen.png",
            DOMINOSTEINE: "assets/gameScreen/cookies/dominosteine.png",
            open_eyes: "assets/gameScreen/cookies/eyes.png",
            closed_eyes: "assets/gameScreen/cookies/closed_eyes.png"
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
            recipeButton: rawAssets.recipeButton,
            winScreen: rawAssets.winScreen,
            winScreenBanner: rawAssets.winScreenBanner
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
            levelStar: rawLevelSceneAssets.levelStar,
        }
    }

    private prepareIngredientAssets(rawIngredientAssets: any): IngredientAssets {
        return {
            textures: {
                "cream": rawIngredientAssets.whiteIngredient,
                "milk": rawIngredientAssets.whiteIngredient,
                "flour": rawIngredientAssets.whiteIngredient,
                "cabbage": rawIngredientAssets.whiteIngredient,
                "butter": rawIngredientAssets.yellowIngredient,
                "melted_butter": rawIngredientAssets.yellowIngredient,
                "cornflour": rawIngredientAssets.yellowIngredient,
                "cornflakes": rawIngredientAssets.yellowIngredient,
                "beet_pudding": rawIngredientAssets.redIngredient,
                "beet_juice": rawIngredientAssets.redIngredient,
                "beet_flour": rawIngredientAssets.redIngredient,
                "beet": rawIngredientAssets.redIngredient,
                "mud": rawIngredientAssets.brownIngredient,
                "swamp_water": rawIngredientAssets.brownIngredient,
                "dry_dirt": rawIngredientAssets.brownIngredient,
                "dirt": rawIngredientAssets.brownIngredient,
                "sweetened_cream": rawIngredientAssets.whiteIngredient,
                "sweetened_milk": rawIngredientAssets.whiteIngredient,
                "sugar": rawIngredientAssets.whiteIngredient,
                "marzipan": rawIngredientAssets.whiteIngredient,
                "honey": rawIngredientAssets.whiteIngredient,
                "vanilla_milk": rawIngredientAssets.whiteIngredient,
                "vanilla_sugar": rawIngredientAssets.whiteIngredient,
                "honey_comb": rawIngredientAssets.whiteIngredient,
                "cherry_jam": rawIngredientAssets.whiteIngredient,
                "cherry_sauce": rawIngredientAssets.whiteIngredient,
                "cherry_sugar": rawIngredientAssets.whiteIngredient,
                "cherries": rawIngredientAssets.whiteIngredient,
                "chocolate_pudding": rawIngredientAssets.whiteIngredient,
                "melted_chocolate": rawIngredientAssets.whiteIngredient,
                "brown_sugar": rawIngredientAssets.whiteIngredient,
                "raisins": rawIngredientAssets.whiteIngredient,
                "lemon_cream": rawIngredientAssets.whiteIngredient,
                "expired_milk": rawIngredientAssets.whiteIngredient,
                "lemon_concentrate": rawIngredientAssets.whiteIngredient,
                "old_lemon_candy": rawIngredientAssets.whiteIngredient,
                "lemon_pudding": rawIngredientAssets.whiteIngredient,
                "lemon_juice": rawIngredientAssets.whiteIngredient,
                "lemon_sugar": rawIngredientAssets.whiteIngredient,
                "candied_lemon_peel": rawIngredientAssets.whiteIngredient,
                "currant_pudding": rawIngredientAssets.whiteIngredient,
                "currant_juice": rawIngredientAssets.whiteIngredient,
                "currant_sugar": rawIngredientAssets.whiteIngredient,
                "currants": rawIngredientAssets.whiteIngredient,
                "rotten_fruits": rawIngredientAssets.whiteIngredient,
                "rotten_fruit_juice": rawIngredientAssets.whiteIngredient,
                "grinded_umeboshi": rawIngredientAssets.whiteIngredient,
                "umeboshi": rawIngredientAssets.whiteIngredient,
                "nut_cream": rawIngredientAssets.whiteIngredient,
                "nut_aroma": rawIngredientAssets.whiteIngredient,
                "grinded_nuts": rawIngredientAssets.whiteIngredient,
                "peeled_nuts": rawIngredientAssets.whiteIngredient,
                "egg_yolk": rawIngredientAssets.whiteIngredient,
                "egg": rawIngredientAssets.whiteIngredient,
                "egg_powder": rawIngredientAssets.whiteIngredient,
                "scrambled_egg": rawIngredientAssets.whiteIngredient,
                "wine_cream": rawIngredientAssets.whiteIngredient,
                "wine": rawIngredientAssets.whiteIngredient,
                "spices": rawIngredientAssets.whiteIngredient,
                "steak": rawIngredientAssets.whiteIngredient,
                "nut_butter": rawIngredientAssets.whiteIngredient,
                "rum_aroma": rawIngredientAssets.whiteIngredient,
                "cocoa": rawIngredientAssets.whiteIngredient,
                "nuts": rawIngredientAssets.whiteIngredient
            }
        };
    }

    private prepareCookieAssets(rawAssets: any): CookieAssets {
        return {
            SANTAMILK: rawAssets.SANTAMILK,
            SCHOKOCROSSIES: rawAssets.SCHOKOCROSSIES,
            MUERBETEIGKEKSE: rawAssets.MUERBETEIGKEKSE,
            RUMKUGELN: rawAssets.RUMKUGELN,
            PUNSCH: rawAssets.PUNSCH,
            BETHMAENNCHEN: rawAssets.BETHMAENNCHEN,
            ZIMTSTERNE: rawAssets.ZIMTSTERNE,
            PRINTEN: rawAssets.PRINTEN,
            ENGELSAUGEN: rawAssets.ENGELSAUGEN,
            VANILLEKIPFERL: rawAssets.VANILLEKIPFERL,
            MAKRONEN: rawAssets.MAKRONEN,
            FLORENTINER: rawAssets.FLORENTINER,
            SPRITZGEBAECK: rawAssets.SPRITZGEBAECK,
            LEBKUCHEN: rawAssets.LEBKUCHEN,
            SPEKULATIUS: rawAssets.SPEKULATIUS,
            PFEFFERNUESSE: rawAssets.PFEFFERNUESSE,
            PANETTONE: rawAssets.PANETTONE,
            SCHWARZWEISSKEKSE: rawAssets.SCHWARZWEISSKEKSE,
            STOLLEN: rawAssets.STOLLEN,
            SCHOKOLADENBROT: rawAssets.SCHOKOLADENBROT,
            NUSSECKEN: rawAssets.NUSSECKEN,
            CORNFLAKEWALNUSSKEKSE: rawAssets.CORNFLAKEWALNUSSKEKSE,
            BAERENTATZEN: rawAssets.BAERENTATZEN,
            DOMINOSTEINE: rawAssets.DOMINOSTEINE,
            open_eyes: rawAssets.eyes_open,
            closed_eyes : rawAssets.eyes_closed
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
    levelStar: Texture,
}

export interface GameSceneAssets {
    emptyField: Texture,
    machineOuterGrid: Texture,
    recipeBox: Texture,
    backButton: Texture,
    muteButton: Texture,
    soundButton: Texture,
    recipeButton: Texture,
    winScreen: Texture,
    winScreenBanner: Texture
}

export type CookieAssets = {
    [key in keyof typeof RECIPES | "open_eyes" | "closed_eyes"]: Texture
}