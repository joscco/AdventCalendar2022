import {Application, Container, Sprite, TilingSprite} from 'pixi.js';
import {GAME_HEIGHT, GAME_WIDTH, SCENE_MANAGER} from "../index";
import {gsap, Linear, Back, Quart} from "gsap";
import Scene from "./Scene";
import {Assets} from "@pixi/assets";
import {ScalingButton} from "../ui/Buttons/ScalingButton";
import {Texture} from "@pixi/core";

export interface StartSceneAssets {
    torso: Texture,
    head: Texture,
    eyes_closed: Texture,
    eyes_open: Texture,
    left_arm_leaning: Texture,
    left_arm_showing: Texture,
    right_arm_leaning: Texture,
    backgroundPattern: Texture,
    pretitle: Texture,
    startButton: Texture,
    title_0: Texture,
    title_1: Texture,
    title_2: Texture,
    title_3: Texture,
    title_4: Texture,
    title_5: Texture,
    title_6: Texture,
    title_7: Texture,
    title_8: Texture,
    title_9: Texture,
    title_10: Texture,
    title_11: Texture,
    title_12: Texture,
    title_13: Texture,
    title_14: Texture
}

export class StartScene extends Scene {

    letters: Sprite[] = [];
    pretitle?: Sprite;
    startButton?: Sprite;

    constructor(app: Application) {
        super();
        this.app = app
    }

    async start() {
        const assets: StartSceneAssets = await Assets.loadBundle("startSceneAssets")

        this.addScrollingBackground(assets.backgroundPattern);
        // this.addBernd(assets.torso, assets.head, assets.eyes_closed,
        //     assets.eyes_open, assets.left_arm_leaning, assets.left_arm_showing, assets.right_arm_leaning);
        this.addPretitle(assets.pretitle)
        this.addTitle([assets.title_0, assets.title_1, assets.title_2, assets.title_3,
            assets.title_4, assets.title_5, assets.title_6, assets.title_7,
            assets.title_7, assets.title_8, assets.title_9, assets.title_10,
            assets.title_11, assets.title_12, assets.title_13, assets.title_14]);
        this.addStartButton(assets.startButton);

        await this.blendInPretitle();
        await this.blendInTitle();
        await this.scaleInStartButton();
    }

    private addStartButton(startButtonTexture: Texture) {
        this.startButton = new ScalingButton(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2 + 325,
            startButtonTexture,
            () => {
                SCENE_MANAGER.start("startScene")
            })
        this.startButton.scale.set(0)
        this.addChild(this.startButton);
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

    private addBernd() {

    }

    private addPretitle(pretitleTexture: Texture) {
        this.pretitle = new Sprite(pretitleTexture);
        this.pretitle.anchor.set(0.5)
        this.pretitle.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 100)
        this.addChild(this.pretitle)
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

    private async scaleInStartButton() {
        await gsap.to(this.startButton!.scale, {duration: 1, x: 1, y: 1, ease: Quart.easeInOut, delay: 1.5})
    }
}
