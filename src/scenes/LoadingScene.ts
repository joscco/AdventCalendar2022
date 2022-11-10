import Scene from "./general/Scene";
import {Application, Text} from "pixi.js";
import {GAME_HEIGHT, GAME_WIDTH} from "../index";
import {Oven} from "../gameobjects/LoadingScene/Oven";
import {LoadingBar} from "../gameobjects/LoadingScene/LoadingBar";

export class LoadingScene extends Scene {

    oven: Oven
    loadingBar: LoadingBar
    loadingText: Text

    constructor(app: Application) {
        super();
        this.app = app

        this.oven = new Oven()
        this.oven.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100)
        this.oven.scale.set(0)

        this.loadingBar = new LoadingBar()
        this.loadingBar.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 250)
        this.loadingBar.scale.set(0)

        this.loadingText = new Text("Preheating Oven...",
            {fontFamily: "Futurahandwritten", fontSize: 60, fill: 0xffffff})
        this.loadingText.anchor.set(0.5)
        this.loadingText.scale.set(0)
        this.loadingText.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 300)

        this.addChild(this.oven, this.loadingBar, this.loadingText)
    }

    async start() {
        await this.blendInOven()
        await this.blendInLoadingBar()
        await this.blendInLoadingText()
    }

    private async blendInOven() {
        await gsap.to(this.oven.scale, {
            x: 1, y: 1, ease: Back.easeOut, duration: 0.3
        })
    }

    private async blendInLoadingBar() {
        await gsap.to(this.loadingBar.scale, {
            x: 1, y: 1, ease: Back.easeOut, duration: 0.3
        })
    }

    private async blendInLoadingText() {
        await gsap.to(this.loadingText.scale, {
            x: 1, y: 1, ease: Back.easeOut, duration: 0.3
        })
    }

    setProgress(percent: number) {
        this.loadingBar.setProgress(percent)
        this.oven.setProgress(percent)
    }
}