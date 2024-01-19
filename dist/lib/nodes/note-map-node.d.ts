import { MidiplexNodeInstance } from "@/node-instance";
type NoteMapNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff';
    };
    outputs: {
        out: 'noteon' | 'noteoff';
    };
    props: {
        mapping: NoteMap;
    };
    state: {};
};
declare const NoteMapNodeDef: MidiplexNodeDefinition<NoteMapNodeTypeDef>;
declare class NoteMapNode extends MidiplexNodeInstance<NoteMapNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<NoteMapNodeTypeDef>);
}
export { NoteMapNodeTypeDef, NoteMapNodeDef, NoteMapNode };
