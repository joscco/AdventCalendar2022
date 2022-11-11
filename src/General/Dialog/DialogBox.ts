import {Container, Sprite, Text} from "pixi.js";
import {ASSET_STORE, DIALOG_MANAGER, GAME_HEIGHT, GAME_WIDTH} from "../../index";
import {ScalingButtonImpl} from "../../UI/Buttons/ScalingButton";
import {DialogNode, Speech} from "./Dialogs/DialogConfig";

export class DialogBox extends Container {

    background: Sprite
    spike: Sprite
    textObject: Text
    TEXT_PADDING: number = 20

    previousButton: ScalingButtonImpl
    nextButton: ScalingButtonImpl
    cancelButton: ScalingButtonImpl

    private currentSpeeches?: Speech[]
    private currentSpeechIndex?: number;

    constructor() {
        super();
        this.background = new Sprite(ASSET_STORE.getTextureAsset("dialog_box"))
        this.spike = new Sprite(ASSET_STORE.getTextureAsset("dialog_spike"))
        this.textObject = new Text("", {
            fontFamily: "Futurahandwritten",
            fontSize: 50,
            fill: 0xFFFFFF,
            wordWrapWidth: this.background.width - 2 * this.TEXT_PADDING
        })

        this.previousButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_previous_button"), () => this.previousSpeech())
        this.nextButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_next_button"), () => this.nextSpeech())
        this.cancelButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_cross"), () => DIALOG_MANAGER.endDialog())
        this.hide()

        this.background.anchor.set(0.5)
        this.textObject.anchor.set(0.5)
        this.spike.anchor.set(0.5, 1)
        this.spike.position.set(520, -75)

        this.previousButton.position.set(-this.background.width / 2 + 20, 0)
        this.nextButton.position.set(this.background.width / 2 + 20, 0)
        this.cancelButton.position.set(-this.background.width / 2, -this.height / 2)

        this.background.addChild(this.spike, this.textObject)
        this.addChild(this.background)
    }

    async blendIn() {
        await gsap.to(this.position, {y: GAME_HEIGHT - 200, duration: 0.5, ease: Back.easeInOut})
    }

    async blendOut() {
        await gsap.to(this.position, {y: GAME_HEIGHT + 300, duration: 0.5, ease: Back.easeInOut})
    }

    hide() {
        this.position.set(GAME_WIDTH / 2, GAME_HEIGHT + 300)
        this.previousButton.hide()
        this.nextButton.hide()
        this.cancelButton.hide()
    }

    show() {
        this.position.set(GAME_WIDTH / 2, GAME_HEIGHT - 200)
    }

    setSpeeches(node: DialogNode) {
        this.currentSpeeches = node.speeches
        this.currentSpeechIndex = 0
        this.textObject.text = this.currentSpeeches[this.currentSpeechIndex].text

        if (this.currentSpeeches.length > 1) {
            this.nextButton.blendIn()
        }
        if (node.skippable) {
            this.cancelButton.blendIn()
        }
    }

    private async nextSpeech() {
        let index = ++this.currentSpeechIndex!
        this.textObject.text = this.currentSpeeches![index].text
        if (index === this.currentSpeeches!.length - 1) {
            this.nextButton.blendOut()
        }
        this.previousButton.blendIn()
    }

    private async previousSpeech() {
        let index = --this.currentSpeechIndex!
        this.textObject.text = this.currentSpeeches![index].text
        if (index === 0) {
            this.previousButton.blendOut()
        }
        this.nextButton.blendOut()
    }

    async type() {
        gsap.to(this.textObject.scale, {x: 1, y: 1, duration: 0.5, ease: Back.easeInOut})
    }

    async detype() {
        gsap.to(this.textObject.scale, {x: 0, y: 0, duration: 0.5, ease: Back.easeInOut})
    }
}