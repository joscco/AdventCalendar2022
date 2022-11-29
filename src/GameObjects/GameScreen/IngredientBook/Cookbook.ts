import {Container, Graphics, Sprite} from "pixi.js";
import {App, ASSET_MANAGER, GAME_DATA, GAME_HEIGHT, GAME_WIDTH} from "../../../index";
import {CookbookEntry} from "./CookbookEntry";
import {clamp, Vector2D, vectorAdd} from "../../../General/Helpers";
import {MousewheelListener} from "../../../General/MouseWheelPlugin";
import {IngredientID, IngredientIDs} from "../Ingredient";
import {CookbookOverlay} from "./CookbookOverlay";
import {VerticalSlider} from "./VerticalSlider";

export class Cookbook extends Container {
    private readonly backgroundSprite: Sprite;
    private readonly slidingHand: Sprite;
    private slidingHandTween?: gsap.core.Tween;
    private fadingOutSlidingHand: boolean = false

    content: Container;
    items: CookbookEntry[] = []
    contentMask: Graphics

    scrollBar: VerticalSlider;
    SCROLL_BAR_MIN_Y: number = 40
    SCROLL_BAR_MAX_Y: number = 750

    contentDragging: boolean = false

    CONTENT_MIN_Y: number = 0
    CONTENT_MAX_Y: number = 0

    constructor(private overlay: CookbookOverlay) {
        super()

        this.sortableChildren = true
        this.position.set(GAME_WIDTH / 2 + 160, GAME_HEIGHT + 200)

        this.backgroundSprite = new Sprite(ASSET_MANAGER.getTextureAsset("ingredientOverviewBook"))
        this.backgroundSprite.anchor.set(0.5, 0)
        this.backgroundSprite.zIndex = 0

        this.content = new Container()
        this.content.position.y = this.CONTENT_MAX_Y
        this.content.interactiveChildren = false

        this.contentMask = new Graphics()
        this.contentMask.beginFill(0x000000)
        this.contentMask.position.set(-525, 20)
        this.contentMask.drawRect(0, 0, 1050, 800)
        this.contentMask.endFill()
        this.contentMask.zIndex = 10
        this.contentMask.interactive = true
        this.addChild(this.contentMask)
        this.content.mask = this.contentMask

        this.items = this.initEntries()
        this.updateEntries(GAME_DATA.getUnlockedIngredients())

        this.initContentDragging();

        this.slidingHand = new Sprite(ASSET_MANAGER.getTextureAsset("dialog_pointer_hand"))
        this.slidingHand.scale.set(0)
        this.slidingHand.anchor.set(0.25, 0.1)
        this.slidingHand.angle = 20

        this.scrollBar = new VerticalSlider({
            increaseToBottom: true,
            outerTexture: ASSET_MANAGER.getTextureAsset("ingredientOverviewScrollBar"),
            knobTexture: ASSET_MANAGER.getTextureAsset("ingredientOverviewScrollFlag"),
            anchorKnob: {x: 0, y: 0.5},
            offsetX: -10,
            marginBottom: 50,
            marginTop: 50
        })
        this.scrollBar.position.set(600, this.SCROLL_BAR_MIN_Y)
        this.scrollBar.setValueHandler(val => this.onUpdateKnobPosition(val))

        this.addChild(this.backgroundSprite, this.content, this.scrollBar)
        this.scrollBar.addChild(this.slidingHand)
    }

    private initContentDragging() {
        this.contentMask.interactive = true
        this.contentMask.cursor = "pointer"

        let dragOffset: Vector2D

        this.contentMask.on("pointerdown", (event) => {
            let mousePosition: Vector2D = event.data.global
            dragOffset = {
                x: this.content.x - mousePosition.x,
                y: this.content.y - mousePosition.y
            }
            this.contentDragging = true
        })

        this.contentMask.on("pointermove", (event) => {
            if (this.contentDragging) {
                let mousePosition = event.data.global
                this.updateContentPositionByMouse(vectorAdd(mousePosition, dragOffset));
            }
        })

        this.contentMask.on("pointerup", () => {
            this.contentDragging = false
        })

        this.contentMask.on("pointerupoutside", () => {
            this.contentDragging = false
        })

        let mouseWheelListener = new MousewheelListener(App)
        mouseWheelListener.setAction((delta, mousePos) => this.handleWheel(delta, mousePos))
    }

