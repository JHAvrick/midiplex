import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes, ChannelMessageTypes } from "@/util/util";

type ChannelSplitNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        'nonchannel': MidiMessageType,
        '1': MidiChannelMessageType,
        '2': MidiChannelMessageType,
        '3': MidiChannelMessageType,
        '4': MidiChannelMessageType,
        '5': MidiChannelMessageType,
        '6': MidiChannelMessageType,
        '7': MidiChannelMessageType,
        '8': MidiChannelMessageType,
        '9': MidiChannelMessageType,
        '10': MidiChannelMessageType,
        '11': MidiChannelMessageType,
        '12': MidiChannelMessageType,
        '13': MidiChannelMessageType,
        '14': MidiChannelMessageType,
        '15': MidiChannelMessageType,
        '16': MidiChannelMessageType
    },
    props: {},
    state: {}
}

const ChannelSplitNodeDef :  MidiplexNodeDefinition<ChannelSplitNodeTypeDef> = {
    name: 'Split Channel',
    key: 'SPLIT_CHANNEL_NODE',
    description: 'Split messages by channel. Each channel has its own output edge by number. Non-channel messages are passed through the edge "nonchannel"',
    inputs: {
        in: {
            name: 'In',
            messageTypes: AllMessageTypes
        }
    },
    outputs: {
        'nonchannel': {
            name: 'Non-Channel',
            messageTypes: AllMessageTypes
        },
        '1': {
            name: 'Channel 1',
            messageTypes: ChannelMessageTypes
        },
        '2': {
            name: 'Channel 2',
            messageTypes: ChannelMessageTypes
        },
        '3': {
            name: 'Channel 3',
            messageTypes: ChannelMessageTypes
        },
        '4': {
            name: 'Channel 4',
            messageTypes: ChannelMessageTypes
        },
        '5': {
            name: 'Channel 5',
            messageTypes: ChannelMessageTypes
        },
        '6': {
            name: 'Channel 6',
            messageTypes: ChannelMessageTypes
        },
        '7': {
            name: 'Channel 7',
            messageTypes: ChannelMessageTypes
        },
        '8': {
            name: 'Channel 8',
            messageTypes: ChannelMessageTypes
        },
        '9': {
            name: 'Channel 9',
            messageTypes: ChannelMessageTypes
        },
        '10': {
            name: 'Channel 10',
            messageTypes: ChannelMessageTypes
        },
        '11': {
            name: 'Channel 11',
            messageTypes: ChannelMessageTypes
        },
        '12': {
            name: 'Channel 12',
            messageTypes: ChannelMessageTypes
        },
        '13': {
            name: 'Channel 13',
            messageTypes: ChannelMessageTypes
        },
        '14': {
            name: 'Channel 14',
            messageTypes: ChannelMessageTypes
        },
        '15': {
            name: 'Channel 15',
            messageTypes: ChannelMessageTypes
        },
        '16': {
            name: 'Channel 16',
            messageTypes: ChannelMessageTypes
        }
    },
    props: {

    },
    node({ send, onMessage, prop }){
        onMessage((message) => {
            if (message.isChannelMessage){
                send(message, <keyof ChannelSplitNodeTypeDef['outputs']> message.channel.toString());
                return;
            }
            send(message, 'nonchannel');
        });
    }
};


class ChannelSplitNode extends MidiplexNodeInstance<ChannelSplitNodeTypeDef> {
    constructor(key: string, config: NodeConfig<ChannelSplitNodeTypeDef> = {}){
        super(key, ChannelSplitNodeDef, config);
    }
}

export { ChannelSplitNodeTypeDef, ChannelSplitNodeDef, ChannelSplitNode };