import { MidiplexNodeInstance } from "@/node-instance";
type CCRangeNodeTypeDef = {
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
declare const CCRangeNodeDef: MidiplexNodeDefinition<CCRangeNodeTypeDef>;
declare class CCRangeNode extends MidiplexNodeInstance<CCRangeNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCRangeNodeTypeDef>);
}
export { CCRangeNodeTypeDef, CCRangeNodeDef, CCRangeNode };
