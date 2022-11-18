import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";
import {App, SCENE_MANAGER} from "../index";
import {LoadingScene} from "../Scenes/LoadingScene";
import {Oven} from "../gameobjects/LoadingScene/Oven";
import {Spritesheet} from "pixi.js";

export class AssetStore {
    private MAIN_FONT?: FontFace
    LOADING_SCENE_ASSETS?: LoadingSceneAssets
    private ASSETS?: Spritesheet[]

    loadingScene?: LoadingScene
    oven?: Oven;

    constructor() {
        this.addAssets()
    }

    getTextureAsset(id: string): Texture {
        let textureID = TEXTURE_MANIFEST[id]
        let sheet = this.ASSETS?.find(sheet => sheet.textures && sheet.textures[textureID])!
        if (!sheet) {
            return Texture.EMPTY
        }
        return sheet.textures[textureID]
    }

    private addAssets() {
        Assets.add("font", "assets/fonts/FuturaHandwritten.ttf")

        Assets.addBundle("loadingScreenAssets", {
            closedOven: "assets/loadingScreen/closedOven.png",
            openOven: "assets/loadingScreen/openOven.png",
            innerLoadingBar: "assets/loadingScreen/innerLoadingBar.png",
            outerLoadingBar: "assets/loadingScreen/outerLoadingBar.png",
            redder: "assets/loadingScreen/redder.png",
            steam: "assets/loadingScreen/steam.png",
        })
    }

    async startLoadingScreen() {
        this.MAIN_FONT = await Assets.load("font") as FontFace
        this.LOADING_SCENE_ASSETS = this.prepareLoadingSceneAssets(await Assets.loadBundle("loadingScreenAssets"))

        this.loadingScene = new LoadingScene(App)
        this.oven = this.loadingScene.oven
        SCENE_MANAGER.add("loadingScene", this.loadingScene)
    }

    private prepareLoadingSceneAssets(rawLoadingSceneAssets: any): LoadingSceneAssets {
        return {
            closedOven: rawLoadingSceneAssets.closedOven,
            openOven: rawLoadingSceneAssets.openOven,
            innerLoadingBar: rawLoadingSceneAssets.innerLoadingBar,
            outerLoadingBar: rawLoadingSceneAssets.outerLoadingBar,
            redder: rawLoadingSceneAssets.redder,
            steam: rawLoadingSceneAssets.steam
        }
    }

    async startLoadingOtherAssets() {
        let sheet0 = await Assets.load("assets/spritesheets/sheet-0.json")
        this.loadingScene!.setProgress(0.1)
        let sheet1 = await Assets.load("assets/spritesheets/sheet-1.json")
        this.loadingScene!.setProgress(0.2)
        let sheet2 = await Assets.load("assets/spritesheets/sheet-2.json")
        this.loadingScene!.setProgress(0.3)
        let sheet3 = await Assets.load("assets/spritesheets/sheet-3.json")
        this.loadingScene!.setProgress(0.5)
        let sheet4 = await Assets.load("assets/spritesheets/sheet-4.json")
        this.loadingScene!.setProgress(0.6)
        let sheet5 = await Assets.load("assets/spritesheets/sheet-5.json")
        this.loadingScene!.setProgress(0.7)
        let sheet6 = await Assets.load("assets/spritesheets/sheet-6.json")
        this.loadingScene!.setProgress(0.8)
        let sheet7 = await Assets.load("assets/spritesheets/sheet-7.json")
        this.loadingScene!.setProgress(0.9)
        this.ASSETS = [sheet0, sheet1, sheet2, sheet3, sheet4, sheet5, sheet6, sheet7]
        await this.oven!.open()
    }

    getTitleLetterTextures(): Texture[] {
        return [
            this.getTextureAsset("title_letter_0"),
            this.getTextureAsset("title_letter_1"),
            this.getTextureAsset("title_letter_2"),
            this.getTextureAsset("title_letter_3"),
            this.getTextureAsset("title_letter_4"),
            this.getTextureAsset("title_letter_5"),
            this.getTextureAsset("title_letter_6"),
            this.getTextureAsset("title_letter_7"),
            this.getTextureAsset("title_letter_8"),
            this.getTextureAsset("title_letter_9"),
            this.getTextureAsset("title_letter_10"),
            this.getTextureAsset("title_letter_11"),
            this.getTextureAsset("title_letter_12"),
            this.getTextureAsset("title_letter_13"),
            this.getTextureAsset("title_letter_14")
        ]
    }
}

