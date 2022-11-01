import {Sprite} from "pixi.js";
import {Texture} from "@pixi/core";

export abstract class Button extends Sprite {
    private clicked: boolean = false;

    constructor() {
        super();

        this.texture = this.getTexture()
        // Since we might want scaling, setting the anchor in the middle is better
        this.anchor.set(0.5)

        this.interactive = true;
        this.buttonMode = true;
        this.on("pointertap", () => this.onPointerTap())
    }

    // Needed in case the texture depends on values set in child constructors
    updateTexture() {
        this.texture = this.getTexture()
    }

    async onPointerTap() {
        if (!this.clicked) {
            this.clicked = true;
            await this.onClick();
            this.clicked = false;
        }
    }

    abstract onClick(): void

    abstract getTexture(): Texture
}

