import {Container, NineSlicePlane, Sprite, Text} from "pixi.js";
import {Assets} from "@pixi/assets";
import {Tooltip} from "./Tooltip";
import {ExpoEase, tween} from "../../index";

export class TooltipRenderer extends Container {

    private VERTICAL_PADDING = 20;
    private HORIZONTAL_PADDING = 20;
    private ADDITIONAL_OFFSET_Y_WHEN_OUT = 20;
    private initialOffsetY: number
    private parentTooltip?: Tooltip
    private textRectangle?: NineSlicePlane
    private textObject?: Text
    private spike?: Sprite

    constructor(parent: Tooltip, positionX: number, positionY: number) {
        super();
        this.parentTooltip = parent

        this.position.x = positionX
        this.position.y = positionY
        this.initialOffsetY = positionY
    }

    async init(): Promise<void> {
        let assets = await Assets.loadBundle("tooltipAssets")
        this.textRectangle = new NineSlicePlane(assets.tooltipRectangle, 20, 20, 20, 20)
        this.textObject = new Text("", {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xffffff})
        this.textObject.anchor.set(0.5)

        this.spike = new Sprite(assets.tooltipSpike)
        this.spike.anchor.set(0.5, 0)

        this.addChild(this.textRectangle)
        this.textRectangle.addChild(this.spike)
        this.textRectangle.addChild(this.textObject)
        this.scale.set(0)
    }

    update(text: string): void {
        this.textObject!.text = text
        this.textRectangle!.width = this.textObject!.width + 2 * this.VERTICAL_PADDING
        this.textRectangle!.height = this.textObject!.height + 2 * this.HORIZONTAL_PADDING

        this.textRectangle!.pivot.x = this.textRectangle!.width / 2
        this.textRectangle!.pivot.y = this.textRectangle!.height / 2
        this.textObject!.position.x = this.textRectangle!.width / 2
        this.textObject!.position.y = this.textRectangle!.height / 2
        this.spike!.position.x = this.textRectangle!.width / 2
        this.spike!.position.y = this.textRectangle!.height
    }

    show(): void {
        tween.to(this.scale, {
            x: 1,
            y: 1,
            duration: 0.3,
            ease: ExpoEase.easeOut
        })
        tween.to(this.position, {
            y: this.initialOffsetY,
            duration: 0.4,
            delay: 0.1,
            ease: ExpoEase.easeOut
        })
    }

    hide(): void {
        tween.to(this.scale, {
            x: 0,
            y: 0,
            duration: 0.4,
            delay: 0.1,
            ease: ExpoEase.easeOut
        })
        tween.to(this.position, {
            y: this.initialOffsetY + this.ADDITIONAL_OFFSET_Y_WHEN_OUT,
            duration: 0.3,
            ease: ExpoEase.easeOut
        })
    }

}