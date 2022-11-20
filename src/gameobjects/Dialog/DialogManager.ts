import {Container} from "pixi.js";
import {DialogBox} from "./DialogBox";
import {Dialog, DialogNode} from "./Dialogs/DialogConfig";
import {BERND, BERND_BUTTON, DIALOG_MANAGER, GAME_DATA, TOOLTIP_MANAGER} from "../../index";
import {FactoryScene} from "../../Scenes/FactoryScene";

export class DialogManager extends Container {

    dialogBox: DialogBox
    currentNode?: DialogNode
    currentLevel?: FactoryScene
    private autocloseTimer?: NodeJS.Timeout;

    constructor() {
        super();
        this.dialogBox = new DialogBox()
        this.addChild(this.dialogBox)
    }

    setLevel(level: FactoryScene) {
        this.currentLevel = level
    }

    async startDialog(dialog: Dialog) {
        TOOLTIP_MANAGER.disableTooltips()
        this.currentNode = dialog.getStartDialog()
        this.currentNode.orSkippabilaty(this.currentLevel!.level < GAME_DATA.getUnlockedLevels())
        let startNode = this.currentNode

        await BERND.blendIn()
        // Starting first node
        this.dialogBox.setSpeeches(startNode)
        await this.dialogBox.blendIn()
        await this.dialogBox.type()

        if (startNode.speeches.length === 1 && startNode.autoCloseDuration) {
            DIALOG_MANAGER.startAutocloseTimer()
        }
    }

    async advance(node: DialogNode) {
        this.currentNode = node
        this.currentNode.orSkippabilaty(this.currentLevel!.level < GAME_DATA.getUnlockedLevels())

        // starting node
        await this.dialogBox.detype()
        this.dialogBox.setSpeeches(node)
        await this.dialogBox.type()

        if (node.speeches.length === 1 && node.autoCloseDuration) {
            DIALOG_MANAGER.startAutocloseTimer()
        }
    }

    hasNode(): boolean {
        return this.currentNode != undefined
    }

    async endDialog() {
        if (this.currentNode && this.currentNode.onEndDo) {
            this.currentNode.onEndDo(this.currentLevel!)
        }

        this.currentNode = undefined

        await this.dialogBox.detype()
        await this.dialogBox.blendOut()
        await BERND.blendOut()

        if (this.currentLevel) {
            BERND_BUTTON.blendIn()
        }
        TOOLTIP_MANAGER.enableTooltips()
    }

    hideDialog() {
        this.dialogBox.hide()
    }

    async showHint() {
        let hint = this.currentLevel?.getHint() ?? undefined
        if (hint) {
            this.startDialog(hint)
        }
    }

    removeLevel() {
        this.currentLevel = undefined
    }

    startAutocloseTimer() {
        if (this.currentNode && this.currentNode.autoCloseDuration) {
            this.autocloseTimer = setTimeout(() => this.endDialog(), this.currentNode.autoCloseDuration)
        }
    }

    killAutocloseTimer() {
        if(this.autocloseTimer) {
            clearTimeout(this.autocloseTimer)
        }
    }
}