import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util";

/**
 * MessageTypeSplitNode: This node sends each message received to an output edge with the same name as the message type.
 */

type MessageTypeSplitTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        [key in MidiMessageType]: MidiMessageType
    },
    props: {},
    state: {}
}

let outputs = <{ [key in keyof MessageTypeSplitTypeDef['outputs']]: { name: string, messageTypes: [MidiMessageType]  } }> 
Object.fromEntries(AllMessageTypes.map((type) => [type, {
    name: type,
    messageTypes: [type]
}]));

const MessageTypeSplitDef :  MidiplexNodeDefinition<MessageTypeSplitTypeDef> = {
    name: 'Message Type Splitter',
    key: 'MESSAGE_TYPE_SPLIT_NODE',
    description: '',
    inputs: {
        in: {
            name: 'In',
            messageTypes: AllMessageTypes
        }
    },
    outputs: {
        ...outputs
    },
    node({ send, receive, prop }){
        receive((message) => {
            send(message, message.type);
        });
    }
};


class MessageTypeSplitNode extends MidiplexNodeInstance<MessageTypeSplitTypeDef> {
    constructor(key: string, config: NodeConfig<MessageTypeSplitTypeDef> = {}){
        super(key, MessageTypeSplitDef, config);
    }
}

export { MessageTypeSplitTypeDef, MessageTypeSplitDef, MessageTypeSplitNode };