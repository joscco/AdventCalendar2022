import {EmittableEvent} from "../../../General/EventEmitter";
import {DIALOG_MANAGER, EVENT_EMITTER} from "../../../index";

export type Emotion = "happy" | "sad" | "neutral"
export type Speech = { text: string, emotion?: Emotion }

export type DialogNodeConfig = {
    skippable?: boolean;
    id: string
    speeches: Speech[]; // Skippable Texts
    successors: { on: EmittableEvent, nextID: string | null }[] // Before next node is used, some action is required
}

export type DialogConfig = {
    nodes: DialogNodeConfig[];
    startNodeID: string;
}

export class Dialog {

    nodes: DialogNode[] = []
    startNode: DialogNode

    constructor(config: DialogConfig) {
        config.nodes.forEach(nodeConfig => this.nodes.push(new DialogNode(this, nodeConfig)))

        let potentialStartNode = this.nodes.find(node => node.id === config.startNodeID)
        if (!potentialStartNode) {
            throw Error(`${config.startNodeID} is not available in this dialog!`)
        }

        this.startNode = potentialStartNode
    }

    continueWith(id: string | null) {
        if (id && this.getDialogForID(id)) {
            DIALOG_MANAGER.advance(this.getDialogForID(id)!)
        } else {
            DIALOG_MANAGER.endDialog()
        }
    }


    private getDialogForID(id: string): DialogNode | undefined {
        return this.nodes.find(node => node.id === id)
    }

    getStartDialog(): DialogNode {
        return this.startNode
    }
}

export class DialogNode {
    id: string
    speeches: Speech[]
    dialog: Dialog
    successors: {on: EmittableEvent, nextID: string | null}[]
    started: boolean = false
    skippable: boolean

    constructor(dialog: Dialog, config: DialogNodeConfig) {
        this.id = config.id
        this.speeches = config.speeches
        this.dialog = dialog
        this.successors = config.successors
        this.skippable = config.skippable ?? true
    }

    onEventPresume(event: EmittableEvent, next: string | null) {
        this.successors.forEach(successor =>
            EVENT_EMITTER.unsubscribe(
                successor.on,
                () => this.onEventPresume(successor.on, successor.nextID)))
        this.dialog.continueWith(next)
        this.started = false
    }

    start() {
        this.started = true
        this.successors.forEach(successor =>
            EVENT_EMITTER.subscribe(
                successor.on,
                () => this.onEventPresume(successor.on, successor.nextID)))
    }
}