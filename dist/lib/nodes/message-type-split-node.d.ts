import { MidiplexNodeInstance } from "@/node-instance";
/**
 * MessageTypeSplitNode: This node sends each message received to an output edge with the same name as the message type.
 */
type MessageTypeSplitTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        [key in MidiMessageType]: MidiMessageType;
    };
    props: {};
    state: {};
};
declare const MessageTypeSplitDef: MidiplexNodeDefinition<MessageTypeSplitTypeDef>;
declare class MessageTypeSplitNode extends MidiplexNodeInstance<MessageTypeSplitTypeDef> {
    constructor(key: string, config?: NodeConfig<MessageTypeSplitTypeDef>);
}
export { MessageTypeSplitTypeDef, MessageTypeSplitDef, MessageTypeSplitNode };
