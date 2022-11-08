import {StartScene} from './scenes/StartScene';
import SceneManager from './general/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js";
import {AssetStore} from "./general/AssetStore";
import {FactoryScene} from "./scenes/FactoryScene";
import {RECIPES} from "./gameobjects/RecipeBox";
import {LevelChooserScene} from "./scenes/LevelChooserScene";
import {TooltipManager} from "./gameobjects/Tooltip/TooltipManager";
import {GameData} from "./general/GameData";
import {SoundManager} from "./general/SoundManager";
import {SoundButton} from "./ui/Buttons/SoundButton";
import {SceneTransitionManager} from "./general/SceneTransitionManager";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;
export const NUMBER_OF_LEVELS: number = 24;

export var App: Application;
export var TOOLTIP_MANAGER: TooltipManager;
export var SCENE_MANAGER: SceneManager;
export var SCENE_TRANSITION_MANAGER: SceneTransitionManager;
export var ASSET_STORE: AssetStore;
export var GAME_DATA: GameData;
export var LEVEL_SCREEN: LevelChooserScene
export var SOUND_MANAGER: SoundManager

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
    SCENE_TRANSITION_MANAGER = new SceneTransitionManager()
    App.stage.addChild(SCENE_TRANSITION_MANAGER)

    await ASSET_STORE.startLoadingScreen()
    await SCENE_MANAGER.start("loadingScene")
    await ASSET_STORE.startLoadingOtherAssets()

    SOUND_MANAGER = new SoundManager()
    SOUND_MANAGER.playMusic()

    GAME_DATA = new GameData()

    TOOLTIP_MANAGER = new TooltipManager(App.stage)

    let soundButton = new SoundButton()
    soundButton.x = GAME_WIDTH - 150
    soundButton.y = 125
    soundButton.zIndex = 110
    App.stage.addChild(soundButton);

    SCENE_MANAGER.add("startScene", new StartScene(App))
    LEVEL_SCREEN = new LevelChooserScene(App)
    SCENE_MANAGER.add("levelChooserScene", LEVEL_SCREEN)
    SCENE_MANAGER.add("level_1",
        new FactoryScene(
            App, 1,
            "A0|A1|A2|A3|A4|A5|A6\n" +
            "B0|B1|B2|B3|B4|B5|B6\n" +
            "D0|D1|D2|D3|D4|D5|D6\n" +
            "E0|E1|E2|E3|E4|E5|E6\n" +
            "C0|C1|C2|C3|C4|C5|C6",
            RECIPES.SANTAMILK,
            ["1x1", "1x1", "1x1", "2x1", "2x1"],
            new Map([
                ["A", "butter"],
                ["B", "currant_pudding"]
            ]))
        )
    SCENE_MANAGER.add("level_2",
        new FactoryScene(
            App, 2,
            "A0|B0|C0|C1|C2\n" +
            "A1|B1|B2|B3|B4\n" +
            "A2|A3|A4|A5|  ",
            RECIPES.DOMINOSTEINE,
            ["1x1", "1x1", "1x1", "2x1", "2x1"]
        ))
    SCENE_TRANSITION_MANAGER.transitionTo("startScene")
};

main();
