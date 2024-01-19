import { MidiplexNodeInstance } from "@/node-instance";
type InputNodeTypeDef = {
    inputs: {};
    outputs: {
        out: MidiMessageType;
    };
    props: {
        inputId: string | null;
    };
    state: {};
};
declare const InputNodeDefinition: MidiplexNodeDefinition<InputNodeTypeDef>;
declare class InputNode extends MidiplexNodeInstance<InputNodeTypeDef> {
    constructor(key: string);
}
export { InputNodeTypeDef, InputNodeDefinition, InputNode };
