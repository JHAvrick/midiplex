import { MidiplexNodeInstance } from "@/node-instance";
type TogglePathTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        cc: IntRange<0, 128>;
        openValue: IntRange<0, 128>;
        closedValue: IntRange<0, 128>;
        toggleOnAnyValue: boolean;
        allowNoteOff: boolean;
        open: boolean;
    };
    state: {};
};
declare const TogglePathDef: MidiplexNodeDefinition<TogglePathTypeDef>;
declare class TogglePathNode extends MidiplexNodeInstance<TogglePathTypeDef> {
    constructor(key: string, config?: NodeConfig<TogglePathTypeDef>);
}
export { TogglePathTypeDef, TogglePathDef, TogglePathNode };
