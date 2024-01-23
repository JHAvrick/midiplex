import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
type MonoLatchNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff';
    };
    outputs: {
        out: 'noteon' | 'noteoff';
    };
    props: {};
    state: {
        lastNoteOn: MidiplexMessage | null;
    };
};
declare const MonoLatchNodeDef: MidiplexNodeDefinition<MonoLatchNodeTypeDef>;
declare class MonoLatchNode extends MidiplexNodeInstance<MonoLatchNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<MonoLatchNodeTypeDef>);
}
export { MonoLatchNodeTypeDef, MonoLatchNodeDef, MonoLatchNode };
