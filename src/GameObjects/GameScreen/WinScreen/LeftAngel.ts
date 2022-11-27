import {Container, Sprite} from "pixi.js";
import {ASSET_MANAGER} from "../../../index";

export class LeftAngel extends Container {
    private body: Sprite;
    private frontWing: Sprite;
    private backWing: Sprite;
    private legs: Sprite;

    private frontWingMoveTween?: gsap.core.Tween;
    private backWingMoveTween?: gsap.core.Tween;
    private legsMoveTween?: gsap.core.Tween;
    private moveUpDownTween?: gsap.core.Tween;

    constructor() {
        super();

        this.body = new Sprite(ASSET_MANAGER.getTextureAsset("angel1Body"))
        this.body.anchor.set(0.5)

        this.frontWing = new Sprite(ASSET_MANAGER.getTextureAsset("angel1RightWing"))
        this.frontWing.anchor.set(0.97, 0.8)
        this.frontWing.position.set(-90, -20)

        this.backWing = new Sprite(ASSET_MANAGER.getTextureAsset("angel1LeftWing"))
        this.backWing.anchor.set(0.91, 0.85)
        this.backWing.position.set(-40, -40)

        this.legs = new Sprite(ASSET_MANAGER.getTextureAsset("angel1Legs"))
        this.legs.anchor.set(0.75, 0.12)
        this.legs.position.set(-80, 140)

        this.addChild(this.backWing, this.legs, this.body, this.frontWing)
    }

    startAnimating() {
        let currentY = this.position.y

        this.legs.rotation = -0.3
        this.frontWing.rotation = 0
        this.backWing.rotation = 0
        this.moveUpDownTween = gsap.to(this.position, {
            y: currentY - 50,
            duration: 4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.frontWingMoveTween = gsap.to(this.frontWing, {
            rotation: 0.4,
            duration: 0.4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.backWingMoveTween = gsap.to(this.backWing, {
            rotation: 0.4,
            duration: 0.4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.legsMoveTween = gsap.to(this.legs, {
            rotation: 0.2,
            duration: 3,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
    }

    stopAnimating() {
        this.moveUpDownTween?.pause()
        this.backWingMoveTween?.pause()
        this.frontWingMoveTween?.pause()
        this.legsMoveTween?.pause()
    }

}