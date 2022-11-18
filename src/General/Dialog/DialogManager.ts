import {Container} from "pixi.js";
import {DialogBox} from "./DialogBox";
import {Dialog, DialogNode} from "./Dialogs/DialogConfig";
import {BERND} from "../../index";

export class DialogManager extends Container {

    dialogBox: DialogBox

    constructor() {
        super();
        this.dialogBox = new DialogBox()
        this.addChild(this.dialogBox)
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
    }

    hideDialog() {
        this.dialogBox.hide()
    }
}