import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
type TransposeNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff';
    };
    outputs: {
        out: 'noteon' | 'noteoff';
    };
    props: {
        transpose: number;
    };
    state: {};
};
declare const TransposeNodeDef: {
    name: string;
    key: "TRANSPOSE_NODE";
    description: string;
    inputs: {
        in: {
            name: string;
            messageTypes: ["noteon", "noteoff"];
        };
    };
    outputs: {
        out: {
            name: string;
            messageTypes: ["noteon", "noteoff"];
        };
    };
    props: {
        transpose: {
            name: string;
            value: number;
        };
    };
    node({ send, receive, prop }: {
        prop: <K extends "transpose">(key: K) => {
            transpose: number;
        }[K];
        state: <K_1 extends never>(key: K_1, newVal?: {}[K_1] | undefined) => {}[K_1];
        send: <K_2 extends "thru" | "out">(message: MidiplexMessage, edge: K_2) => void;
        receive: (handler: <K_3 extends "in">(message: MidiplexMessage, edge: K_3) => void) => void;
        update: (handler: () => void) => void;
    }): void;
};
declare class TransposeNode extends MidiplexNodeInstance<TransposeNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<TransposeNodeTypeDef>);
}
export { TransposeNodeTypeDef, TransposeNodeDef, TransposeNode };
