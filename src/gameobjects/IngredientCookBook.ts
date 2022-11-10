import {Container, Graphics, Sprite} from "pixi.js";
import {App, ASSET_STORE, GAME_DATA, GAME_HEIGHT, GAME_WIDTH} from "../index";
import {CookbookEntry} from "./CookbookEntry";
import {clamp, sum, Vector2D} from "../general/Helpers";
import {MousewheelListener} from "../general/MouseWheelPlugin";
import {IngredientID, IngredientIDs} from "./Ingredient";

export class IngredientCookBook extends Container {

    backgroundSprite: Sprite;
    blendedIn: boolean = false

    content: Container;
    items: CookbookEntry[] = []
    contentMask: Graphics

    scrollBar: Sprite;
    scrollBarHandle: Sprite;

    scrollBarDragging: boolean = false
    contentDragging: boolean = false

    SCROLL_BAR_MIN_Y: number = 40
    SCROLL_BAR_MAX_Y: number = 750
    CONTENT_MIN_Y: number = 0
    CONTENT_MAX_Y: number = 0

    constructor() {
        super()

        this.sortableChildren = true
        this.position.set(GAME_WIDTH/2, GAME_HEIGHT + 200)

        this.backgroundSprite = new Sprite(ASSET_STORE.getTextureAsset("ingredientOverviewBook"))
        this.backgroundSprite.anchor.set(0.5, 0)
        this.backgroundSprite.zIndex = 0

        this.content = new Container()
        this.content.position.y = this.CONTENT_MAX_Y

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
        this.updateEntries()

        this.scrollBar = new Sprite(ASSET_STORE.getTextureAsset("ingredientOverviewScrollBar"))
        this.scrollBar.anchor.set(0.5, 0)
        this.scrollBar.position.set(600, this.SCROLL_BAR_MIN_Y)

        this.scrollBarHandle = new Sprite(ASSET_STORE.getTextureAsset("ingredientOverviewScrollFlag"))
        this.scrollBarHandle.anchor.set(0, 0.5)
        this.scrollBarHandle.position.set(-10, 50)
        this.scrollBar.addChild(this.scrollBarHandle)

        this.initScrollbarDragging();
        this.initContentDragging();

        this.addChild(this.backgroundSprite, this.content, this.scrollBar)
    }

    private initScrollbarDragging() {
        this.scrollBarHandle.interactive = true
        this.scrollBarHandle.cursor = "pointer"

        let dragOffset: Vector2D

        this.scrollBarHandle.on("pointerdown", (event) => {
            let mousePosition: Vector2D = event.data.global
            dragOffset = {
                x: this.scrollBarHandle.x - mousePosition.x,
                y: this.scrollBarHandle.y - mousePosition.y
            }
            this.scrollBarDragging = true
        })

        this.scrollBarHandle.on("pointermove", (event) => {
            if (this.scrollBarDragging) {
                let mousePosition = event.data.global
                this.updateScrollbarHandlePosition(sum(mousePosition, dragOffset));
            }
        })

        this.scrollBarHandle.on("pointerup", (event) => {
            this.scrollBarDragging = false
        })

        this.scrollBarHandle.on("pointerupoutside", (event) => {
            this.scrollBarDragging = false
        })
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
                this.updateContentPositionByMouse(sum(mousePosition, dragOffset));
            }
        })

        this.contentMask.on("pointerup", (event) => {
            this.contentDragging = false
        })

        this.contentMask.on("pointerupoutside", (event) => {
            this.contentDragging = false
        })

        let mouseWheelListener = new MousewheelListener(App)
        mouseWheelListener.setAction((delta, mousePos) => this.handleWheel(delta, mousePos))
    }

    updateEntries() {
        this.repositionEntries(GAME_DATA.getUnlockedIngredients())
    }

    private updateScrollbarHandlePosition(mousePosition: Vector2D) {
        let newY = clamp(mousePosition.y, this.SCROLL_BAR_MIN_Y, this.SCROLL_BAR_MAX_Y)
        this.scrollBarHandle.position.y = newY

        let relativeY = (newY - this.SCROLL_BAR_MIN_Y) / (this.SCROLL_BAR_MAX_Y - this.SCROLL_BAR_MIN_Y)
        // Content positions inversely
        this.content.position.y = this.CONTENT_MAX_Y - relativeY * (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
    }

    private updateContentPositionByMouse(mousePosition: Vector2D) {
        let newY = clamp(mousePosition.y, this.CONTENT_MIN_Y, this.CONTENT_MAX_Y)
        this.content.position.y = newY

        let relativeY = (newY - this.CONTENT_MIN_Y) / (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
        // Content positions inversely
        this.scrollBarHandle.position.y = this.SCROLL_BAR_MAX_Y - relativeY * (this.SCROLL_BAR_MAX_Y - this.SCROLL_BAR_MIN_Y)
    }

    private updateContentPosition(offsetY: number) {
        let newY = clamp(this.content.position.y + offsetY, this.CONTENT_MIN_Y, this.CONTENT_MAX_Y)
        this.content.position.y = newY

        let relativeY = (newY - this.CONTENT_MIN_Y) / (this.CONTENT_MAX_Y - this.CONTENT_MIN_Y)
        // Content positions inversely
        this.scrollBarHandle.position.y = this.SCROLL_BAR_MAX_Y - relativeY * (this.SCROLL_BAR_MAX_Y - this.SCROLL_BAR_MIN_Y)
    }

    public handleWheel(delta: number, mousePos: Vector2D): void {
        if (!this.blendedIn) {
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
        let alphabeticIDs = [...IngredientIDs].sort((a,b) => a.localeCompare(b))
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

        this.CONTENT_MIN_Y = Math.min(- this.content.height + this.contentMask.height + 10, -10)
    }

    private hideAllEntries() {
        for(let item of this.items) {
            item.hide()
            item.position.set(0, 90)
        }
    }

    async blendIn() {
        await gsap.to(this.position, { y: 150, duration: 0.5, ease: Back.easeInOut})
        this.blendedIn = true
    }

    async blendOut() {
        this.blendedIn = false
        await gsap.to(this.position, {y: GAME_HEIGHT + 200, duration: 0.5, ease: Back.easeInOut})
    }

    hide() {
        this.blendedIn = false
        this.position.y = GAME_HEIGHT + 200
    }
}