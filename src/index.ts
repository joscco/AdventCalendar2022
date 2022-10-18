import {Application} from 'pixi.js';
import {StartScene} from './scenes/startScene';
import SceneManager from './SceneManager';
import {gsap} from "gsap";
import {Assets} from "@pixi/assets";

export class Game {
    static GAME_WIDTH = 1920
    static GAME_HEIGHT = 1080
    static CANVAS_WIDTH = 960
    static CANVAS_HEIGHT = 540
}

const main = async () => {
    // Main app
    let app = new Application(
        {
            width: Game.GAME_WIDTH,
            height: Game.GAME_HEIGHT
        }
    );

    // Synchronize tickers by using the gsap one
    app.ticker.stop()
    gsap.ticker.add(() => app.ticker.update())

    // Add all loading bundles
    Assets.addBundle("textures", {
        worldi: 'assets/hello-world.png'
    });
    await Assets.loadBundle("textures")

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.view.style.width = Game.CANVAS_WIDTH + "px"
    app.renderer.view.style.height = Game.CANVAS_HEIGHT + "px"

    // Load assets
    document.body.appendChild(app.view);

    let sceneManager = new SceneManager(app);
    var scene = new StartScene(app);
    sceneManager.add("startScene", scene)
    sceneManager.start("startScene")
};

main();
