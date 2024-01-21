import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util";

/**
 * MessageTypePassNode: This node passes only specified message types.
 */

type MessageTypePassNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        out: MidiMessageType,
    },
    props: {
        messageTypes: MidiMessageType[]
    },
    state: {}
}

const MessageTypePassNodeDef :  MidiplexNodeDefinition<MessageTypePassNodeTypeDef> = {
    name: 'Message Type Filter',
    key: 'MESSAGE_TYPE_PASS_NODE',
    description: '',
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
        }
    },
    node({ send, receive, prop }){
        receive((message) => {
            if (prop('messageTypes').includes(message.type)) {
                send(message, 'out');
            }
        });
    }
};


class MessageTypePassNode extends MidiplexNodeInstance<MessageTypePassNodeTypeDef> {
    constructor(key: string, config: NodeConfig<MessageTypePassNodeTypeDef> = {}){
        super(key, MessageTypePassNodeDef, config);
    }
}

export { MessageTypePassNodeTypeDef, MessageTypePassNodeDef, MessageTypePassNode };