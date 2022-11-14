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
        this.loadingScene!.setProgress(0.9)
        let sheet7 = await Assets.load("assets/spritesheets/sheet-7.json")
        this.loadingScene!.setProgress(1)
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
    dialog_cross: "cross.png",
    dialog_box: "dialogBox.png",
    dialog_spike: "dialogSpike.png",
    dialog_next_button: "next.png",
    dialog_previous_button: "previous.png",

    // Belt Fields
    background: "background.png",
    startField: "beltTiles/startField.png",
    moveField0: "beltTiles/moveField0.png",
    moveField1: "beltTiles/moveField1.png",
    moveField2: "beltTiles/moveField2.png",
    endField: "beltTiles/endField.png",
    proceedButton: "beltTiles/proceedButton.png",
    goodFieldOverlay: "beltTiles/goodFieldOverlay.png",
    badFieldOverlay: "beltTiles/badFieldOverlay.png",
    machineInventory: "beltTiles/machineOuterGrid.png",
    emptyField: "beltTiles/emptyField.png",

    // Buttons
    backButton: "buttons/backButton.png",
    soundButton: "buttons/soundButton.png",
    noSoundButton: "buttons/noSoundButton.png",
    musicButton: "buttons/musicButton.png",
    noMusicButton: "buttons/noMusicButton.png",
    recipeButtonOpen: "buttons/recipeButtonOpen.png",
    recipeButtonClosed: "buttons/recipeButton.png",

    // Bernd
    bernd_torso: "bernd/body_middle.png",
    bernd_back_torso: "bernd/backBody.png",
    bernd_head: "bernd/head.png",
    bernd_eyes_closed: "bernd/closed_eyes.png",
    bernd_eyes_open: "bernd/open_eyes.png",
    bernd_left_arm_leaning: "bernd/leftArmLeaning.png",
    bernd_left_arm_showing: "bernd/leftArmShowing.png",
    bernd_right_arm_leaning: "bernd/rightArmLeaning.png",

    // Start Screen
    startScreenBackgroundPattern: "backgroundPattern.png",
    startScreenPretitle: "pretitle.png",
    startScreenStartButton: "startButton.png",

    // Title Letters
    title_letter_0: "titleLetters/title0.png",
    title_letter_1: "titleLetters/title1.png",
    title_letter_2: "titleLetters/title2.png",
    title_letter_3: "titleLetters/title3.png",
    title_letter_4: "titleLetters/title4.png",
    title_letter_5: "titleLetters/title5.png",
    title_letter_6: "titleLetters/title6.png",
    title_letter_7: "titleLetters/title7.png",
    title_letter_8: "titleLetters/title8.png",
    title_letter_9: "titleLetters/title9.png",
    title_letter_10: "titleLetters/title10.png",
    title_letter_11: "titleLetters/title11.png",
    title_letter_12: "titleLetters/title12.png",
    title_letter_13: "titleLetters/title13.png",
    title_letter_14: "titleLetters/title14.png",

    // Recipe Box
    recipeBox: "recipeBox/recipeBox.png",
    recipeNameBanner: "recipeBox/recipeNameBanner.png",
    recipeLongStrike: "recipeBox/longstrike.png",

    // Cookie eyes
    openCookieEyes: "cookies/eyes/open_eyes.png",
    closedCookieEyes: "cookies/eyes/closed_eyes.png",

    // Cookies
    SANTAMILK: "cookies/santamilk.png",
    SCHOKOCROSSIES: "cookies/schokocrossies.png",
    MUERBETEIGKEKSE: "cookies/muerbeteigkekse.png",
    RUMKUGELN: "cookies/rumkugeln.png",
    PUNSCH: "cookies/punsch.png",
    BETHMAENNCHEN: "cookies/bethmaennchen.png",
    ZIMTSTERNE: "cookies/zimtsterne.png",
    PRINTEN: "cookies/printen.png",
    ENGELSAUGEN: "cookies/engelsaugen.png",
    VANILLEKIPFERL: "cookies/vanillekipferl.png",
    MAKRONEN: "cookies/makronen.png",
    FLORENTINER: "cookies/florentiner.png",
    SPRITZGEBAECK: "cookies/spritzgebaeck.png",
    LEBKUCHEN: "cookies/lebkuchen.png",
    SPEKULATIUS: "cookies/spekulatius.png",
    PFEFFERNUESSE: "cookies/pfeffernuss.png",
    PANETTONE: "cookies/panettone.png",
    SCHWARZWEISSKEKSE: "cookies/schwarzweissgebaeck.png",
    STOLLEN: "cookies/stollen.png",
    SCHOKOLADENBROT: "cookies/schokoladenbrot.png",
    NUSSECKEN: "cookies/nussecken.png",
    CORNFLAKEWALNUSSKEKSE: "cookies/haferflockenwalnuss.png",
    BAERENTATZEN: "cookies/baerentatzen.png",
    DOMINOSTEINE: "cookies/dominosteine.png",

    // Ingredient Overview
    ingredientOverviewBook: "ingredientOverview/book.png",
    ingredientOverviewPlus: "ingredientOverview/plus.png",
    ingredientOverviewScrollFlag: "ingredientOverview/scrollFahne.png",
    ingredientOverviewScrollBar: "ingredientOverview/scrollLine.png",
    ingredientOverviewSeparator: "ingredientOverview/separator.png",
    ingredientOverviewAlarm: "ingredientOverview/unlockedIngredientAlarm.png",

    // Particle
    particle: "ingredients/particle.png",

    // Ingredients
    cream: "ingredients/big/cream.png",
    milk: "ingredients/big/milk.png",
    flour: "ingredients/big/flour.png",
    boiled_egg: "ingredients/big/boiled_egg.png",
    butter: "ingredients/big/butter.png",
    melted_butter: "ingredients/big/melted_butter.png",
    cornflour: "ingredients/big/cornflour.png",
    cornflakes: "ingredients/big/cornflakes.png",
    beet_pudding: "ingredients/big/beet_pudding.png",
    beet_juice: "ingredients/big/beet_juice.png",
    beet_flour: "ingredients/big/beet_flour.png",
    beet: "ingredients/big/beet.png",
    mud: "ingredients/big/mud.png",
    swamp_water: "ingredients/big/swamp_water.png",
    dry_dirt: "ingredients/big/dry_dirt.png",
    dirt: "ingredients/big/dirt.png",
    sweetened_cream: "ingredients/big/sweetened_cream.png",
    sweetened_milk: "ingredients/big/sweetened_milk.png",
    sugar: "ingredients/big/sugar.png",
    marzipan: "ingredients/big/marzipan.png",
    honey: "ingredients/big/honey.png",
    vanilla_milk: "ingredients/big/vanilla_milk.png",
    vanilla_sugar: "ingredients/big/vanilla_sugar.png",
    honey_comb: "ingredients/big/honeycomb.png",
    cherry_jam: "ingredients/big/cherry_jam.png",
    cherry_sauce: "ingredients/big/cherry_sauce.png",
    cherry_sugar: "ingredients/big/cherry_sugar.png",
    cherries: "ingredients/big/cherry.png",
    chocolate_pudding: "ingredients/big/chocolate_pudding.png",
    melted_chocolate: "ingredients/big/melted_chocolate.png",
    brown_sugar: "ingredients/big/brown_sugar.png",
    raisins: "ingredients/big/raisins.png",
    lemon_cream: "ingredients/big/lemon_cream.png",
    lemon_aroma: "ingredients/big/lemon_aroma.png",
    lemon_sugar: "ingredients/big/lemon_sugar.png",
    old_lemon_candy: "ingredients/big/old_lemon_candy.png",
    lemon_pudding: "ingredients/big/lemon_pudding.png",
    lemon_juice: "ingredients/big/lemon_juice.png",
    lemon_powder: "ingredients/big/lemon_powder.png",
    candied_lemon_peel: "ingredients/big/candied_lemon_peel.png",
    currant_pudding: "ingredients/big/currant_pudding.png",
    currant_juice: "ingredients/big/currant_juice.png",
    currant_sugar: "ingredients/big/currant_sugar.png",
    currants: "ingredients/big/currant.png",
    rotten_fruits: "ingredients/big/rotten_fruit.png",
    rotten_fruit_juice: "ingredients/big/rotten_fruit_juice.png",
    grinded_umeboshi: "ingredients/big/grinded_umeboshi.png",
    umeboshi: "ingredients/big/umeboshi.png",
    nut_cream: "ingredients/big/nut_butter.png",
    nut_aroma: "ingredients/big/nut_aroma.png",
    grinded_nuts: "ingredients/big/grinded_nuts.png",
    peeled_nuts: "ingredients/big/peeled_nuts.png",
    egg: "ingredients/big/egg.png",
    eggnog: "ingredients/big/eggnog.png",
    egg_powder: "ingredients/big/egg_powder.png",
    scrambled_egg: "ingredients/big/scrambled_egg.png",
    wine_cream: "ingredients/big/wine_cream.png",
    wine: "ingredients/big/wine.png",
    spices: "ingredients/big/spices.png",
    steak: "ingredients/big/steak.png",
    nut_butter: "ingredients/big/nut_cream.png",
    rum_aroma: "ingredients/big/rum_aroma.png",
    cocoa: "ingredients/big/cocoa.png",
    nuts: "ingredients/big/nuts.png",

    // Ingredients
    small_cream: "ingredients/small/cream.png",
    small_milk: "ingredients/small/milk.png",
    small_flour: "ingredients/small/flour.png",
    small_boiled_egg: "ingredients/small/boiled_egg.png",
    small_butter: "ingredients/small/butter.png",
    small_melted_butter: "ingredients/small/melted_butter.png",
    small_cornflour: "ingredients/small/cornflour.png",
    small_cornflakes: "ingredients/small/cornflakes.png",
    small_beet_pudding: "ingredients/small/beet_pudding.png",
    small_beet_juice: "ingredients/small/beet_juice.png",
    small_beet_flour: "ingredients/small/beet_flour.png",
    small_beet: "ingredients/small/beet.png",
    small_mud: "ingredients/small/mud.png",
    small_swamp_water: "ingredients/small/swamp_water.png",
    small_dry_dirt: "ingredients/small/dry_dirt.png",
    small_dirt: "ingredients/small/dirt.png",
    small_sweetened_cream: "ingredients/small/sweetened_cream.png",
    small_sweetened_milk: "ingredients/small/sweetened_milk.png",
    small_sugar: "ingredients/small/sugar.png",
    small_marzipan: "ingredients/small/marzipan.png",
    small_honey: "ingredients/small/honey.png",
    small_vanilla_milk: "ingredients/small/vanilla_milk.png",
    small_vanilla_sugar: "ingredients/small/vanilla_sugar.png",
    small_honey_comb: "ingredients/small/honeycomb.png",
    small_cherry_jam: "ingredients/small/cherry_jam.png",
    small_cherry_sauce: "ingredients/small/cherry_sauce.png",
    small_cherry_sugar: "ingredients/small/cherry_sugar.png",
    small_cherries: "ingredients/small/cherry.png",
    small_chocolate_pudding: "ingredients/small/chocolate_pudding.png",
    small_melted_chocolate: "ingredients/small/melted_chocolate.png",
    small_brown_sugar: "ingredients/small/brown_sugar.png",
    small_raisins: "ingredients/small/raisins.png",
    small_lemon_cream: "ingredients/small/lemon_cream.png",
    small_lemon_aroma: "ingredients/small/lemon_aroma.png",
    small_lemon_sugar: "ingredients/small/lemon_sugar.png",
    small_old_lemon_candy: "ingredients/small/old_lemon_candy.png",
    small_lemon_pudding: "ingredients/small/lemon_pudding.png",
    small_lemon_juice: "ingredients/small/lemon_juice.png",
    small_lemon_powder: "ingredients/small/lemon_powder.png",
    small_candied_lemon_peel: "ingredients/small/candied_lemon_peel.png",
    small_currant_pudding: "ingredients/small/currant_pudding.png",
    small_currant_juice: "ingredients/small/currant_juice.png",
    small_currant_sugar: "ingredients/small/currant_sugar.png",
    small_currants: "ingredients/small/currant.png",
    small_rotten_fruits: "ingredients/small/rotten_fruit.png",
    small_rotten_fruit_juice: "ingredients/small/rotten_fruit_juice.png",
    small_grinded_umeboshi: "ingredients/small/grinded_umeboshi.png",
    small_umeboshi: "ingredients/small/umeboshi.png",
    small_nut_cream: "ingredients/small/nut_cream.png",
    small_nut_aroma: "ingredients/small/nut_aroma.png",
    small_grinded_nuts: "ingredients/small/grinded_nuts.png",
    small_peeled_nuts: "ingredients/small/peeled_nuts.png",
    small_egg: "ingredients/small/egg.png",
    small_eggnog: "ingredients/small/eggnog.png",
    small_egg_powder: "ingredients/small/egg_powder.png",
    small_scrambled_egg: "ingredients/small/scrambled_egg.png",
    small_wine_cream: "ingredients/small/wine_cream.png",
    small_wine: "ingredients/small/wine.png",
    small_spices: "ingredients/small/spices.png",
    small_steak: "ingredients/small/steak.png",
    small_nut_butter: "ingredients/small/nut_butter.png",
    small_rum_aroma: "ingredients/small/rum_aroma.png",
    small_cocoa: "ingredients/small/cocoa.png",
    small_nuts: "ingredients/small/nuts.png",

    // Machines
    machine_1x1: "machines/1x1_big.png",
    machine_1x2: "machines/1x2_big.png",
    machine_1x3: "machines/1x3_big.png",
    machine_2x1: "machines/2x1_big.png",
    machine_2x2: "machines/2x2_big.png",
    machine_2x3: "machines/2x3_big.png",
    machine_3x1: "machines/3x1_big.png",
    machine_3x2: "machines/3x2_big.png",
    machine_3x3: "machines/3x3_big.png",

    cage: "beltTiles/cage.png",

    // Blocks
    block_1x1: "blocks/1x1_block.png",
    block_1x2: "blocks/1x2_block.png",
    block_1x3: "blocks/1x3_block.png",
    block_2x1: "blocks/2x1_block.png",
    block_2x2: "blocks/2x2_block.png",
    block_2x3: "blocks/2x3_block.png",
    block_3x1: "blocks/3x1_block.png",
    block_3x2: "blocks/3x2_block.png",
    block_3x3: "blocks/3x3_block.png",

    // Icon Menu for Machines
    machineIconSlot: "machineIcons/machineIconHolder.png",
    machineIconMenuRect: "machineIcons/menuRect.png",
    machineIconMenuSpike: "machineIcons/menuSpike.png",

    // Icons
    white: "machineIcons/white.png",
    red: "machineIcons/red.png",
    yellow: "machineIcons/yellow.png",
    brown: "machineIcons/brown.png",
    neutral: "machineIcons/neutral.png",
    sweet: "machineIcons/sweet.png",
    sour: "machineIcons/sour.png",
    savoury: "machineIcons/savoury.png",
    sticky: "machineIcons/sticky.png",
    liquid: "machineIcons/liquid.png",
    powdery: "machineIcons/powdery.png",
    solid: "machineIcons/solid.png",

    // Tooltips
    tooltipRectangle: 'tooltip/tooltipRect.png',
    tooltipSpike: 'tooltip/tooltipTriangle.png',

    // WinScreen Stuff
    winScreenBackground: "winScreen/background.png",
    winScreenBanner: "winScreen/banner.png",
    winScreenBackToLevelsButton: "winScreen/backToLevelsButton.png",
    winScreenNextLevelButton: "winScreen/nextLevelButton.png",
    angel1Body: "winScreen/angel1/body.png",
    angel1LeftWing: "winScreen/angel1/leftWing.png",
    angel1Legs: "winScreen/angel1/legs.png",
    angel1RightWing: "winScreen/angel1/rightWing.png",
    angel2Body: "winScreen/angel2/body.png",
    angel2LeftWing: "winScreen/angel2/wingLeft.png",
    angel2Legs: "winScreen/angel2/legs.png",
    angel2RightWing: "winScreen/angel2/wingRight.png",
    angel2LeftArm: "winScreen/angel2/harp.png",
    angel2RightArm: "winScreen/angel2/armRight.png",
    sparkle1: "winScreen/sparkle1.png",
    sparkle2: "winScreen/sparkle2.png",
    sparkle3: "winScreen/sparkle3.png",
    sparkle4: "winScreen/sparkle4.png",
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