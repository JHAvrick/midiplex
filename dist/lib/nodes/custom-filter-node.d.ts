import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
type CustomFilterNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        filter: (message: MidiplexMessage) => boolean;
    };
    state: {};
};
declare const CustomFilterNodeDef: MidiplexNodeDefinition<CustomFilterNodeTypeDef>;
declare class CustomFilterNode extends MidiplexNodeInstance<CustomFilterNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CustomFilterNodeTypeDef>);
}
export { CustomFilterNodeTypeDef, CustomFilterNodeDef, CustomFilterNode };
