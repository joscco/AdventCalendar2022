import {Container, Sprite} from "pixi.js";
import {ASSET_STORE} from "../../../index";

export class RightAngel extends Container {
    private body: Sprite;
    private backWing: Sprite;
    private frontWing: Sprite;
    private leftArm: Sprite;
    private rightArm: Sprite;
    private legs: Sprite;
    private moveUpDownTween?: gsap.core.Tween;
    private frontWingMoveTween?: gsap.core.Tween;
    private backWingMoveTween?: gsap.core.Tween;
    private legsMoveTween?: gsap.core.Tween;
    private leftArmMoveTween?: gsap.core.Tween;
    private rightArmMoveTween?: gsap.core.Tween;

    constructor() {
        super();
        this.body = new Sprite(ASSET_STORE.getTextureAsset("angel2Body"))
        this.body.anchor.set(0.5)

        this.backWing = new Sprite(ASSET_STORE.getTextureAsset("angel2LeftWing"))
        this.backWing.anchor.set(0.2, 0.8)
        this.backWing.position.set(20, -105)

        this.frontWing = new Sprite(ASSET_STORE.getTextureAsset("angel2RightWing"))
        this.frontWing.anchor.set(0.05, 0.8)
        this.frontWing.position.set(90, -10)

        this.leftArm = new Sprite(ASSET_STORE.getTextureAsset("angel2LeftArm"))
        this.leftArm.anchor.set(1, 0.5)
        this.leftArm.position.set(-40, 85)

        this.rightArm = new Sprite(ASSET_STORE.getTextureAsset("angel2RightArm"))
        this.rightArm.anchor.set(1, 0)
        this.rightArm.position.set(40, 85)

        this.legs = new Sprite(ASSET_STORE.getTextureAsset("angel2Legs"))
        this.legs.anchor.set(0.3, 0.1)
        this.legs.position.set(40, 130)

        this.addChild(this.backWing, this.legs, this.leftArm, this.body, this.frontWing, this.rightArm)
        //
        // let graphics = new Graphics()
        // graphics.beginFill(0xff00ff)
        // graphics.drawCircle(this.frontWing.position.x, this.frontWing.position.y, 10)
        // graphics.drawCircle(this.backWing.position.x, this.backWing.position.y, 10)
        // graphics.drawCircle(this.legs.position.x, this.legs.position.y, 10)
        // graphics.drawCircle(this.leftArm.position.x, this.leftArm.position.y, 10)
        // graphics.drawCircle(this.rightArm.position.x, this.rightArm.position.y, 10)
        // graphics.endFill()
        //this.addChild(graphics)
    }

    startAnimating() {
        let currentY = this.position.y
        this.legs.rotation = 0.3
        this.frontWing.rotation = -0.2
        this.backWing.rotation = -0.2
        this.leftArm.rotation = 0
        this.rightArm.rotation = 0
        this.moveUpDownTween = gsap.to(this.position, {
            y: currentY - 50,
            duration: 4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.frontWingMoveTween = gsap.to(this.frontWing, {
            rotation: 0.2,
            duration: 0.4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.backWingMoveTween = gsap.to(this.backWing, {
            rotation: 0.2,
            duration: 0.4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.legsMoveTween = gsap.to(this.legs, {
            rotation: -0.2,
            duration: 3,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.leftArmMoveTween = gsap.to(this.leftArm, {
            rotation: -0.1,
            duration: 4,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1
        })
        this.rightArmMoveTween = gsap.to(this.rightArm, {
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
        this.leftArmMoveTween?.pause()
        this.rightArmMoveTween?.pause()
        this.legsMoveTween?.pause()
    }

}