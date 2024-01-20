import { MidiplexNodeInstance } from "@/node-instance";
type TogglePathTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        triggerOpen: MidiplexTrigger | null;
        triggerClosed: MidiplexTrigger | null;
        open: boolean;
    };
    state: {};
};
declare const TogglePathDef: MidiplexNodeDefinition<TogglePathTypeDef>;
declare class TogglePathNode extends MidiplexNodeInstance<TogglePathTypeDef> {
    constructor(key: string, config?: NodeConfig<TogglePathTypeDef>);
}
export { TogglePathTypeDef, TogglePathDef, TogglePathNode };
