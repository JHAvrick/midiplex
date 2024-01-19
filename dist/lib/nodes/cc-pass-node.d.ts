import { MidiplexNodeInstance } from "@/node-instance";
type CCPassNodeTypeDef = {
    inputs: {
        in: 'controlchange';
    };
    outputs: {
        out: 'controlchange';
    };
    props: {
        pass: number[];
    };
    state: {};
};
declare const CCPassNodeDef: MidiplexNodeDefinition<CCPassNodeTypeDef>;
declare class CCPassNode extends MidiplexNodeInstance<CCPassNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCPassNodeTypeDef>);
}
export { CCPassNodeTypeDef, CCPassNodeDef, CCPassNode };
