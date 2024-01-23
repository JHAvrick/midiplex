import { MidiplexNodeInstance } from "@/node-instance";
type CCScaleNodeTypeDef = {
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
declare const CCScaleNodeDef: MidiplexNodeDefinition<CCScaleNodeTypeDef>;
/**
 * CCScaleNode: This node "rescales" control change messages to a smaller range. Useful for mapping a control (slider, knob, etc.) to a
 * smaller range while preserving the control's full range of motion.
 */
declare class CCScaleNode extends MidiplexNodeInstance<CCScaleNodeTypeDef> {
    constructor(key: string, config?: NodeConfig<CCScaleNodeTypeDef>);
}
export { CCScaleNodeTypeDef, CCScaleNodeDef, CCScaleNode };
