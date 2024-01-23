import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { Util, convertRange } from "@/util";

type CCScaleNodeTypeDef = {
    inputs: {
        in: 'controlchange'
    },
    outputs: {
        out: 'controlchange'
    },
    props: {
        mapping: CCRangeMap
    },
    state: {}
}

const CCScaleNodeDef : MidiplexNodeDefinition<CCScaleNodeTypeDef> = {
    name: 'CC Range',
    key: 'CC_SCALE_NODE',
    description: `Rescale CC messages to a smaller range. Useful for mapping a knob to a smaller range while preserving the control's full range of motion.`,
    inputs: {
        in: {
            name: 'In',
            messageTypes: ['controlchange']
        }
    },
    outputs: {
        out: {
            name: 'Out',
            messageTypes: ['controlchange']
        }
    },
    props: {
        mapping: {
            name: 'Range Mapping',
            value: {}
        }
    },
    node({ prop, send, receive }){
        receive((message) => {
            /**
             * Check the CC map to see if a range mapping was provided for the give CC value.
             * If no mapping is provided, CC messages are passed through unmodified.
             */
            let map = prop('mapping');
            let cc = message.data[1];
            if (map[cc] !== undefined && map[cc] !== null) {
                let data = new Uint8Array([
                    message.data[0],
                    message.data[1], 
                    convertRange(
                        message.data[2], 
                        0, 
                        127, 
                        map[cc].min,
                        map[cc].max
                    )
                ]);

                send(new MidiplexMessage(data), 'out');
                return;
            }

            send(message, 'out');
        })
    }
};

/**
 * CCScaleNode: This node "rescales" control change messages to a smaller range. Useful for mapping a control (slider, knob, etc.) to a 
 * smaller range while preserving the control's full range of motion.
 */
class CCScaleNode extends MidiplexNodeInstance<CCScaleNodeTypeDef> {
    constructor(key: string, config: NodeConfig<CCScaleNodeTypeDef> = {}){
        super(key, CCScaleNodeDef, config);
    }
}

export { CCScaleNodeTypeDef, CCScaleNodeDef, CCScaleNode };