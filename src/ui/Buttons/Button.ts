import {Container, Sprite} from "pixi.js";
import {Texture} from "@pixi/core";

export abstract class Button extends Container {
    private clicked: boolean = false;
    sprite: Sprite

    constructor() {
        super();

        this.sprite = new Sprite(this.getTexture() ?? undefined)
        // Since we might want scaling, setting the anchor in the middle is better
        this.sprite.anchor.set(0.5)
        this.addChild(this.sprite)

        this.interactive = true;
        this.buttonMode = true;
        this.on("pointertap", () => this.onPointerTap())
    }

    // Needed in case the texture depends on values set in child constructors
    updateTexture() {
        if (this.getTexture()) {
            this.sprite.texture = this.getTexture()!
        }

    }

    async onPointerTap() {
        if (!this.clicked) {
            this.clicked = true;
            await this.onClick();
            this.clicked = false;
        }
    }

    abstract onClick(): void

    abstract getTexture(): Texture | null
}

