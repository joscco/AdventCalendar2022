import {StartScene} from './scenes/StartScene';
import SceneManager from './general/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js";
import {AssetStore} from "./AssetStore";
import {FactoryScene} from "./scenes/FactoryScene";
import {RECIPES} from "./gameobjects/RecipeBox";
import {LevelChooserScene} from "./scenes/LevelChooserScene";
import {TooltipManager} from "./gameobjects/Tooltip/TooltipManager";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;
export const NUMBER_OF_LEVELS: number = 24;
export var AVAILABLE_LEVELS: number = 1;

export var App: Application;
export var TOOLTIP_MANAGER: TooltipManager;
export var SCENE_MANAGER: SceneManager;
export var ASSET_STORE: AssetStore;

const main = async () => {
    // Init Main App
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            resolution: window.devicePixelRatio || 1
        }
    );

    // Synchronize tickers by using the gsap one
    App.ticker.stop()
    gsap.ticker.add(() => App.ticker.update())

    // Make gsap available globally
    gsap.install(window)

    // Add all loading bundles
    ASSET_STORE = new AssetStore()
    await ASSET_STORE.loadAssets()

    // Display application properly
    document.body.style.margin = '0';
    App.renderer.view.style.position = 'absolute';
    App.renderer.view.style.display = 'block';
    App.renderer.view.style.width = CANVAS_WIDTH + "px"
    App.renderer.view.style.height = CANVAS_HEIGHT + "px"

    // Load assets
    document.body.appendChild(App.view);

    TOOLTIP_MANAGER = new TooltipManager(App.stage)

    SCENE_MANAGER = new SceneManager(App);
    SCENE_MANAGER.add("startScene", new StartScene(App))
    SCENE_MANAGER.add("levelChooserScene", new LevelChooserScene(App))
    SCENE_MANAGER.add("level_1",
        new FactoryScene(
            App,
            "A0|A1|A2|A3|A4\n" +
            "B0|B1|B2|B3|B4\n" +
            "C0|C1|C2|C3|C4",
            RECIPES.SANTAMILK,
            ["1x1", "1x1", "1x1", "2x1", "2x1"]
        ))
    SCENE_MANAGER.start("startScene")
};

main();
