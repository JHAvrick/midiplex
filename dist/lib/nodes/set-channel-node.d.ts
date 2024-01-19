import { MidiplexNodeInstance } from "@/node-instance";
type SetChannelNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        channel: number;
    };
    state: {};
};
declare const SetChannelNodeDef: MidiplexNodeDefinition<SetChannelNodeTypeDef>;
declare class SetChannelNode extends MidiplexNodeInstance<SetChannelNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<SetChannelNodeTypeDef>);
}
export { SetChannelNodeTypeDef, SetChannelNodeDef, SetChannelNode };
