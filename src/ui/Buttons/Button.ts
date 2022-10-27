import {Sprite} from "pixi.js";
import {Texture} from "@pixi/core";

export class Button extends Sprite {

    private onClick: () => void
    private clicked: boolean = false;

    constructor(x: number, y: number, texture: Texture, onClick: () => void) {
        super(texture);
        this.x = x;
        this.y = y;

        // Since we might want scaling, setting the anchor in the middle is better
        this.anchor.set(0.5)

        this.onClick = async () => {
            if (!this.clicked) {
                this.clicked = true;
                await onClick();
                this.clicked = false;
            }
        }

        this.interactive = true;
        this.buttonMode = true;

        this.on("pointertap", () => this.onClick())
    }
}

