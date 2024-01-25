import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util/util";

type MessageTypeFilterNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        out: MidiMessageType,
    },
    props: {
        messageTypes: MidiMessageType[],
        mode: 'filter' | 'pass'
    },
    state: {}
}

const MessageTypeFilterNodeDef :  MidiplexNodeDefinition<MessageTypeFilterNodeTypeDef> = {
    name: 'Message Type Pass',
    key: 'MESSAGE_TYPE_PASS_NODE',
    description: 'Allow only specified message types to pass through.',
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
        messageTypes: {
            name: 'Message Types',
            value: AllMessageTypes
        },
        mode: {
            name: 'Mode',
            value: 'pass'
        }
    },
    node({ send, onMessage, prop }){
        onMessage((message) => {
            //Filter out message types
            if (prop('mode') === 'filter') {
                if (!prop('messageTypes').includes(message.type)) {
                    send(message, 'out');
                    return;
                }

            //Pass only message types
            } else if (prop('messageTypes').includes(message.type)) {
                send(message, 'out');
            }
        });
    }
};

/**
 * MessageTypeFilterNode: Filter or pass only specified message types.
 */
class MessageTypeFilterNode extends MidiplexNodeInstance<MessageTypeFilterNodeTypeDef> {
    constructor(key: string, config: NodeConfig<MessageTypeFilterNodeTypeDef> = {}){
        super(key, MessageTypeFilterNodeDef, config);
    }
}

export { MessageTypeFilterNodeTypeDef, MessageTypeFilterNodeDef, MessageTypeFilterNode };