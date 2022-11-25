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

    getTextureAssets(...ids: string[]): Texture[] {
        return ids.map(id => this.getTextureAsset(id))
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
        let numberSheets = 5
        Assets.loader.reset()
        this.ASSETS = []
        for (let i = 0; i < numberSheets; i++) {
            let sheet = await Assets.load(`assets/spritesheets/sheet-${i}.json`)
            this.loadingScene!.setProgress((i + 1) / numberSheets)
            this.ASSETS.push(sheet)
        }

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
    dialog_understood_button: "dialog/understoodButton",
    dialog_pointer_hand: "dialog/pointerHand",

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

    // BerndButton
    bernd_button_head: "gameScreen/berndButton/small_head",
    bernd_button_eyes_closed: "gameScreen/berndButton/eyes_closed",
    bernd_button_eyes_open: "gameScreen/berndButton/eyes_open",

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
    underlayCookieEyes: "gameScreen/cookies/eyes/eye_underlay",

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
    cream: "gameScreen/ingredients/cream",
    milk: "gameScreen/ingredients/milk",
    flour: "gameScreen/ingredients/flour",
    boiled_egg: "gameScreen/ingredients/boiled_egg",
    butter: "gameScreen/ingredients/butter",
    melted_butter: "gameScreen/ingredients/melted_butter",
    cornflour: "gameScreen/ingredients/cornflour",
    cornflakes: "gameScreen/ingredients/cornflakes",
    beet_pudding: "gameScreen/ingredients/beet_pudding",
    beet_juice: "gameScreen/ingredients/beet_juice",
    beet_flour: "gameScreen/ingredients/beet_flour",
    beet: "gameScreen/ingredients/beet",
    mud: "gameScreen/ingredients/mud",
    swamp_water: "gameScreen/ingredients/swamp_water",
    dry_dirt: "gameScreen/ingredients/dry_dirt",
    dirt: "gameScreen/ingredients/dirt",
    sweetened_cream: "gameScreen/ingredients/sweetened_cream",
    sweetened_milk: "gameScreen/ingredients/sweetened_milk",
    sugar: "gameScreen/ingredients/sugar",
    marzipan: "gameScreen/ingredients/marzipan",
    honey: "gameScreen/ingredients/honey",
    vanilla_milk: "gameScreen/ingredients/vanilla_milk",
    vanilla_sugar: "gameScreen/ingredients/vanilla_sugar",
    honey_comb: "gameScreen/ingredients/honeycomb",
    cherry_jam: "gameScreen/ingredients/cherry_jam",
    cherry_sauce: "gameScreen/ingredients/cherry_sauce",
    cherry_sugar: "gameScreen/ingredients/cherry_sugar",
    cherries: "gameScreen/ingredients/cherry",
    chocolate_pudding: "gameScreen/ingredients/chocolate_pudding",
    melted_chocolate: "gameScreen/ingredients/melted_chocolate",
    brown_sugar: "gameScreen/ingredients/brown_sugar",
    raisins: "gameScreen/ingredients/raisins",
    lemon_cream: "gameScreen/ingredients/lemon_cream",
    lemon_aroma: "gameScreen/ingredients/lemon_aroma",
    lemon_sugar: "gameScreen/ingredients/lemon_sugar",
    old_lemon_candy: "gameScreen/ingredients/old_lemon_candy",
    lemon_pudding: "gameScreen/ingredients/lemon_pudding",
    lemon_juice: "gameScreen/ingredients/lemon_juice",
    lemon_powder: "gameScreen/ingredients/lemon_powder",
    candied_lemon_peel: "gameScreen/ingredients/candied_lemon_peel",
    currant_pudding: "gameScreen/ingredients/currant_pudding",
    currant_juice: "gameScreen/ingredients/currant_juice",
    currant_sugar: "gameScreen/ingredients/currant_sugar",
    currants: "gameScreen/ingredients/currant",
    rotten_fruits: "gameScreen/ingredients/rotten_fruit",
    rotten_fruit_juice: "gameScreen/ingredients/rotten_fruit_juice",
    ground_umeboshi: "gameScreen/ingredients/grinded_umeboshi",
    umeboshi: "gameScreen/ingredients/umeboshi",
    nut_cream: "gameScreen/ingredients/nut_cream",
    nut_aroma: "gameScreen/ingredients/nut_aroma",
    ground_nuts: "gameScreen/ingredients/grinded_nuts",
    peeled_nuts: "gameScreen/ingredients/peeled_nuts",
    egg: "gameScreen/ingredients/egg",
    eggnog: "gameScreen/ingredients/eggnog",
    egg_powder: "gameScreen/ingredients/egg_powder",
    scrambled_egg: "gameScreen/ingredients/scrambled_egg",
    wine_cream: "gameScreen/ingredients/wine_cream",
    wine: "gameScreen/ingredients/wine",
    spices: "gameScreen/ingredients/spices",
    steak: "gameScreen/ingredients/steak",
    nut_butter: "gameScreen/ingredients/nut_butter",
    rum_aroma: "gameScreen/ingredients/rum_aroma",
    cocoa: "gameScreen/ingredients/cocoa",
    nuts: "gameScreen/ingredients/nuts",

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