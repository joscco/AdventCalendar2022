import {Container, NineSlicePlane, Sprite} from "pixi.js";
import {ASSET_STORE} from "../../index";

export class LoadingBar extends Container {

    innerBar: Sprite
    outerBar: Sprite
    barMask: NineSlicePlane

    constructor() {
        super();

        this.innerBar = new Sprite(ASSET_STORE.LOADING_SCENE!.innerLoadingBar)
        this.innerBar.anchor.set(0, 0.5)
        this.outerBar = new Sprite(ASSET_STORE.LOADING_SCENE!.outerLoadingBar)
        this.outerBar.anchor.set(0, 0.5)

        this.barMask = new NineSlicePlane(ASSET_STORE.LOADING_SCENE!.innerLoadingBar, 30, 0, 30, 0)
        this.barMask.position.set(0, -this.innerBar.height / 2)
        this.barMask.scale.set(0, 1)
        this.innerBar.mask = this.barMask

        this.addChild(this.innerBar, this.outerBar, this.barMask)

        this.pivot.set(this.width / 2, this.height / 2)
    }

    setProgress(from: number, to: number, percent: number) {
        this.barMask.scale.set(from + (to - from) * percent, 1)
    }

}