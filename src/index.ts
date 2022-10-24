import {StartScene} from './scenes/StartScene';
import SceneManager from './general/SceneManager';
import {gsap} from "gsap";
import {Assets} from "@pixi/assets";
import {Application} from "pixi.js";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;
export var MAIN_FONT: FontFace
export var App: Application;
export var SCENE_MANAGER: SceneManager;

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
    Assets.add("font", "assets/fonts/FuturaHandwritten.ttf")
    Assets.addBundle("tooltipAssets", {
        tooltipRectangle: 'assets/gameScreen/tooltip/tooltipRect.png',
        tooltipSpike: 'assets/gameScreen/tooltip/tooltipTriangle.png'
    })

    Assets.addBundle("startSceneAssets", {
        buttonStart: 'assets/startScreen/buttonStart.png',
        buttonTutorial: 'assets/startScreen/buttonTutorial.png',
        title: 'assets/startScreen/title.png'
    });
    await Assets.loadBundle("textures")
    MAIN_FONT = await Assets.load("font") as FontFace

    // Display application properly
    document.body.style.margin = '0';
    App.renderer.view.style.position = 'absolute';
    App.renderer.view.style.display = 'block';
    App.renderer.view.style.width = CANVAS_WIDTH + "px"
    App.renderer.view.style.height = CANVAS_HEIGHT + "px"

    // Load assets
    document.body.appendChild(App.view);

    SCENE_MANAGER = new SceneManager(App);
    var startScene = new StartScene(App);
    SCENE_MANAGER.add("startScene", startScene)
    SCENE_MANAGER.start("startScene")
};

main();
