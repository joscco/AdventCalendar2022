import {StartScene} from './scenes/startScene';
import SceneManagerImpl from './SceneManagerImpl';
import {gsap} from "gsap";
import {Assets} from "@pixi/assets";
import {Application} from "pixi.js";

export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;
export const CANVAS_WIDTH = 960;
export const CANVAS_HEIGHT = 540;
export var App: Application;
export var SceneManager: SceneManagerImpl;

const main = async () => {
    // Main app
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT
        }
    );

    // Synchronize tickers by using the gsap one
    App.ticker.stop()
    gsap.ticker.add(() => App.ticker.update())

    // Add all loading bundles
    Assets.addBundle("startSceneAssets", {
        buttonStart: 'assets/startScreen/buttonStart.png',
        buttonTutorial: 'assets/startScreen/buttonTutorial.png',
        title: 'assets/startScreen/title.png'
    });
    await Assets.loadBundle("textures")

    // Display application properly
    document.body.style.margin = '0';
    App.renderer.view.style.position = 'absolute';
    App.renderer.view.style.display = 'block';
    App.renderer.view.style.width = CANVAS_WIDTH + "px"
    App.renderer.view.style.height = CANVAS_HEIGHT + "px"

    // Load assets
    document.body.appendChild(App.view);

    SceneManager = new SceneManagerImpl(App);
    var startScene = new StartScene(App);
    SceneManager.add("startScene", startScene)
    SceneManager.start("startScene")
};

main();
