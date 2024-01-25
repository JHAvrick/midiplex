import { AllMessageTypes } from "@/util/util";
import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util/util";

type TogglePathTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        out: MidiMessageType,
    },
    props: {
        triggerOpen: MidiplexTrigger | null,
        triggerClosed: MidiplexTrigger | null,
        open: boolean
    },
    state: {}
}

const TogglePathDef :  MidiplexNodeDefinition<TogglePathTypeDef> = {
    name: 'CC Toggle Path',
    key: 'TOGGLE_PATH_NODE',
    description: 'Toggles the output path open or closed via the given CC channel and value. The given CC value is always filtered out.',
    inputs: {
        in: {
            name: 'In',
            messageTypes: AllMessageTypes
        }
    },
    outputs: {
        out: {
            name: 'Out',
            messageTypes: AllMessageTypes
        }
    },
    props: {
        /**
         * The CC value which will cause the path to open. If this value is the same as the
         * `closedValue`, the path will toggle open and closed on the same value.
         */
        triggerOpen: {
            name: 'Open Value',
            value: null
        },
        /**
         * The CC value which will cause the path to close.
         */
        triggerClosed: {
            name: 'Closed Value',
            value: null
        },
        /**
         * This property can be used to manually open or close the path.
         */
        open: {
            name: 'Open',
            value: true
        }
    },
    node({ send, onMessage, onUpdate, prop }){
 
        let isOpen = prop('open');
        onUpdate(() => {
            isOpen = prop('open');
        });

        onMessage((message) => {
            if (isOpen){
                let triggerClosed = prop('triggerClosed');
                if (triggerClosed && Util.Message.matchTrigger(triggerClosed, message)){
                    isOpen = false;
                    return;
                }
            } else {
                let triggerOpen = prop('triggerOpen');
                if (triggerOpen && Util.Message.matchTrigger(triggerOpen, message)){
                    isOpen = true;
                    return;
                }
            }

            if (isOpen) send(message, 'out');
        });
    }
};


class TogglePathNode extends MidiplexNodeInstance<TogglePathTypeDef> {
    constructor(key: string, config: NodeConfig<TogglePathTypeDef> = {}){
        super(key, TogglePathDef, config);
    }
}

export { TogglePathTypeDef, TogglePathDef, TogglePathNode };