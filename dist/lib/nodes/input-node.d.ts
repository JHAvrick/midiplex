import { MidiplexNodeInstance } from "@/node-instance";
type InputNodeTypeDef = {
    inputs: {};
    outputs: {
        out: MidiMessageType;
        clock: MidiClockMessageType;
    };
    props: {
        inputId: string | null;
        timeSignature: [number, number];
    };
    state: {};
};
declare const InputNodeDefinition: MidiplexNodeDefinition<InputNodeTypeDef>;
declare class InputNode extends MidiplexNodeInstance<InputNodeTypeDef> {
    constructor(key: string);
}
export { InputNodeTypeDef, InputNodeDefinition, InputNode };
