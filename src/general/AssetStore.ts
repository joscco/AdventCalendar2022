import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";
import {App, SCENE_MANAGER} from "../index";
import {LoadingScene} from "../scenes/LoadingScene";
import {Oven} from "../gameobjects/LoadingScene/Oven";

export class AssetStore {
    private MAIN_FONT?: FontFace
    LOADING_SCENE_ASSETS?: LoadingSceneAssets
    private ASSETS?: GameAssets

    loadingScene?: LoadingScene
    oven?: Oven;

    constructor() {
        this.addAssets()
    }

    getTextureAsset(id: TextureAssetID): Texture {
        return this.ASSETS![id as keyof GameAssets]
    }

    getSoundAsset(id: SoundAssetID): any {
        return this.ASSETS![id as keyof GameAssets]
    }

    private addAssets() {
        Assets.add("font", "assets/fonts/FuturaHandwritten.ttf")

        Assets.addBundle("loadingScreenAssets", {
            closedOven: "assets/loadingScreen/closedOven.png",
            openOven: "assets/loadingScreen/openOven.png",
            innerLoadingBar:"assets/loadingScreen/innerLoadingBar.png",
            outerLoadingBar:"assets/loadingScreen/outerLoadingBar.png",
            redder: "assets/loadingScreen/redder.png",
            steam: "assets/loadingScreen/steam.png",
        })

        Assets.addBundle("assets", {...TEXTURE_MANIFEST, ...SOUND_MANIFEST});
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
        this.ASSETS = this.prepareAssets(await Assets.loadBundle("assets", (progress: number) => this.loadingScene!.setProgress(progress)))
        await this.oven!.open()
    }

