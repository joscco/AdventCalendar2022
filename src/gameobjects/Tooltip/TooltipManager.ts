// Tooltip which gets a Sprite that it attaches to and a method of that sprite delivering the text

import {Container} from "pixi.js";
import {Tooltip} from "./Tooltip";
import {Vector2D} from "../Grid/Grid";

export class TooltipManager {

    private tooltip: Tooltip
    private owner: Container
    private currentBearer?: Container
    private offsetX: number = 0
    private offsetY: number = -110
    private lastMousePosition: Vector2D = {x: -100, y: -100}

    constructor(owner: Container) {
        this.owner = owner

        this.tooltip = new Tooltip(this, this.offsetX, this.offsetY)
        this.tooltip.zIndex = 100
        this.owner.addChild(this.tooltip)
        this.owner.sortableChildren = true
    }

    registerTooltipFor(bearer: Container, textDeliverer: () => string, isEnabled: () => boolean = () => true) {
        bearer.interactive = true
        bearer.cursor = "pointer"

        bearer.on("pointerover", async (event) => {
            this.lastMousePosition = event.global
            this.currentBearer = bearer
            if (isEnabled()) {
                await new Promise(resolve => setTimeout(resolve, 500));
                // If we still hover the same thing, show the tooltip
                if (this.currentBearer === bearer) {
                    let bearer = this.currentBearer
                    let currentMousePosition = bearer.getGlobalPosition()
                    this.showTooltip(currentMousePosition, textDeliverer())
                }
            }
        })

        bearer.on("pointerout", (event) => {
            this.lastMousePosition = event.global
            this.currentBearer = undefined
            this.hideTooltip()
        })
    }

    showTooltip(position: Vector2D, text: string): void {
        this.tooltip.repositionTo(position)
        this.tooltip.update(text)
        this.tooltip.show()
    }

    private hideTooltip(): void {
        this.tooltip.hide()
    }
}