import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
type NotePolyLatchNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff';
    };
    outputs: {
        out: 'noteon' | 'noteoff';
    };
    props: {
        maxNotes: number;
    };
    state: {
        lastNoteOn: MidiplexMessage | null;
    };
};
declare const NotePolyLatchNodeDef: MidiplexNodeDefinition<NotePolyLatchNodeTypeDef>;
declare class NotePolyLatchNode extends MidiplexNodeInstance<NotePolyLatchNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<NotePolyLatchNodeTypeDef>);
}
export { NotePolyLatchNodeTypeDef, NotePolyLatchNodeDef, NotePolyLatchNode };
