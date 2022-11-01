import {StartScene} from './scenes/StartScene';
import SceneManager from './general/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js";
import {AssetStore} from "./AssetStore";
import {Level} from "./gameobjects/Level";
import {RECIPES} from "./gameobjects/RecipeBox";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;

export var App: Application;
export var SCENE_MANAGER: SceneManager;
export var ASSET_STORE: AssetStore;

const main = async () => {
    // Init Main App
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
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

    SCENE_MANAGER = new SceneManager(App);
    SCENE_MANAGER.add("startScene", new StartScene(App))
    SCENE_MANAGER.add("firstLevel",
        new Level(App,
            "A0|  |  |  \n" +
            "A1|A2|A3|A4\n" +
            "  |  |  |A5",
            RECIPES.SANTAMILK,
            ["1x1", "2x1", "1x2"]
        ))
    SCENE_MANAGER.start("firstLevel")
};

main();
