import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util/util";

type ChannelSetNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        out: MidiMessageType
    },
    props: {
        channel: number
    },
    state: {}
}

const ChannelSetNodeDef :  MidiplexNodeDefinition<ChannelSetNodeTypeDef> = {
    name: 'Set Channel',
    key: 'SET_CHANNEL_NODE',
    description: 'Set a specific channel for all messages passing through this node. Non-channel messages are passed through unmodified.',
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
        channel: {
            name: 'Channel',
            value: AllMessageTypes
        }
    },
    node({ send, onMessage, prop }){
        onMessage((message) => {
            message.setChannel(prop('channel'));
            send(message, 'out');
        });
    }
};


class ChannelSetNode extends MidiplexNodeInstance<ChannelSetNodeTypeDef> {
    constructor(key: string, config: NodeConfig<ChannelSetNodeTypeDef> = {}){
        super(key, ChannelSetNodeDef, config);
    }
}

export { ChannelSetNodeTypeDef, ChannelSetNodeDef, ChannelSetNode };