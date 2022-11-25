import {MachineType} from "../gameobjects/GameScreen/Machinery/Machine";

export type EmittableEvent =
    "clicked_ingredient_cookbook" | "closed_ingredient_cookbook" |
    "opened_type_choose_menu" | `selected_type_${MachineType}` |
    `moved_item_${string}_to_${number}_${number}` | "clicked_continuation_button"

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

    unsubscribe(event: EmittableEvent) {
        this.subscribers.set(event, []);
    }
}