import {Container, Graphics, Sprite} from "pixi.js";
import {App, ASSET_STORE, GAME_DATA, GAME_HEIGHT, GAME_WIDTH} from "../index";
import {CookbookEntry} from "./CookbookEntry";
import {clamp, vectorAdd, Vector2D} from "../General/Helpers";
import {MousewheelListener} from "../General/MouseWheelPlugin";
import {IngredientID, IngredientIDs} from "./Ingredient";
import {CookbookOverlay} from "./IngredientBook/CookbookOverlay";

export class IngredientCookbook extends Container {
    backgroundSprite: Sprite;

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

    constructor(private overlay: CookbookOverlay) {
        super()

        this.angle = 5
        this.sortableChildren = true
        this.position.set(GAME_WIDTH/2 + 160, GAME_HEIGHT + 200)

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
        this.updateEntries(GAME_DATA.getUnlockedIngredients())

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
                this.updateScrollbarHandlePosition(vectorAdd(mousePosition, dragOffset));
            }
        })

        this.scrollBarHandle.on("pointerup", () => {
            this.scrollBarDragging = false
        })

        this.scrollBarHandle.on("pointerupoutside", () => {
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
        await gsap.to(this.position, { y: 120, duration: 0.5, ease: Back.easeInOut})
    }

    async blendOut() {
        await gsap.to(this.position, {y: GAME_HEIGHT + 200, duration: 0.5, ease: Back.easeInOut})
    }

    hide() {
        this.position.y = GAME_HEIGHT + 200
    }

    show() {
        this.position.y = 120
    }

    private downloadContentAsPNG() {
        App.renderer.plugins.extract.canvas(this.content).toBlob(function(b: Blob){

            let a = document.createElement('a');
            document.body.append(a);
            a.download = "content";
            a.href = URL.createObjectURL(b);
            a.click();
            a.remove();

        }, 'image/png');
    }
}