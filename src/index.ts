import {StartScene} from './scenes/StartScene';
import SceneManager from './general/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js";
import {AssetStore} from "./general/AssetStore";
import {LevelChooserScene} from "./scenes/LevelChooserScene";
import {TooltipManager} from "./gameobjects/Tooltip/TooltipManager";
import {GameData} from "./general/GameData";
import {SoundManager} from "./general/SoundManager";
import {MusicButton} from "./ui/Buttons/MusicButton";
import {SoundButton} from "./ui/Buttons/SoundButton";
import {IngredientCookBook} from "./gameobjects/IngredientCookBook";
import {LevelInitiator} from "./scenes/general/LevelInitiator";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;
export const NUMBER_OF_LEVELS: number = 24;

export var App: Application;
export var TOOLTIP_MANAGER: TooltipManager;
export var SCENE_MANAGER: SceneManager;
export var ASSET_STORE: AssetStore;
export var GAME_DATA: GameData;
export var LEVEL_SCREEN: LevelChooserScene;
export var SOUND_MANAGER: SoundManager;
export var INGREDIENT_COOKBOOK: IngredientCookBook

const main = async () => {
    // Init Main App
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            resolution: window.devicePixelRatio || 1,
            backgroundColor: 0x38191b
        }
    );
    App.stage.sortableChildren = true

    // Display application properly
    document.body.style.margin = '0';
    App.renderer.view.style!.width = CANVAS_WIDTH + "px"
    App.renderer.view.style!.height = CANVAS_HEIGHT + "px"

    // Load assets
    document.body.appendChild(App.view);

    // Synchronize tickers by using the gsap one
    App.ticker.stop()
    gsap.ticker.add(() => App.ticker.update())

    // Make gsap available globally
    gsap.install(window)

    // Add all loading bundles
    ASSET_STORE = new AssetStore()
    SCENE_MANAGER = new SceneManager(App);
    App.stage.addChild(SCENE_MANAGER)

    await ASSET_STORE.startLoadingScreen()
    await SCENE_MANAGER.start("loadingScene")
    await ASSET_STORE.startLoadingOtherAssets()

    SOUND_MANAGER = new SoundManager()
    SOUND_MANAGER.playMusic()

    GAME_DATA = new GameData()

    TOOLTIP_MANAGER = new TooltipManager(App.stage)

    let musicButton = new MusicButton()
    musicButton.x = GAME_WIDTH - 270
    musicButton.y = 125
    musicButton.zIndex = 110
    App.stage.addChild(musicButton);

    let soundButton = new SoundButton()
    soundButton.x = GAME_WIDTH - 110
    soundButton.y = 125
    soundButton.zIndex = 110
    App.stage.addChild(soundButton);

    INGREDIENT_COOKBOOK = new IngredientCookBook()
    INGREDIENT_COOKBOOK.zIndex = 6
    App.stage.addChild(INGREDIENT_COOKBOOK)

    SCENE_MANAGER.add("startScene", new StartScene(App))
    LEVEL_SCREEN = new LevelChooserScene(App)
    SCENE_MANAGER.add("levelChooserScene", LEVEL_SCREEN)
    LevelInitiator.addLevels(SCENE_MANAGER)
    SCENE_MANAGER.startWithTransition("startScene")
};

main();
