import { MidiplexNodeInstance } from "@/node-instance";
type CCMapNodeTypeDef = {
    inputs: {
        in: 'controlchange';
    };
    outputs: {
        out: 'controlchange';
    };
    props: {
        mapping: CCMap;
    };
    state: {};
};
interface CCMap {
    [key: number]: number[];
}
declare const CCMapNodeDef: MidiplexNodeDefinition<CCMapNodeTypeDef>;
declare class CCMapNode extends MidiplexNodeInstance<CCMapNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCMapNodeTypeDef>);
}
export { CCMapNodeTypeDef, CCMapNodeDef, CCMapNode };
