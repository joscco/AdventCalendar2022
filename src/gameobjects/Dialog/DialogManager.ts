import {Container} from "pixi.js";
import {DialogBox} from "./DialogBox";
import {Dialog, DialogNode} from "./Dialogs/DialogConfig";
import {BERND, BERND_BUTTON} from "../../index";
import {FactoryScene} from "../../Scenes/FactoryScene";

export class DialogManager extends Container {

    dialogBox: DialogBox
    currentNode?: DialogNode
    currentLevel?: FactoryScene

    constructor() {
        super();
        this.dialogBox = new DialogBox()
        this.addChild(this.dialogBox)
    }

    setLevel(level: FactoryScene) {
        this.currentLevel = level
    }

    async startDialog(dialog: Dialog) {
        this.currentNode = dialog.getStartDialog()
        let startNode = this.currentNode
        startNode.start()
        await BERND.blendIn()
        this.dialogBox.setSpeeches(startNode)
        await this.dialogBox.blendIn()
        await this.dialogBox.type()
    }

    async advance(node: DialogNode) {
        this.currentNode = node
        node.start()
        await this.dialogBox.detype()
        this.dialogBox.setSpeeches(node)
        await this.dialogBox.type()
    }

    async endDialog() {
        this.currentNode = undefined
        await this.dialogBox.detype()
        await this.dialogBox.blendOut()
        BERND.blendOut()

        if (this.currentLevel) {
            BERND_BUTTON.blendIn()
        }
    }

    hideDialog() {
        this.dialogBox.hide()
    }

    async showHint() {
        let hint = this.currentLevel?.getHint() ?? undefined
        if (hint) {
            this.startDialog(hint)
            await new Promise(resolve => setTimeout(resolve, 5000))
            if (this.currentNode === hint.getStartDialog()) {
                this.endDialog()
            }
        }
    }

    removeLevel() {
        this.currentLevel = undefined
    }
}