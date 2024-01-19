import { MidiplexNodeInstance } from "@/node-instance";
type SplitChannelNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        'nonchannel': MidiMessageType;
        '1': MidiChannelMessageType;
        '2': MidiChannelMessageType;
        '3': MidiChannelMessageType;
        '4': MidiChannelMessageType;
        '5': MidiChannelMessageType;
        '6': MidiChannelMessageType;
        '7': MidiChannelMessageType;
        '8': MidiChannelMessageType;
        '9': MidiChannelMessageType;
        '10': MidiChannelMessageType;
        '11': MidiChannelMessageType;
        '12': MidiChannelMessageType;
        '13': MidiChannelMessageType;
        '14': MidiChannelMessageType;
        '15': MidiChannelMessageType;
        '16': MidiChannelMessageType;
    };
    props: {};
    state: {};
};
declare const SplitChannelNodeDef: MidiplexNodeDefinition<SplitChannelNodeTypeDef>;
declare class SplitChannelNode extends MidiplexNodeInstance<SplitChannelNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<SplitChannelNodeTypeDef>);
}
export { SplitChannelNodeTypeDef, SplitChannelNodeDef, SplitChannelNode };
