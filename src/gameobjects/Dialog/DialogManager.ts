import {Container} from "pixi.js";
import {DialogBox} from "./DialogBox";
import {Dialog, DialogNode} from "./Dialogs/DialogConfig";
import {BERND, BERND_BUTTON} from "../../index";
import {FactoryScene} from "../../Scenes/FactoryScene";

export class DialogManager extends Container {

    dialogBox: DialogBox
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
        let startNode = dialog.getStartDialog()
        startNode.start()
        await BERND.blendIn()
        this.dialogBox.setSpeeches(startNode)
        await this.dialogBox.blendIn()
        await this.dialogBox.type()
    }

    async advance(node: DialogNode) {
        node.start()
        await this.dialogBox.detype()
        this.dialogBox.setSpeeches(node)
        await this.dialogBox.type()
    }

    async endDialog() {
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

    showHint() {
        let hint = this.currentLevel?.getHint()
        if (hint) {
            this.startDialog(hint)
        }
    }

    removeLevel() {
        this.currentLevel = undefined
    }
}