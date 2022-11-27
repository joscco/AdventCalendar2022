import {Sprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {ASSET_MANAGER} from "../../../index";

export class Sparkle extends Sprite {
    textures: Texture[]
    private moveTween?: gsap.core.Tween;

    constructor() {
        super();
        this.textures = ASSET_MANAGER.getTextureAssets("sparkle1", "sparkle2", "sparkle3", "sparkle4")
        this.chooseRandomTexture()
        this.anchor.set(0.5)
    }

    chooseRandomTexture() {
        this.texture = this.textures[Math.floor(Math.random() * this.textures.length)]
        this.anchor.set(0.5)
    }

    startMoving() {
        let currentY = this.position.y
        this.moveTween = gsap.to(this.position, {y: currentY - 100, duration: 2 + 3*Math.random(), ease: Sine.easeInOut, yoyo: true, repeat: -1})
        this.moveTween.resume()
    }

    stopMoving() {
        this.moveTween?.pause()
    }
}