    updateEntries(unlockedIngredients: IngredientID[]) {
        this.repositionEntries(unlockedIngredients)
    }

    private onUpdateKnobPosition(relativeValue: number) {
        this.stopSlidingFinger()
        // Content positions inversely
        this.content.position.y = this.CONTENT_MAX_Y - relativeValue * (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
    }

    private updateContentPositionByMouse(mousePosition: Vector2D) {
        let newY = clamp(mousePosition.y, this.CONTENT_MIN_Y, this.CONTENT_MAX_Y)
        let relativeY = (newY - this.CONTENT_MIN_Y) / (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
        this.scrollBar.updateValue(1 - relativeY)
    }

    private updateContentPosition(offsetY: number) {
        let newY = clamp(this.content.position.y + offsetY, this.CONTENT_MIN_Y, this.CONTENT_MAX_Y)
        let relativeY = (newY - this.CONTENT_MIN_Y) / (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
        this.scrollBar.updateValue(1 - relativeY)
    }

    private handleWheel(delta: number, mousePos: Vector2D): void {
        if (!this.overlay.showingCookBook) {
            return
        }

        let globalMaskPos = this.contentMask.getGlobalPosition()
        let left = globalMaskPos.x
        let top = globalMaskPos.y
        let right = left + this.contentMask.width
        let bottom = top + this.contentMask.height

        if (left <= mousePos.x
            && mousePos.x <= right
            && top <= mousePos.y
            && mousePos.y <= bottom) {
            this.updateContentPosition(delta * 10)
        }
    }

    private initEntries(): CookbookEntry[] {
        let result = [];
        let alphabeticIDs = [...IngredientIDs].sort((a, b) => a.localeCompare(b))
        for (let ingredientID of alphabeticIDs) {
            let newEntry = new CookbookEntry(ingredientID)
            result.push(newEntry)
            this.content.addChild(newEntry)
        }
        return result
    }

    private repositionEntries(unlockedIDs: IngredientID[]) {
        this.hideAllEntries()

        let x = 0
        let currentY = 90

        // Must do it in alphabetical order
        for (let item of this.items) {
            if (unlockedIDs.includes(item.id)) {
                item.show()
                item.position.set(x, currentY)
                currentY += 160
            }
        }

        this.CONTENT_MIN_Y = Math.min(-this.content.height + this.contentMask.height + 10, -10)
    }

    private hideAllEntries() {
        for (let item of this.items) {
            item.hide()
            item.position.set(0, 90)
        }
    }

    async blendIn() {
        await gsap.to(this.position, {y: 120, duration: 0.5, ease: Back.easeInOut})
        this.startSlidingFinger()
    }

    async blendOut() {
        this.stopSlidingFinger()
        await gsap.to(this.position, {y: GAME_HEIGHT + 200, duration: 0.5, ease: Back.easeInOut})
    }

    hide() {
        this.position.y = GAME_HEIGHT + 200
    }

    show() {
        this.position.y = 120
    }

    private async startSlidingFinger() {
        if (GAME_DATA.getUnlockedIngredients().length > 5) {
            let fromPosition: Vector2D = {x: 50, y: 30}
            this.slidingHand.position.set(fromPosition.x, fromPosition.y)

            await gsap.to(this.slidingHand.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut})
            await gsap.to(this.slidingHand.scale, {x: 0.9, y: 0.9, duration: 0.3, ease: Back.easeOut})
            let toPosition: Vector2D = vectorAdd(fromPosition, {x: 0, y: 300})
            this.slidingHandTween = gsap.to(
                this.slidingHand,
                {x: toPosition.x, y: toPosition.y, duration: 2, ease: Quad.easeInOut, repeat: -1, repeatDelay: 0.5})
        }
    }

    private async stopSlidingFinger() {
        if (!this.fadingOutSlidingHand) {
            this.fadingOutSlidingHand = true
            this.slidingHandTween?.kill()
            await gsap.to(this.slidingHand.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
            this.fadingOutSlidingHand = false
        }
    }
}