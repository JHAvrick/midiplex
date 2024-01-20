import { MidiplexNodeInstance } from "@/node-instance";
type CCFilterNodeTypeDef = {
    inputs: {
        in: 'controlchange';
    };
    outputs: {
        out: 'controlchange';
    };
    props: {
        filter: number[];
    };
    state: {};
};
declare const CCFilterNodeDef: MidiplexNodeDefinition<CCFilterNodeTypeDef>;
declare class CCFilterNode extends MidiplexNodeInstance<CCFilterNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCFilterNodeTypeDef>);
}
export { CCFilterNodeTypeDef, CCFilterNodeDef, CCFilterNode };
