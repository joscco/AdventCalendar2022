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
        torso: "assets/startScreen/bernd/body_middle.png",
        head: "assets/startScreen/bernd/head.png",
        eyes_closed: "assets/startScreen/bernd/closed_eyes.png",
        eyes_open: "assets/startScreen/bernd/open_eyes.png",
        left_arm_leaning: "assets/startScreen/bernd/leftArmLeaning.png",
        left_arm_showing: "assets/startScreen/bernd/leftArmShowing.png",
        right_arm_leaning: "assets/startScreen/bernd/rightArmLeaning.png",
        backgroundPattern: "assets/startScreen/backgroundPattern.png",
        pretitle: "assets/startScreen/pretitle.png",
        startButton: "assets/startScreen/startButton.png",
        title_0: "assets/startScreen/titleLetters/title0.png",
        title_1: "assets/startScreen/titleLetters/title1.png",
        title_2: "assets/startScreen/titleLetters/title2.png",
        title_3: "assets/startScreen/titleLetters/title3.png",
        title_4: "assets/startScreen/titleLetters/title4.png",
        title_5: "assets/startScreen/titleLetters/title5.png",
        title_6: "assets/startScreen/titleLetters/title6.png",
        title_7: "assets/startScreen/titleLetters/title7.png",
        title_8: "assets/startScreen/titleLetters/title8.png",
        title_9: "assets/startScreen/titleLetters/title9.png",
        title_10: "assets/startScreen/titleLetters/title10.png",
        title_11: "assets/startScreen/titleLetters/title11.png",
        title_12: "assets/startScreen/titleLetters/title12.png",
        title_13: "assets/startScreen/titleLetters/title13.png",
        title_14: "assets/startScreen/titleLetters/title14.png",
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
