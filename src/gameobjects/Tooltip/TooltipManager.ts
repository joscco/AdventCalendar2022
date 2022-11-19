// Tooltip which gets a Sprite that it attaches to and a method of that sprite delivering the text

import {Container} from "pixi.js";
import {Tooltip} from "./Tooltip";
import {sleep, Vector2D} from "../../General/Helpers";

export class TooltipManager extends Container{

    private tooltip: Tooltip
    private enabled: boolean = true
    private currentBearer?: Container
    private pointerDown: boolean = false
    private offsetX: number = 0
    private offsetY: number = -110
    private lastMousePosition: Vector2D = {x: -100, y: -100}

    constructor() {
        super()
        this.tooltip = new Tooltip(this, this.offsetX, this.offsetY)
        this.zIndex = 100
        this.addChild(this.tooltip)
    }

    registerTooltipFor(bearer: Container, textDeliverer: () => string, isEnabled: () => boolean = () => true) {
        bearer.interactive = true

        bearer.on("pointerdown", () => this.pointerDown = true)

        bearer.on("pointerup", () => this.pointerDown = false)

        bearer.on("pointerupoutside", () => this.pointerDown = false)

        bearer.on("pointerover", async (event) => {
            this.lastMousePosition = event.global
            this.currentBearer = bearer
            if (this.enabled && isEnabled()) {
                await sleep(2000);
                // If we still hover the same thing, show the tooltip
                if (this.enabled && this.currentBearer === bearer && !this.pointerDown) {
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

    hideTooltip(): void {
        this.tooltip.hide()
    }

    disableTooltips() {
        this.tooltip.hide()
        this.enabled = false
    }

    enableTooltips() {
        this.enabled = true
    }


}