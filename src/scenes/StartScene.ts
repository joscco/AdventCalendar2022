import {Application, Container, Sprite, TilingSprite} from 'pixi.js';
import {GAME_HEIGHT, GAME_WIDTH, SCENE_MANAGER, START_SCENE_ASSETS} from "../index";
import {Back, gsap, Linear, Quart, Sine} from "gsap";
import Scene from "./Scene";
import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {Texture} from "@pixi/core";

export class StartScene extends Scene {

    letters: Sprite[] = [];
    pretitle?: Sprite;
    bernd?: Container;
    startButton?: Sprite;

    constructor(app: Application) {
        super();
        this.app = app
    }

    async start(): Promise<void> {
        this.addScrollingBackground(START_SCENE_ASSETS.backgroundPattern);
        this.addBernd(START_SCENE_ASSETS.head, START_SCENE_ASSETS.torso, START_SCENE_ASSETS.backTorso, START_SCENE_ASSETS.left_arm_leaning,
            START_SCENE_ASSETS.right_arm_leaning, START_SCENE_ASSETS.eyes_open, START_SCENE_ASSETS.eyes_closed);
        this.addPretitle(START_SCENE_ASSETS.pretitle)
        this.addTitle([START_SCENE_ASSETS.title_0, START_SCENE_ASSETS.title_1, START_SCENE_ASSETS.title_2, START_SCENE_ASSETS.title_3,
            START_SCENE_ASSETS.title_4, START_SCENE_ASSETS.title_5, START_SCENE_ASSETS.title_6, START_SCENE_ASSETS.title_7,
            START_SCENE_ASSETS.title_8, START_SCENE_ASSETS.title_9, START_SCENE_ASSETS.title_10, START_SCENE_ASSETS.title_11,
            START_SCENE_ASSETS.title_12, START_SCENE_ASSETS.title_13, START_SCENE_ASSETS.title_14]);
        this.addStartButton(START_SCENE_ASSETS.startButton);

        await this.blendInPretitle();
        await this.blendInBernd();
        await this.blendInTitle();
        await this.scaleInStartButton();
    }

    private addScrollingBackground(backgroundPatternTexture: Texture) {
        let scrollingBackground = new TilingSprite(backgroundPatternTexture)
        scrollingBackground.width = 2 * GAME_WIDTH
        scrollingBackground.height = 2 * GAME_HEIGHT
        gsap.to(scrollingBackground.tilePosition, {
            x: backgroundPatternTexture.width,
            y: -backgroundPatternTexture.height,
            duration: 15,
            repeat: -1,
            ease: Linear.easeNone
        })
        this.addChild(scrollingBackground);
    }

    private addPretitle(pretitleTexture: Texture) {
        this.pretitle = new Sprite(pretitleTexture);
        this.pretitle.anchor.set(0.5)
        this.pretitle.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 100)
        this.addChild(this.pretitle)
    }

    private addTitle(lettersTextures: Texture[]) {
        let titleContainer = new Container()
        titleContainer.x = GAME_WIDTH / 2;
        titleContainer.y = GAME_HEIGHT / 2 - 75;

        this.letters = lettersTextures.map(texture => new Sprite(texture))
        this.letters.map(letter => {
            letter.position.y = 1000;
            titleContainer.addChild(letter);
        })

        titleContainer.pivot.set(titleContainer.width / 2, titleContainer.height / 2)

        this.addChild(titleContainer);
    }

    private addStartButton(startButtonTexture: Texture) {
        this.startButton = new ScalingButton(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2 + 325,
            startButtonTexture,
            () => {
                SCENE_MANAGER.start("gridEditorScene")
            })
        this.startButton.scale.set(0)
        this.addChild(this.startButton);
    }

    private addBernd(headTexture: Texture, bodyTexture: Texture, backBodyTexture: Texture,
                     leftArmTexture: Texture, rightArmTexture: Texture,
                     openEyesTexture: Texture, closedEyesTexture: Texture) {
        this.bernd = new Container()
        this.bernd.sortableChildren = true

        let head = new Sprite(headTexture);
        head.position.set(182, -220)
        gsap.to(head, {duration: 2, x: 175, y: -215, yoyo: true, repeat: -1, ease: Sine.easeInOut})

        let body = new Sprite(bodyTexture);
        gsap.to(body.scale, {duration: 3, x: 1.01, y: 0.98, yoyo: true, repeat: -1, ease: Sine.easeInOut})
        let backBody = new Sprite(backBodyTexture);
        backBody.position.set(355, 100)

        backBody.zIndex = -2
        let leftArm = new Sprite(leftArmTexture)
        leftArm.zIndex = -1
        leftArm.position.set(190, 140)

        leftArm.pivot.set(240, 60)

        gsap.to(leftArm, {duration: 3, angle: -10, yoyo: true, repeat: -1, ease: Sine.easeInOut})
        let rightArm = new Sprite(rightArmTexture)
        rightArm.zIndex = -1
        rightArm.position.set(475, 160)
        rightArm.pivot.set(70, 70)
        rightArm.angle = 2
        gsap.to(rightArm, {duration: 3, angle: 10, yoyo: true, repeat: -1, ease: Sine.easeInOut})

        this.addChild(rightArm)
        let eyes = new Sprite(openEyesTexture);

        eyes.position.set(45, 80)
        head.addChild(eyes)
        body.addChild(head)
        this.bernd.addChild(backBody, leftArm, rightArm, body)
        this.bernd.position.set(GAME_WIDTH / 2 + 400, GAME_HEIGHT / 2 + 800)
        this.addChild(this.bernd)
    }

    private async blendInPretitle() {
        await gsap.to(this.pretitle!, {duration: 1, y: GAME_HEIGHT / 2 - 400, ease: Back.easeInOut})
    }

    private async blendInTitle() {
        for (const letter of this.letters) {
            const index = this.letters.indexOf(letter);
            gsap.to(letter.position, {duration: 1, y: 0, ease: Back.easeInOut, delay: index * 0.1});
        }
    }

    private async blendInBernd() {
        await gsap.to(this.bernd!, {duration: 1, y: GAME_HEIGHT / 2 - 20, ease: Quart.easeInOut});
    }

    private async scaleInStartButton() {
        await gsap.to(this.startButton!.scale, {duration: 1, x: 1, y: 1, ease: Quart.easeInOut, delay: 1.5})
    }


}
