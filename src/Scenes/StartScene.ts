import {Application, Container, MIPMAP_MODES, Sprite, TilingSprite} from 'pixi.js';
import {ASSET_STORE, BERND, GAME_HEIGHT, GAME_WIDTH} from "../index";
import Scene from "./Basics/Scene";
import {Texture} from "@pixi/core";
import {StartButton} from "../UI/Buttons/StartButton";

export class StartScene extends Scene {

    lettersContainer: Container
    letters: Sprite[] = [];
    pretitle?: Sprite;
    startButton: StartButton;
    started: boolean = false
    private backgroundMoveTween?: gsap.core.Tween;

    constructor(app: Application) {
        super();
        this.app = app

        this.addScrollingBackground(ASSET_STORE.getTextureAsset("startScreenBackgroundPattern"));

        this.addPretitle(ASSET_STORE.getTextureAsset("startScreenPretitle"))
        this.lettersContainer = this.addTitle(ASSET_STORE.getTitleLetterTextures());
        this.startButton = this.initStartButton();
    }

    async start(): Promise<void> {
        if (!this.started) {
            await this.blendInPretitle();
            await BERND.blendIn();
            await this.blendInTitle();
            await this.scaleInStartButton();

            this.lettersContainer.cacheAsBitmap
        }
        this.started = true
    }

    beforeFadeIn() {
        this.backgroundMoveTween?.resume()
        if (this.started) {
            BERND.show()
        }
    }

    afterFadeOut() {
        this.backgroundMoveTween?.pause()
        BERND.hide()
    }

    private addScrollingBackground(backgroundPatternTexture: Texture) {
        let scrollingBackground = new TilingSprite(backgroundPatternTexture)

        scrollingBackground.width = 2 * GAME_WIDTH
        scrollingBackground.height = 2 * GAME_HEIGHT
        scrollingBackground.clampMargin = 0.5
        scrollingBackground.texture.baseTexture.mipmap = MIPMAP_MODES.OFF

        this.backgroundMoveTween = gsap.to(scrollingBackground.tilePosition, {
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
        this.pretitle.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 125)
        this.addChild(this.pretitle)
    }

    private addTitle(lettersTextures: Texture[]): Container {
        let titleContainer = new Container()
         titleContainer.x = GAME_WIDTH / 2;
         titleContainer.y = 450;

        this.letters = lettersTextures.map(texture => new Sprite(texture))
        this.letters.map(letter => {
            letter.cacheAsBitmap = true
            letter.position.y = 1000;
            titleContainer.addChild(letter);
        })

        titleContainer.pivot.set(titleContainer.width / 2, titleContainer.height / 2)

        this.addChild(titleContainer);
        return titleContainer
    }

    private initStartButton(): StartButton {
        let startButton = new StartButton()
        startButton.x = GAME_WIDTH / 2
        startButton.y = GAME_HEIGHT / 2 + 325
        startButton.scale.set(0)
        this.addChild(startButton);
        return startButton
    }

    private async blendInPretitle() {
        await gsap.to(this.pretitle!, {duration: 1, y: 125, ease: Back.easeInOut})
    }

    private async blendInTitle() {
        for (const letter of this.letters) {
            const index = this.letters.indexOf(letter);
            gsap.to(letter.position, {duration: 1, y: 0, ease: Back.easeInOut, delay: index * 0.1});
        }
    }

    private async scaleInStartButton() {
        this.startButton.interactive = false
        await gsap.to(this.startButton!.scale, {duration: 1, x: 1, y: 1, ease: Quart.easeInOut, delay: 1.5})
        this.startButton.interactive = true
    }
}
