import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
type DebugNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        logToConsole: boolean;
        callback: (message: MidiplexMessage) => void;
    };
    state: {};
};
declare const DebugNodeDef: MidiplexNodeDefinition<DebugNodeTypeDef>;
declare class DebugNode extends MidiplexNodeInstance<DebugNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<DebugNodeTypeDef>);
}
export { DebugNodeTypeDef, DebugNodeDef, DebugNode };
