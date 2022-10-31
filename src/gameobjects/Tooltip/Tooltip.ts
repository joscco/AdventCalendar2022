// Tooltip which gets a Sprite that it attaches to and a method of that sprite delivering the text

import {Sprite} from "pixi.js";
import {TooltipRenderer} from "./TooltipRenderer";

export class Tooltip {

    private renderer: TooltipRenderer
    private owner: Sprite
    private textDeliverer: () => string
    private offsetX: number = 0
    private offsetY: number = -100
    private enabled: boolean = true

    constructor(owner: Sprite, textDeliverer: () => string) {
        this.renderer = new TooltipRenderer(this, this.offsetX, this.offsetY)
        this.owner = owner
        this.textDeliverer = textDeliverer

        this.owner.addChild(this.renderer)

        this.owner.interactive = true
        this.owner.buttonMode = true
        this.owner.on("pointerover", () => {if (this.enabled) {this.showTooltip()}})
        this.owner.on("pointerout", () => {if (this.enabled) {this.hideTooltip()}})
    }

    setEnabled(value: boolean) {
        this.enabled = value
        if (!this.enabled) {
            this.hideTooltip()
        }
    }

    showTooltip(): void {
        this.renderer.update(this.textDeliverer())
        this.renderer.show()
    }

    hideTooltip(): void {
        this.renderer.hide()
    }
}