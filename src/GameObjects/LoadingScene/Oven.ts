import {Container, Sprite} from "pixi.js";
import {ASSET_MANAGER} from "../../index";
import {sleep} from "../../General/Helpers";

export class Oven extends Container{

    ovenContainer: Container;
    ovenTop: Sprite;
    redder: Sprite;
    steam: Sprite;

    constructor() {
        super();

        this.ovenContainer = new Container()
        this.ovenContainer.sortableChildren = true

        this.ovenTop = new Sprite(ASSET_MANAGER.LOADING_SCENE_ASSETS!.closedOven)
        this.ovenTop.anchor.set(0.5)
        this.ovenTop.zIndex = 1

        this.redder = new Sprite(ASSET_MANAGER.LOADING_SCENE_ASSETS!.redder)
        this.redder.anchor.set(0.5)
        this.redder.position.set(0, 50)
        this.redder.zIndex = 0
        this.redder.tint = 0x822d28

        this.ovenContainer.addChild(this.redder, this.ovenTop)

        this.steam = new Sprite(ASSET_MANAGER.LOADING_SCENE_ASSETS!.steam)
        this.steam.anchor.set(0.5)
        this.steam.scale.set(0)

        this.addChild(this.ovenContainer, this.steam)
    }

    async setProgress(percent: number) {
        this.redder.tint = this.lerpColor(0x822d28, 0xff9138, percent)
    }

    lerpColor(a: number, b: number, amount: number): number {
        let ar = a >> 16;
        let ag = a >> 8 & 0xff;
        let ab = a & 0xff;
        let br = b >> 16;
        let bg = b >> 8 & 0xff;
        let bb = b & 0xff;
        let rr = ar + amount * (br - ar);
        let rg = ag + amount * (bg - ag);
        let rb = ab + amount * (bb - ab);

        return ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0);
    }

    async open() {
        await gsap.to(this.ovenContainer.scale, {x: 1.1, y: 0, duration: 0.2, ease: Back.easeIn})
        this.ovenTop.texture = ASSET_MANAGER.LOADING_SCENE_ASSETS!.openOven
        await gsap.to(this.ovenContainer.scale, {x: 1, y: 1, duration: 0.2, ease: Back.easeOut})
        await gsap.to(this.steam.scale, {x: 1, y: 1, duration: 0.2, ease: Back.easeOut})
        await sleep(500);
    }
}