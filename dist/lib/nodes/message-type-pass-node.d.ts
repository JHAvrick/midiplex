import { MidiplexNodeInstance } from "@/node-instance";
/**
 * MessageTypePassNode: This node passes only specified message types.
 */
type MessageTypePassNodeTypeDef = {
    inputs: {
        in: MidiMessageType;
    };
    outputs: {
        out: MidiMessageType;
    };
    props: {
        messageTypes: MidiMessageType[];
    };
    state: {};
};
declare const MessageTypePassNodeDef: MidiplexNodeDefinition<MessageTypePassNodeTypeDef>;
declare class MessageTypePassNode extends MidiplexNodeInstance<MessageTypePassNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<MessageTypePassNodeTypeDef>);
}
export { MessageTypePassNodeTypeDef, MessageTypePassNodeDef, MessageTypePassNode };
