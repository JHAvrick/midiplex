import { MidiplexNodeInstance } from "@/node-instance";
type CCClampNodeTypeDef = {
    inputs: {
        in: 'controlchange';
    };
    outputs: {
        out: 'controlchange';
    };
    props: {
        mapping: CCRangeMap;
    };
    state: {};
};
declare const CCClampNodeDef: MidiplexNodeDefinition<CCClampNodeTypeDef>;
declare class CCClampNode extends MidiplexNodeInstance<CCClampNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCClampNodeTypeDef>);
}
export { CCClampNodeTypeDef, CCClampNodeDef, CCClampNode };
