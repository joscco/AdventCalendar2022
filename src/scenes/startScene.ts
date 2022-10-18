import {Application, Sprite} from 'pixi.js';
import {Game} from "../index";
import Scene from "../Scene";
import * as gsap from "gsap";
import {Assets} from "@pixi/assets";

export class StartScene extends Scene {
    app: Application;
    sprite: Sprite;
    state: { velocity: { x: number; y: number } };

    constructor(app: Application) {
        super();
        this.app = app;
        this.sprite = new Sprite()
        this.state = { velocity: { x: 1, y: 1 } };
        this.update = this.update.bind(this);
    }

    async start() {
        const assets = await Assets.loadBundle("textures")

        this.sprite.texture = assets.worldi;
        this.sprite.x = Game.GAME_WIDTH / 2 - this.sprite.width / 2;
        this.sprite.y = Game.GAME_HEIGHT / 2 - this.sprite.height / 2;
        this.addChild(this.sprite);

        gsap.gsap.to(this.sprite, {
            x: Game.GAME_WIDTH - 200, duration: 2, ease: "back.out(1.2)"
        })
    }
}
