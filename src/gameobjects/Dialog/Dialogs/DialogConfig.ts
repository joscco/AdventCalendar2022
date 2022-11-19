import {EmittableEvent} from "../../../General/EventEmitter";
import {DIALOG_MANAGER, EVENT_EMITTER} from "../../../index";
import {FactoryScene} from "../../../Scenes/FactoryScene";

export type Speech = { text: string}

export type DialogNodeConfig = {
    skippable?: boolean;
    id: string
    speeches: Speech[]; // Skippable Texts
    onEndDo?: (level: FactoryScene) => void,
    successors: { on: EmittableEvent, nextID: string | null, do?: (event: EmittableEvent) => void}[] // Before next node is used, some action is required
    durationUntilAutoClose?: number
}

export type DialogConfig = {
    nodes: DialogNodeConfig[];
}

export class Dialog {

    nodes: DialogNode[] = []
    startNode: DialogNode

    constructor(config: DialogConfig) {
        config.nodes.forEach(nodeConfig => this.nodes.push(new DialogNode(this, nodeConfig)))
        this.startNode = this.nodes[0]
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
    successors: {on: EmittableEvent, onEventAction?: (event: EmittableEvent) => void; nextID: string | null}[]
    started: boolean = false
    private skippable: boolean
    onEndDo?: (currentLevel: FactoryScene) => void

    autoCloseDuration?: number

    constructor(dialog: Dialog, config: DialogNodeConfig) {
        this.id = config.id
        this.speeches = config.speeches
        this.dialog = dialog
        this.successors = config.successors
        this.skippable = config.skippable ?? false
        this.autoCloseDuration = config.durationUntilAutoClose

        this.onEndDo = config.onEndDo
    }

    onEventResume(event: EmittableEvent, next: string | null, onEventAction?: (event: EmittableEvent) => void) {
        this.successors.forEach(successor =>
            EVENT_EMITTER.unsubscribe(
                successor.on,
                () => this.onEventResume(successor.on, successor.nextID, successor.onEventAction)))
        if (onEventAction) {
            onEventAction(event)
        }
        this.dialog.continueWith(next)
        this.started = false
    }

    isSkippable(): boolean {
        return this.skippable
    }

    start() {
        this.started = true
        this.successors.forEach(successor =>
            EVENT_EMITTER.subscribe(
                successor.on,
                () => this.onEventResume(successor.on,  successor.nextID, successor.onEventAction)))
    }

    orSkippabilaty(value: boolean) {
        this.skippable ||= value
    }
}