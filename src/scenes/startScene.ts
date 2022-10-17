import {Application, Sprite} from 'pixi.js';
import {Game} from "../index";
import Scene from "../Scene";

export class StartScene extends Scene {
    app: Application;
    sprite: Sprite;
    state: { velocity: { x: number; y: number } };

    constructor(app: Application) {
        super();
        this.app = app;
        this.state = { velocity: { x: 1, y: 1 } };
        this.update = this.update.bind(this);

        this.sprite = new Sprite(
            app.loader.resources['assets/hello-world.png'].texture
        );
        this.sprite.x = Game.GAME_WIDTH / 2 - this.sprite.width / 2;
        this.sprite.y = Game.GAME_HEIGHT / 2 - this.sprite.height / 2;
        this.addChild(this.sprite);
    }

    update(delta: number) {
        if (
            this.sprite.x <= 0 ||
            this.sprite.x >= Game.GAME_WIDTH - this.sprite.width
        ) {
            this.state.velocity.x = -this.state.velocity.x;
        }
        if (
            this.sprite.y <= 0 ||
            this.sprite.y >= Game.GAME_HEIGHT - this.sprite.height
        ) {
            this.state.velocity.y = -this.state.velocity.y;
        }
        this.sprite.x += this.state.velocity.x;
        this.sprite.y += this.state.velocity.y;
    }
}
