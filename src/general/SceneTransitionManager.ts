import {Container, Graphics} from "pixi.js";
import {GAME_HEIGHT, GAME_WIDTH, SCENE_MANAGER} from "../index";

export class SceneTransitionManager extends Container {
    overlay: Graphics

    constructor() {
        super();
        this.overlay = new Graphics()
        this.overlay.beginFill(0xF3AFB1)
        this.overlay.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        this.overlay.endFill()
        this.zIndex = 100
        this.alpha = 0

        this.addChild(this.overlay)
    }

    async transitionTo(sceneID: string) {
        await gsap.to(this, {alpha: 1, duration: 0.5, ease: Quad.easeInOut})
        SCENE_MANAGER.start(sceneID)
        await gsap.to(this, {alpha: 0, duration: 0.5, ease: Quad.easeInOut})
    }
}