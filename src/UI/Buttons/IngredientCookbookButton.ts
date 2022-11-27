import {ScalingButton} from "./ScalingButton";
import {Texture} from "pixi.js";
import {ASSET_MANAGER, EVENT_EMITTER, SOUND_MANAGER} from "../../index";
import {CookbookOverlay} from "../../GameObjects/GameScreen/IngredientBook/CookbookOverlay";

export class IngredientCookbookButton extends ScalingButton {

    constructor(private overlay: CookbookOverlay) {
        super();
    }

    getTexture(): Texture | null {
        return this.overlay?.showingCookBook
            ? ASSET_MANAGER.getTextureAsset("recipeButtonOpen")
            : ASSET_MANAGER.getTextureAsset("recipeButtonClosed");
    }

    onClick(): void {
        EVENT_EMITTER.emit("clicked_ingredient_cookbook")
        SOUND_MANAGER.playBlub()
        this.overlay.toggleBlendCookbook()
    }

    show() {
        this.scale.set(1)
    }

    hide() {
        this.scale.set(0)
    }

    blendOut() {
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.5, ease: Back.easeIn})
    }
}