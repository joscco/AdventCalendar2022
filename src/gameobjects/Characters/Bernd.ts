import {Container, Sprite} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH} from "../../index";
import {sleep} from "../../General/Helpers";

export class Bernd extends Container {
    private head: Sprite;
    private body: Sprite;
    private backBody: any;
    private leftArm: Sprite;
    private rightArm: Sprite;
    private eyes: Sprite;
    private headTween: gsap.core.Tween;
    private bodyTween: gsap.core.Tween;
    private leftArmTween: gsap.core.Tween;
    private rightArmTween: gsap.core.Tween;
    private tweens: gsap.core.Tween[];

    constructor() {
        super();

        this.head = new Sprite(ASSET_STORE.getTextureAsset("bernd_head"));
        this.head.position.set(182, -220)
        this.headTween = gsap.to(this.head, {duration: 2, x: 175, y: -215, yoyo: true, repeat: -1, ease: Sine.easeInOut})

        this.body = new Sprite(ASSET_STORE.getTextureAsset("bernd_torso"));
        this.bodyTween = gsap.to(this.body.scale, {duration: 3, x: 1.01, y: 0.98, yoyo: true, repeat: -1, ease: Sine.easeInOut})
        this.backBody = new Sprite(ASSET_STORE.getTextureAsset("bernd_back_torso"));
        this.backBody.position.set(355, 100)

        this.backBody.zIndex = -2

        this.leftArm = new Sprite(ASSET_STORE.getTextureAsset("bernd_left_arm_leaning"))
        this.leftArm.position.set(190, 140)
        this.leftArm.pivot.set(240, 60)
        this.leftArmTween = gsap.to(this.leftArm, {duration: 3, angle: -10, yoyo: true, repeat: -1, ease: Sine.easeInOut})

        this.rightArm = new Sprite(ASSET_STORE.getTextureAsset("bernd_right_arm_leaning"))
        this.rightArm.zIndex = -1
        this.rightArm.position.set(475, 160)
        this.rightArm.pivot.set(70, 70)
        this.rightArm.angle = 2
        this.rightArmTween = gsap.to(this.rightArm, {duration: 3, angle: 10, yoyo: true, repeat: -1, ease: Sine.easeInOut})
        this.addChild(this.rightArm)

        this.eyes = new Sprite(ASSET_STORE.getTextureAsset("bernd_eyes_open"));
        this.eyes.position.set(45, 80)

        this.head.addChild(this.eyes)
        this.body.addChild(this.head)
        this.addChild(this.backBody, this.leftArm, this.rightArm, this.body)
        this.position.set(GAME_WIDTH / 2 + 400, GAME_HEIGHT / 2 + 800)

        this.blink()

        this.tweens = [this.headTween, this.bodyTween, this.leftArmTween, this.rightArmTween]
    }

    private closeEyes() {
        this.eyes.texture = ASSET_STORE.getTextureAsset("bernd_eyes_closed")
    }

    private openEyes() {
        this.eyes.texture = ASSET_STORE.getTextureAsset("bernd_eyes_open")
    }

    private async blink() {
        let blinkTime = Math.random() * 500
        let unblinkTime = Math.random() * 8000

        this.closeEyes()
        await sleep(blinkTime)

        this.openEyes()
        await sleep(unblinkTime)

        this.blink()
    }

    hide() {
        this.position.y = GAME_HEIGHT / 2 + 800
    }

    show() {
        this.position.y = 480
    }

    async blendIn() {
        this.tweens.forEach(tween => tween.resume())
        await gsap.to(this.position, {duration: 1, y: 480, ease: Quart.easeInOut});
    }

    async blendOut() {
        await gsap.to(this.position, {duration: 1, y: GAME_HEIGHT/2 + 800, ease: Quart.easeInOut});
        this.tweens.forEach(tween => tween.pause())
    }
}