    private prepareAssets(rawAssets: any): GameAssets {
        return rawAssets
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

const TEXTURE_MANIFEST = {
    // Dialog
    dialog_cross: "assets/dialog/cross.png",
    dialog_box: "assets/dialog/dialogBox.png",
    dialog_spike: "assets/dialog/dialogSpike.png",
    dialog_next_button: "assets/dialog/next.png",
    dialog_previous_button: "assets/dialog/previous.png",

    // Belt Fields
    background: "assets/gameScreen/background.png",
    startField: "assets/gameScreen/beltTiles/startField.png",
    moveField0: "assets/gameScreen/beltTiles/moveField0.png",
    moveField1: "assets/gameScreen/beltTiles/moveField1.png",
    moveField2: "assets/gameScreen/beltTiles/moveField2.png",
    endField: "assets/gameScreen/beltTiles/endField.png",
    proceedButton: "assets/gameScreen/beltTiles/proceedButton.png",
    goodFieldOverlay: "assets/gameScreen/beltTiles/goodFieldOverlay.png",
    badFieldOverlay: "assets/gameScreen/beltTiles/badFieldOverlay.png",
    machineInventory: "assets/gameScreen/beltTiles/machineOuterGrid.png",
    emptyField: "assets/gameScreen/beltTiles/emptyField.png",

    // Buttons
    backButton: "assets/gameScreen/buttons/backButton.png",
    soundButton: "assets/gameScreen/buttons/soundButton.png",
    noSoundButton: "assets/gameScreen/buttons/noSoundButton.png",
    musicButton: "assets/gameScreen/buttons/musicButton.png",
    noMusicButton: "assets/gameScreen/buttons/noMusicButton.png",
    recipeButtonOpen: "assets/gameScreen/buttons/recipeButtonOpen.png",
    recipeButtonClosed: "assets/gameScreen/buttons/recipeButton.png",

    // Bernd
    bernd_torso: "assets/startScreen/bernd/body_middle.png",
    bernd_back_torso: "assets/startScreen/bernd/backBody.png",
    bernd_head: "assets/startScreen/bernd/head.png",
    bernd_eyes_closed: "assets/startScreen/bernd/closed_eyes.png",
    bernd_eyes_open: "assets/startScreen/bernd/open_eyes.png",
    bernd_left_arm_leaning: "assets/startScreen/bernd/leftArmLeaning.png",
    bernd_left_arm_showing: "assets/startScreen/bernd/leftArmShowing.png",
    bernd_right_arm_leaning: "assets/startScreen/bernd/rightArmLeaning.png",
    
    // Start Screen
    startScreenBackgroundPattern: "assets/startScreen/backgroundPattern.png",
    startScreenPretitle: "assets/startScreen/pretitle.png",
    startScreenStartButton: "assets/startScreen/startButton.png",

    // Title Letters
    title_letter_0: "assets/startScreen/titleLetters/title0.png",
    title_letter_1: "assets/startScreen/titleLetters/title1.png",
    title_letter_2: "assets/startScreen/titleLetters/title2.png",
    title_letter_3: "assets/startScreen/titleLetters/title3.png",
    title_letter_4: "assets/startScreen/titleLetters/title4.png",
    title_letter_5: "assets/startScreen/titleLetters/title5.png",
    title_letter_6: "assets/startScreen/titleLetters/title6.png",
    title_letter_7: "assets/startScreen/titleLetters/title7.png",
    title_letter_8: "assets/startScreen/titleLetters/title8.png",
    title_letter_9: "assets/startScreen/titleLetters/title9.png",
    title_letter_10: "assets/startScreen/titleLetters/title10.png",
    title_letter_11: "assets/startScreen/titleLetters/title11.png",
    title_letter_12: "assets/startScreen/titleLetters/title12.png",
    title_letter_13: "assets/startScreen/titleLetters/title13.png",
    title_letter_14: "assets/startScreen/titleLetters/title14.png",

    // Recipe Box
    recipeBox: "assets/gameScreen/recipeBox/recipeBox.png",
    recipeNameBanner: "assets/gameScreen/recipeBox/recipeNameBanner.png",
    recipeLongStrike: "assets/gameScreen/recipeBox/longstrike.png",

    // Cookie eyes
    openCookieEyes: "assets/gameScreen/cookies/eyes/open_eyes.png",
    closedCookieEyes: "assets/gameScreen/cookies/eyes/closed_eyes.png",

    // Cookies
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

    // Ingredient Overview
    ingredientOverviewBook: "assets/gameScreen/ingredientOverview/book.png",
    ingredientOverviewPlus: "assets/gameScreen/ingredientOverview/plus.png",
    ingredientOverviewScrollFlag: "assets/gameScreen/ingredientOverview/scrollFahne.png",
    ingredientOverviewScrollBar: "assets/gameScreen/ingredientOverview/scrollLine.png",
    ingredientOverviewSeparator: "assets/gameScreen/ingredientOverview/separator.png",
    ingredientOverviewAlarm: "assets/gameScreen/ingredientOverview/unlockedIngredientAlarm.png",

    // Particle
    particle: "assets/gameScreen/ingredients/particle.png",

    // Ingredients
    cream: "assets/gameScreen/ingredients/whiteIngredient.png",
    milk: "assets/gameScreen/ingredients/whiteIngredient.png",
    flour: "assets/gameScreen/ingredients/whiteIngredient.png",
    cabbage: "assets/gameScreen/ingredients/whiteIngredient.png",
    butter: "assets/gameScreen/ingredients/yellowIngredient.png",
    melted_butter: "assets/gameScreen/ingredients/yellowIngredient.png",
    cornflour: "assets/gameScreen/ingredients/yellowIngredient.png",
    cornflakes: "assets/gameScreen/ingredients/yellowIngredient.png",
    beet_pudding: "assets/gameScreen/ingredients/redIngredient.png",
    beet_juice: "assets/gameScreen/ingredients/redIngredient.png",
    beet_flour: "assets/gameScreen/ingredients/redIngredient.png",
    beet: "assets/gameScreen/ingredients/redIngredient.png",
    mud: "assets/gameScreen/ingredients/brownIngredient.png",
    swamp_water: "assets/gameScreen/ingredients/brownIngredient.png",
    dry_dirt: "assets/gameScreen/ingredients/brownIngredient.png",
    dirt: "assets/gameScreen/ingredients/brownIngredient.png",
    sweetened_cream: "assets/gameScreen/ingredients/whiteIngredient.png",
    sweetened_milk: "assets/gameScreen/ingredients/whiteIngredient.png",
    sugar: "assets/gameScreen/ingredients/whiteIngredient.png",
    marzipan: "assets/gameScreen/ingredients/whiteIngredient.png",
    honey: "assets/gameScreen/ingredients/yellowIngredient.png",
    vanilla_milk: "assets/gameScreen/ingredients/yellowIngredient.png",
    vanilla_sugar: "assets/gameScreen/ingredients/yellowIngredient.png",
    honey_comb: "assets/gameScreen/ingredients/yellowIngredient.png",
    cherry_jam: "assets/gameScreen/ingredients/redIngredient.png",
    cherry_sauce: "assets/gameScreen/ingredients/redIngredient.png",
    cherry_sugar: "assets/gameScreen/ingredients/redIngredient.png",
    cherries: "assets/gameScreen/ingredients/redIngredient.png",
    chocolate_pudding: "assets/gameScreen/ingredients/redIngredient.png",
    melted_chocolate: "assets/gameScreen/ingredients/redIngredient.png",
    brown_sugar: "assets/gameScreen/ingredients/redIngredient.png",
    raisins: "assets/gameScreen/ingredients/redIngredient.png",
    lemon_cream: "assets/gameScreen/ingredients/whiteIngredient.png",
    expired_milk: "assets/gameScreen/ingredients/whiteIngredient.png",
    lemon_concentrate: "assets/gameScreen/ingredients/whiteIngredient.png",
    old_lemon_candy: "assets/gameScreen/ingredients/whiteIngredient.png",
    lemon_pudding: "assets/gameScreen/ingredients/yellowIngredient.png",
    lemon_juice: "assets/gameScreen/ingredients/yellowIngredient.png",
    lemon_sugar: "assets/gameScreen/ingredients/yellowIngredient.png",
    candied_lemon_peel: "assets/gameScreen/ingredients/yellowIngredient.png",
    currant_pudding: "assets/gameScreen/ingredients/redIngredient.png",
    currant_juice: "assets/gameScreen/ingredients/redIngredient.png",
    currant_sugar: "assets/gameScreen/ingredients/redIngredient.png",
    currants: "assets/gameScreen/ingredients/redIngredient.png",
    rotten_fruits: "assets/gameScreen/ingredients/redIngredient.png",
    rotten_fruit_juice: "assets/gameScreen/ingredients/redIngredient.png",
    grinded_umeboshi: "assets/gameScreen/ingredients/redIngredient.png",
    umeboshi: "assets/gameScreen/ingredients/redIngredient.png",
    nut_cream: "assets/gameScreen/ingredients/whiteIngredient.png",
    nut_aroma: "assets/gameScreen/ingredients/whiteIngredient.png",
    grinded_nuts: "assets/gameScreen/ingredients/whiteIngredient.png",
    peeled_nuts: "assets/gameScreen/ingredients/whiteIngredient.png",
    egg_yolk: "assets/gameScreen/ingredients/yellowIngredient.png",
    egg: "assets/gameScreen/ingredients/yellowIngredient.png",
    egg_powder: "assets/gameScreen/ingredients/yellowIngredient.png",
    scrambled_egg: "assets/gameScreen/ingredients/yellowIngredient.png",
    wine_cream: "assets/gameScreen/ingredients/redIngredient.png",
    wine: "assets/gameScreen/ingredients/redIngredient.png",
    spices: "assets/gameScreen/ingredients/redIngredient.png",
    steak: "assets/gameScreen/ingredients/redIngredient.png",
    nut_butter: "assets/gameScreen/ingredients/redIngredient.png",
    rum_aroma: "assets/gameScreen/ingredients/redIngredient.png",
    cocoa: "assets/gameScreen/ingredients/redIngredient.png",
    nuts: "assets/gameScreen/ingredients/redIngredient.png",

    // Machines
    small_machine_1x1: "assets/gameScreen/machines/1x1_small.png",
    small_machine_1x2: "assets/gameScreen/machines/1x2_small.png",
    small_machine_1x3: "assets/gameScreen/machines/1x3_small.png",
    small_machine_2x1: "assets/gameScreen/machines/2x1_small.png",
    small_machine_2x2: "assets/gameScreen/machines/2x2_small.png",
    small_machine_2x3: "assets/gameScreen/machines/2x3_small.png",
    small_machine_3x1: "assets/gameScreen/machines/3x1_small.png",
    small_machine_3x2: "assets/gameScreen/machines/3x2_small.png",
    small_machine_3x3: "assets/gameScreen/machines/3x3_small.png",
    big_machine_1x1: "assets/gameScreen/machines/1x1_big.png",
    big_machine_1x2: "assets/gameScreen/machines/1x2_big.png",
    big_machine_1x3: "assets/gameScreen/machines/1x3_big.png",
    big_machine_2x1: "assets/gameScreen/machines/2x1_big.png",
    big_machine_2x2: "assets/gameScreen/machines/2x2_big.png",
    big_machine_2x3: "assets/gameScreen/machines/2x3_big.png",
    big_machine_3x1: "assets/gameScreen/machines/3x1_big.png",
    big_machine_3x2: "assets/gameScreen/machines/3x2_big.png",
    big_machine_3x3: "assets/gameScreen/machines/3x3_big.png",

    // Icon Menu for Machines
    machineIconSlot: "assets/gameScreen/machineIcons/machineIconHolder.png",
    machineIconMenuRect: "assets/gameScreen/machineIcons/menuRect.png",
    machineIconMenuSpike: "assets/gameScreen/machineIcons/menuSpike.png",

    // Icons
    white: "assets/gameScreen/machineIcons/white.png",
    red: "assets/gameScreen/machineIcons/red.png",
    yellow: "assets/gameScreen/machineIcons/yellow.png",
    brown: "assets/gameScreen/machineIcons/brown.png",
    neutral: "assets/gameScreen/machineIcons/neutral.png",
    sweet: "assets/gameScreen/machineIcons/sweet.png",
    sour: "assets/gameScreen/machineIcons/sour.png",
    savoury: "assets/gameScreen/machineIcons/savoury.png",
    sticky: "assets/gameScreen/machineIcons/sticky.png",
    liquid: "assets/gameScreen/machineIcons/liquid.png",
    powdery: "assets/gameScreen/machineIcons/powdery.png",
    solid: "assets/gameScreen/machineIcons/solid.png",

    // Tooltips
    tooltipRectangle: 'assets/gameScreen/tooltip/tooltipRect.png',
    tooltipSpike: 'assets/gameScreen/tooltip/tooltipTriangle.png',

    // WinScreen Stuff
    winScreenBackground:"assets/gameScreen/winScreen/background.png",
    winScreenBanner: "assets/gameScreen/winScreen/banner.png",
    winScreenBackToLevelsButton: "assets/gameScreen/winScreen/backToLevelsButton.png",
    winScreenNextLevelButton: "assets/gameScreen/winScreen/nextLevelButton.png",
    angel1Body: "assets/gameScreen/winScreen/angel1/body.png",
    angel1LeftWing: "assets/gameScreen/winScreen/angel1/leftWing.png",
    angel1Legs: "assets/gameScreen/winScreen/angel1/legs.png",
    angel1RightWing: "assets/gameScreen/winScreen/angel1/rightWing.png",
    angel2Body: "assets/gameScreen/winScreen/angel2/body.png",
    angel2LeftWing: "assets/gameScreen/winScreen/angel2/wingLeft.png",
    angel2Legs: "assets/gameScreen/winScreen/angel2/legs.png",
    angel2RightWing: "assets/gameScreen/winScreen/angel2/wingRight.png",
    angel2LeftArm: "assets/gameScreen/winScreen/angel2/harp.png",
    angel2RightArm: "assets/gameScreen/winScreen/angel2/armRight.png",
    sparkle1: "assets/gameScreen/winScreen/sparkle1.png",
    sparkle2: "assets/gameScreen/winScreen/sparkle2.png",
    sparkle3: "assets/gameScreen/winScreen/sparkle3.png",
    sparkle4: "assets/gameScreen/winScreen/sparkle4.png",
}

const SOUND_MANIFEST = {
    blub1: "assets/sounds/Blub1.ogg",
    main: "assets/sounds/Main.ogg"
}

export type TextureAssetID = keyof typeof TEXTURE_MANIFEST

export type SoundAssetID = keyof typeof SOUND_MANIFEST

export type GameTextureAssets = {
    [key in TextureAssetID]: Texture
}

export type GameSoundAssets = {
    [key in SoundAssetID]: any
}

export type GameAssets = GameTextureAssets & GameSoundAssets

export interface LoadingSceneAssets {
    closedOven: Texture,
    openOven: Texture,
    innerLoadingBar: Texture,
    outerLoadingBar: Texture,
    redder: Texture,
    steam: Texture
}