const TEXTURE_MANIFEST: { [key: string]: string } = {
    // Dialog
    dialog_cross: "dialog/cross",
    dialog_box: "dialog/dialogBox",
    dialog_spike: "dialog/dialogSpike",
    dialog_next_button: "dialog/next",
    dialog_previous_button: "dialog/previous",

    // Belt Fields
    background: "gameScreen/background",
    startField: "gameScreen/beltTiles/startField",
    moveField0: "gameScreen/beltTiles/moveField0",
    moveField1: "gameScreen/beltTiles/moveField1",
    moveField2: "gameScreen/beltTiles/moveField2",
    endField: "gameScreen/beltTiles/endField",
    proceedButton: "gameScreen/beltTiles/proceedButton",
    goodFieldOverlay: "gameScreen/beltTiles/goodFieldOverlay",
    badFieldOverlay: "gameScreen/beltTiles/badFieldOverlay",
    machineInventory: "gameScreen/beltTiles/machineOuterGrid",
    emptyField: "gameScreen/beltTiles/emptyField",

    // Buttons
    backButton: "gameScreen/buttons/backButton",
    soundButton: "gameScreen/buttons/soundButton",
    noSoundButton: "gameScreen/buttons/noSoundButton",
    musicButton: "gameScreen/buttons/musicButton",
    noMusicButton: "gameScreen/buttons/noMusicButton",
    recipeButtonOpen: "gameScreen/buttons/recipeButtonOpen",
    recipeButtonClosed: "gameScreen/buttons/recipeButton",

    // Bernd
    bernd_torso: "startScreen/bernd/body_middle",
    bernd_back_torso: "startScreen/bernd/backBody",
    bernd_head: "startScreen/bernd/head",
    bernd_eyes_closed: "startScreen/bernd/closed_eyes",
    bernd_eyes_open: "startScreen/bernd/open_eyes",
    bernd_left_arm_leaning: "startScreen/bernd/leftArmLeaning",
    bernd_left_arm_showing: "startScreen/bernd/leftArmShowing",
    bernd_right_arm_leaning: "startScreen/bernd/rightArmLeaning",

    // Start Screen
    startScreenBackgroundPattern: "startScreen/backgroundPattern",
    startScreenBackgroundPatternBrown: "startScreen/backgroundPatternBrown",
    startScreenPretitle: "startScreen/pretitle",
    startScreenStartButton: "startScreen/startButton",

    // Title Letters
    title_letter_0: "startScreen/titleLetters/title0",
    title_letter_1: "startScreen/titleLetters/title1",
    title_letter_2: "startScreen/titleLetters/title2",
    title_letter_3: "startScreen/titleLetters/title3",
    title_letter_4: "startScreen/titleLetters/title4",
    title_letter_5: "startScreen/titleLetters/title5",
    title_letter_6: "startScreen/titleLetters/title6",
    title_letter_7: "startScreen/titleLetters/title7",
    title_letter_8: "startScreen/titleLetters/title8",
    title_letter_9: "startScreen/titleLetters/title9",
    title_letter_10: "startScreen/titleLetters/title10",
    title_letter_11: "startScreen/titleLetters/title11",
    title_letter_12: "startScreen/titleLetters/title12",
    title_letter_13: "startScreen/titleLetters/title13",
    title_letter_14: "startScreen/titleLetters/title14",

    // Recipe Box
    recipeBox: "gameScreen/recipeBox/recipeBox",
    recipeNameBanner: "gameScreen/recipeBox/recipeNameBanner",
    recipeLongStrike: "gameScreen/recipeBox/longstrike",

    // Cookie eyes
    openCookieEyes: "gameScreen/cookies/eyes/open_eyes",
    closedCookieEyes: "gameScreen/cookies/eyes/closed_eyes",

    // Cookies
    SANTAMILK: "gameScreen/cookies/santamilk",
    SCHOKOCROSSIES: "gameScreen/cookies/schokocrossies",
    MUERBETEIGKEKSE: "gameScreen/cookies/muerbeteigkekse",
    RUMKUGELN: "gameScreen/cookies/rumkugeln",
    PUNSCH: "gameScreen/cookies/punsch",
    BETHMAENNCHEN: "gameScreen/cookies/bethmaennchen",
    ZIMTSTERNE: "gameScreen/cookies/zimtsterne",
    PRINTEN: "gameScreen/cookies/printen",
    ENGELSAUGEN: "gameScreen/cookies/engelsaugen",
    VANILLEKIPFERL: "gameScreen/cookies/vanillekipferl",
    MAKRONEN: "gameScreen/cookies/makronen",
    FLORENTINER: "gameScreen/cookies/florentiner",
    SPRITZGEBAECK: "gameScreen/cookies/spritzgebaeck",
    LEBKUCHEN: "gameScreen/cookies/lebkuchen",
    SPEKULATIUS: "gameScreen/cookies/spekulatius",
    PFEFFERNUESSE: "gameScreen/cookies/pfeffernuss",
    PANETTONE: "gameScreen/cookies/panettone",
    SCHWARZWEISSKEKSE: "gameScreen/cookies/schwarzweissgebaeck",
    STOLLEN: "gameScreen/cookies/stollen",
    SCHOKOLADENBROT: "gameScreen/cookies/schokoladenbrot",
    NUSSECKEN: "gameScreen/cookies/nussecken",
    CORNFLAKEWALNUSSKEKSE: "gameScreen/cookies/haferflockenwalnuss",
    BAERENTATZEN: "gameScreen/cookies/baerentatzen",
    DOMINOSTEINE: "gameScreen/cookies/dominosteine",

    // Ingredient Overview
    ingredientOverviewBook: "gameScreen/ingredientOverview/book",
    ingredientOverviewPlus: "gameScreen/ingredientOverview/plus",
    ingredientOverviewArrow: "gameScreen/ingredientOverview/arrow",
    ingredientOverviewScrollFlag: "gameScreen/ingredientOverview/scrollFahne",
    ingredientOverviewScrollBar: "gameScreen/ingredientOverview/scrollLine",
    ingredientOverviewSeparator: "gameScreen/ingredientOverview/separator",
    ingredientOverviewAlarm: "gameScreen/ingredientOverview/unlockedIngredientAlarm",

    // Particle
    particle: "gameScreen/ingredients/particle",

    // Ingredients
    cream: "gameScreen/ingredients/big/cream",
    milk: "gameScreen/ingredients/big/milk",
    flour: "gameScreen/ingredients/big/flour",
    boiled_egg: "gameScreen/ingredients/big/boiled_egg",
    butter: "gameScreen/ingredients/big/butter",
    melted_butter: "gameScreen/ingredients/big/melted_butter",
    cornflour: "gameScreen/ingredients/big/cornflour",
    cornflakes: "gameScreen/ingredients/big/cornflakes",
    beet_pudding: "gameScreen/ingredients/big/beet_pudding",
    beet_juice: "gameScreen/ingredients/big/beet_juice",
    beet_flour: "gameScreen/ingredients/big/beet_flour",
    beet: "gameScreen/ingredients/big/beet",
    mud: "gameScreen/ingredients/big/mud",
    swamp_water: "gameScreen/ingredients/big/swamp_water",
    dry_dirt: "gameScreen/ingredients/big/dry_dirt",
    dirt: "gameScreen/ingredients/big/dirt",
    sweetened_cream: "gameScreen/ingredients/big/sweetened_cream",
    sweetened_milk: "gameScreen/ingredients/big/sweetened_milk",
    sugar: "gameScreen/ingredients/big/sugar",
    marzipan: "gameScreen/ingredients/big/marzipan",
    honey: "gameScreen/ingredients/big/honey",
    vanilla_milk: "gameScreen/ingredients/big/vanilla_milk",
    vanilla_sugar: "gameScreen/ingredients/big/vanilla_sugar",
    honey_comb: "gameScreen/ingredients/big/honeycomb",
    cherry_jam: "gameScreen/ingredients/big/cherry_jam",
    cherry_sauce: "gameScreen/ingredients/big/cherry_sauce",
    cherry_sugar: "gameScreen/ingredients/big/cherry_sugar",
    cherries: "gameScreen/ingredients/big/cherry",
    chocolate_pudding: "gameScreen/ingredients/big/chocolate_pudding",
    melted_chocolate: "gameScreen/ingredients/big/melted_chocolate",
    brown_sugar: "gameScreen/ingredients/big/brown_sugar",
    raisins: "gameScreen/ingredients/big/raisins",
    lemon_cream: "gameScreen/ingredients/big/lemon_cream",
    lemon_aroma: "gameScreen/ingredients/big/lemon_aroma",
    lemon_sugar: "gameScreen/ingredients/big/lemon_sugar",
    old_lemon_candy: "gameScreen/ingredients/big/old_lemon_candy",
    lemon_pudding: "gameScreen/ingredients/big/lemon_pudding",
    lemon_juice: "gameScreen/ingredients/big/lemon_juice",
    lemon_powder: "gameScreen/ingredients/big/lemon_powder",
    candied_lemon_peel: "gameScreen/ingredients/big/candied_lemon_peel",
    currant_pudding: "gameScreen/ingredients/big/currant_pudding",
    currant_juice: "gameScreen/ingredients/big/currant_juice",
    currant_sugar: "gameScreen/ingredients/big/currant_sugar",
    currants: "gameScreen/ingredients/big/currant",
    rotten_fruits: "gameScreen/ingredients/big/rotten_fruit",
    rotten_fruit_juice: "gameScreen/ingredients/big/rotten_fruit_juice",
    grinded_umeboshi: "gameScreen/ingredients/big/grinded_umeboshi",
    umeboshi: "gameScreen/ingredients/big/umeboshi",
    nut_cream: "gameScreen/ingredients/big/nut_butter",
    nut_aroma: "gameScreen/ingredients/big/nut_aroma",
    grinded_nuts: "gameScreen/ingredients/big/grinded_nuts",
    peeled_nuts: "gameScreen/ingredients/big/peeled_nuts",
    egg: "gameScreen/ingredients/big/egg",
    eggnog: "gameScreen/ingredients/big/eggnog",
    egg_powder: "gameScreen/ingredients/big/egg_powder",
    scrambled_egg: "gameScreen/ingredients/big/scrambled_egg",
    wine_cream: "gameScreen/ingredients/big/wine_cream",
    wine: "gameScreen/ingredients/big/wine",
    spices: "gameScreen/ingredients/big/spices",
    steak: "gameScreen/ingredients/big/steak",
    nut_butter: "gameScreen/ingredients/big/nut_cream",
    rum_aroma: "gameScreen/ingredients/big/rum_aroma",
    cocoa: "gameScreen/ingredients/big/cocoa",
    nuts: "gameScreen/ingredients/big/nuts",

    // Ingredients
    small_cream: "gameScreen/ingredients/small/cream",
    small_milk: "gameScreen/ingredients/small/milk",
    small_flour: "gameScreen/ingredients/small/flour",
    small_boiled_egg: "gameScreen/ingredients/small/boiled_egg",
    small_butter: "gameScreen/ingredients/small/butter",
    small_melted_butter: "gameScreen/ingredients/small/melted_butter",
    small_cornflour: "gameScreen/ingredients/small/cornflour",
    small_cornflakes: "gameScreen/ingredients/small/cornflakes",
    small_beet_pudding: "gameScreen/ingredients/small/beet_pudding",
    small_beet_juice: "gameScreen/ingredients/small/beet_juice",
    small_beet_flour: "gameScreen/ingredients/small/beet_flour",
    small_beet: "gameScreen/ingredients/small/beet",
    small_mud: "gameScreen/ingredients/small/mud",
    small_swamp_water: "gameScreen/ingredients/small/swamp_water",
    small_dry_dirt: "gameScreen/ingredients/small/dry_dirt",
    small_dirt: "gameScreen/ingredients/small/dirt",
    small_sweetened_cream: "gameScreen/ingredients/small/sweetened_cream",
    small_sweetened_milk: "gameScreen/ingredients/small/sweetened_milk",
    small_sugar: "gameScreen/ingredients/small/sugar",
    small_marzipan: "gameScreen/ingredients/small/marzipan",
    small_honey: "gameScreen/ingredients/small/honey",
    small_vanilla_milk: "gameScreen/ingredients/small/vanilla_milk",
    small_vanilla_sugar: "gameScreen/ingredients/small/vanilla_sugar",
    small_honey_comb: "gameScreen/ingredients/small/honeycomb",
    small_cherry_jam: "gameScreen/ingredients/small/cherry_jam",
    small_cherry_sauce: "gameScreen/ingredients/small/cherry_sauce",
    small_cherry_sugar: "gameScreen/ingredients/small/cherry_sugar",
    small_cherries: "gameScreen/ingredients/small/cherry",
    small_chocolate_pudding: "gameScreen/ingredients/small/chocolate_pudding",
    small_melted_chocolate: "gameScreen/ingredients/small/melted_chocolate",
    small_brown_sugar: "gameScreen/ingredients/small/brown_sugar",
    small_raisins: "gameScreen/ingredients/small/raisins",
    small_lemon_cream: "gameScreen/ingredients/small/lemon_cream",
    small_lemon_aroma: "gameScreen/ingredients/small/lemon_aroma",
    small_lemon_sugar: "gameScreen/ingredients/small/lemon_sugar",
    small_old_lemon_candy: "gameScreen/ingredients/small/old_lemon_candy",
    small_lemon_pudding: "gameScreen/ingredients/small/lemon_pudding",
    small_lemon_juice: "gameScreen/ingredients/small/lemon_juice",
    small_lemon_powder: "gameScreen/ingredients/small/lemon_powder",
    small_candied_lemon_peel: "gameScreen/ingredients/small/candied_lemon_peel",
    small_currant_pudding: "gameScreen/ingredients/small/currant_pudding",
    small_currant_juice: "gameScreen/ingredients/small/currant_juice",
    small_currant_sugar: "gameScreen/ingredients/small/currant_sugar",
    small_currants: "gameScreen/ingredients/small/currant",
    small_rotten_fruits: "gameScreen/ingredients/small/rotten_fruit",
    small_rotten_fruit_juice: "gameScreen/ingredients/small/rotten_fruit_juice",
    small_grinded_umeboshi: "gameScreen/ingredients/small/grinded_umeboshi",
    small_umeboshi: "gameScreen/ingredients/small/umeboshi",
    small_nut_cream: "gameScreen/ingredients/small/nut_cream",
    small_nut_aroma: "gameScreen/ingredients/small/nut_aroma",
    small_grinded_nuts: "gameScreen/ingredients/small/grinded_nuts",
    small_peeled_nuts: "gameScreen/ingredients/small/peeled_nuts",
    small_egg: "gameScreen/ingredients/small/egg",
    small_eggnog: "gameScreen/ingredients/small/eggnog",
    small_egg_powder: "gameScreen/ingredients/small/egg_powder",
    small_scrambled_egg: "gameScreen/ingredients/small/scrambled_egg",
    small_wine_cream: "gameScreen/ingredients/small/wine_cream",
    small_wine: "gameScreen/ingredients/small/wine",
    small_spices: "gameScreen/ingredients/small/spices",
    small_steak: "gameScreen/ingredients/small/steak",
    small_nut_butter: "gameScreen/ingredients/small/nut_butter",
    small_rum_aroma: "gameScreen/ingredients/small/rum_aroma",
    small_cocoa: "gameScreen/ingredients/small/cocoa",
    small_nuts: "gameScreen/ingredients/small/nuts",

    // Machines
    machine_1x1: "gameScreen/machines/1x1_big",
    machine_1x2: "gameScreen/machines/1x2_big",
    machine_1x3: "gameScreen/machines/1x3_big",
    machine_2x1: "gameScreen/machines/2x1_big",
    machine_2x2: "gameScreen/machines/2x2_big",
    machine_2x3: "gameScreen/machines/2x3_big",
    machine_3x1: "gameScreen/machines/3x1_big",
    machine_3x2: "gameScreen/machines/3x2_big",
    machine_3x3: "gameScreen/machines/3x3_big",
    
    // Chains
    
    chain_1x1: "gameScreen/chains/1x1_chains",
    chain_1x2: "gameScreen/chains/1x2_chains",
    chain_1x3: "gameScreen/chains/1x3_chains",
    chain_2x1: "gameScreen/chains/2x1_chains",
    chain_2x2: "gameScreen/chains/2x2_chains",
    chain_2x3: "gameScreen/chains/2x3_chains",
    chain_3x1: "gameScreen/chains/3x1_chains",
    chain_3x2: "gameScreen/chains/3x2_chains",
    chain_3x3: "gameScreen/chains/3x3_chains",

    cage: "gameScreen/beltTiles/cage",

    // Blocks
    block_1x1: "gameScreen/blocks/1x1_block",
    block_1x2: "gameScreen/blocks/1x2_block",
    block_1x3: "gameScreen/blocks/1x3_block",
    block_2x1: "gameScreen/blocks/2x1_block",
    block_2x2: "gameScreen/blocks/2x2_block",
    block_2x3: "gameScreen/blocks/2x3_block",
    block_3x1: "gameScreen/blocks/3x1_block",
    block_3x2: "gameScreen/blocks/3x2_block",
    block_3x3: "gameScreen/blocks/3x3_block",

    // Icon Menu for Machines
    machineIconSlot: "gameScreen/machineIcons/machineIconHolder",
    machineIconMenuRect: "gameScreen/machineIcons/menuRect",
    machineIconMenuSpike: "gameScreen/machineIcons/menuSpike",

    // Icons
    white: "gameScreen/machineIcons/white",
    red: "gameScreen/machineIcons/red",
    yellow: "gameScreen/machineIcons/yellow",
    brown: "gameScreen/machineIcons/brown",
    neutral: "gameScreen/machineIcons/neutral",
    sweet: "gameScreen/machineIcons/sweet",
    sour: "gameScreen/machineIcons/sour",
    savoury: "gameScreen/machineIcons/savoury",
    sticky: "gameScreen/machineIcons/sticky",
    liquid: "gameScreen/machineIcons/liquid",
    powdery: "gameScreen/machineIcons/powdery",
    solid: "gameScreen/machineIcons/solid",
    
    // Lock Symbol
    lockSymbol: "gameScreen/machineIcons/lockSymbol",

    // Tooltips
    tooltipRectangle: 'gameScreen/tooltip/tooltipRect',
    tooltipSpike: 'gameScreen/tooltip/tooltipTriangle',

    // WinScreen Stuff
    winScreenBackground: "gameScreen/winScreen/background",
    winScreenBanner: "gameScreen/winScreen/banner",
    winScreenBackToLevelsButton: "gameScreen/winScreen/backToLevelsButton",
    winScreenNextLevelButton: "gameScreen/winScreen/nextLevelButton",
    angel1Body: "gameScreen/winScreen/angel1/body",
    angel1LeftWing: "gameScreen/winScreen/angel1/leftWing",
    angel1Legs: "gameScreen/winScreen/angel1/legs",
    angel1RightWing: "gameScreen/winScreen/angel1/rightWing",
    angel2Body: "gameScreen/winScreen/angel2/body",
    angel2LeftWing: "gameScreen/winScreen/angel2/wingLeft",
    angel2Legs: "gameScreen/winScreen/angel2/legs",
    angel2RightWing: "gameScreen/winScreen/angel2/wingRight",
    angel2LeftArm: "gameScreen/winScreen/angel2/harp",
    angel2RightArm: "gameScreen/winScreen/angel2/armRight",
    sparkle1: "gameScreen/winScreen/sparkle1",
    sparkle2: "gameScreen/winScreen/sparkle2",
    sparkle3: "gameScreen/winScreen/sparkle3",
    sparkle4: "gameScreen/winScreen/sparkle4",
}

export type TextureAssetID = keyof typeof TEXTURE_MANIFEST

export interface LoadingSceneAssets {
    closedOven: Texture,
    openOven: Texture,
    innerLoadingBar: Texture,
    outerLoadingBar: Texture,
    redder: Texture,
    steam: Texture
}