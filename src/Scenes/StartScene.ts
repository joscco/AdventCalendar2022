import {Application, Container, MIPMAP_MODES, Sprite, Text, TilingSprite} from 'pixi.js';
import {ASSET_MANAGER, BERND, GAME_HEIGHT, GAME_WIDTH, LANGUAGE_MANAGER} from "../index";
import Scene from "./Basics/Scene";
import {Texture} from "@pixi/core";
import {StartButton} from "../UI/Buttons/StartButton";
import {LanguageButton} from "../UI/Buttons/LanguageButton";
import {Language, LanguageDependantItem} from "../General/LanguageManager";

export class StartScene extends Scene implements LanguageDependantItem {

    lettersContainer: Container
    letters: Sprite[] = [];
    pretitle: Text;
    startButton: StartButton;
    languageButton: LanguageButton;
    started: boolean = false
    private backgroundMoveTween?: gsap.core.Tween;

    constructor(app: Application) {
        super();
        this.app = app

        this.addScrollingBackground(ASSET_MANAGER.getTextureAsset("startScreenBackgroundPattern"));

        this.pretitle = this.addPretitle()
        this.lettersContainer = this.addTitle(ASSET_MANAGER.getTitleLetterTextures());
        this.startButton = this.initStartButton();
        this.languageButton = this.initLanguageButton();

        LANGUAGE_MANAGER.addLanguageItem(this)
    }

    setLanguage(newLanguage: Language): void {
        this.changePretitleText(newLanguage)
    }

    private async changePretitleText(newLanguage: Language) {
        await gsap.to(this.pretitle.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
        this.pretitle.text = newLanguage === "en" ? "joscco presents" : "joscco präsentiert"
        gsap.to(this.pretitle.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut})
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

    private addPretitle(): Text {
        let pretitle = new Text("joscco presents", {fontFamily: "Futurahandwritten", fontWeight: "bold", fontSize: 50, fill: 0x381a1b});
        pretitle.anchor.set(0.5)
        pretitle.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 125)
        this.addChild(pretitle)
        return pretitle
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
        await gsap.to(this.pretitle, {duration: 1, y: 125, ease: Back.easeInOut})
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

    private initLanguageButton() {
        let button = new LanguageButton()
        button.position.set(GAME_WIDTH - 210, 125)
        this.addChild(button)
        return button;
    }
}
