import {Container, Sprite} from "pixi.js";
import {ASSET_STORE, DIALOG_MANAGER, GAME_HEIGHT, GAME_WIDTH} from "../../index";
import {ScalingButtonImpl} from "../../UI/Buttons/ScalingButton";
import {DialogNode, Speech} from "./Dialogs/DialogConfig";
import {TextBox} from "./Dialogs/TextBox";

export class DialogBox extends Container {

    background: Sprite
    spike: Sprite
    textObject: TextBox

    previousButton: ScalingButtonImpl
    nextButton: ScalingButtonImpl
    cancelButton: ScalingButtonImpl

    private currentSpeeches?: Speech[]
    private currentSpeechIndex?: number;

    constructor() {
        super();
        this.background = new Sprite(ASSET_STORE.getTextureAsset("dialog_box"))
        this.spike = new Sprite(ASSET_STORE.getTextureAsset("dialog_spike"))
        this.background.tint = 0x000000
        this.spike.tint = 0x000000

        this.textObject = new TextBox(this.background.width, this.background.height)

        this.previousButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_previous_button"), () => this.previousSpeech())
        this.nextButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_next_button"), () => this.nextSpeech())
        this.cancelButton = new ScalingButtonImpl(ASSET_STORE.getTextureAsset("dialog_cross"), () => {
            DIALOG_MANAGER.killAutocloseTimer()
            DIALOG_MANAGER.endDialog()
        })
        this.hide()

        this.background.anchor.set(0.5)

        this.spike.anchor.set(0.5, 1)
        this.spike.position.set(575, -75)
        this.spike.angle = 20

        this.previousButton.position.set(-this.background.width / 2 + 20, 0)
        this.nextButton.position.set(this.background.width / 2 - 20, 0)
        this.cancelButton.position.set(this.background.width / 2, - this.background.height / 2)

        this.background.addChild(this.spike, this.textObject)
        this.addChild(this.background, this.previousButton, this.nextButton, this.cancelButton)
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
        this.textObject.setFullText(this.currentSpeeches[this.currentSpeechIndex].text)

        this.previousButton.hide()
        this.nextButton.hide()
        this.cancelButton.hide()

        if (this.currentSpeeches.length > 1) {
            this.nextButton.blendIn()
        }

        if (node.isSkippable()) {
            this.cancelButton.blendIn()
        }
    }

    private async nextSpeech() {
        let index = ++this.currentSpeechIndex!
        await this.detype()

        this.textObject.setFullText(this.currentSpeeches![index].text)

        let isLastSpeech = index === this.currentSpeeches!.length - 1
        if (isLastSpeech) {
            this.nextButton.blendOut()
        }
        this.previousButton.blendIn()


        await this.type()
        if (isLastSpeech && DIALOG_MANAGER.currentNode!.autoCloseDuration) {
            DIALOG_MANAGER.startAutocloseTimer()
        }
    }

    private async previousSpeech() {
        DIALOG_MANAGER.killAutocloseTimer()
        let index = --this.currentSpeechIndex!
        this.textObject.setFullText(this.currentSpeeches![index].text)
        if (index === 0) {
            this.previousButton.blendOut()
        }
        this.nextButton.blendIn()
        this.type()
    }

    async type() {
        await this.textObject.type()
    }

    async detype() {
        await this.textObject.detype()
    }
}