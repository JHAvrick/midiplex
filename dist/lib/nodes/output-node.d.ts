import { MidiplexNodeInstance } from "@/node-instance";
type OutputNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {};
    props: {
        outputId: string | null;
    };
    state: {};
};
declare const OutputNodeDefinition: MidiplexNodeDefinition<OutputNodeTypeDef>;
declare class OutputNode extends MidiplexNodeInstance<OutputNodeTypeDef> {
    constructor(key: string);
}
export { OutputNodeTypeDef, OutputNodeDefinition, OutputNode };
