import {MachineType} from "../gameobjects/GameScreen/Machinery/Machine";

export type EmittableEvent =
    `moved_${string}_to_index_row_${number}_and_column_${number}`
    | `changed_${string}_to_type_${MachineType}`
    | "clicked_music_button"

export type EventSubscriberFunction = () => void

export class EventEmitter {
    private subscribers: Map<EmittableEvent, EventSubscriberFunction[]> = new Map()

    emit(event: EmittableEvent) {
        this.subscribers.get(event)?.forEach(action => action())
    }

    subscribe(event: EmittableEvent, action: EventSubscriberFunction) {
        let actions = this.subscribers.get(event)

        if (actions) {
            actions.push(action)
        } else {
            this.subscribers.set(event, [action])
        }
    }

    unsubscribe(event: EmittableEvent, action: EventSubscriberFunction) {
        let actions = this.subscribers.get(event)

        if (actions) {
            const index = actions.indexOf(action, 0);
            if (index > -1) {
                actions.splice(index, 1);
            }
        }
    }
}