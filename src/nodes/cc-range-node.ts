import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util";

type CCRangeNodeTypeDef = {
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

const CCRangeNodeDef : MidiplexNodeDefinition<CCRangeNodeTypeDef> = {
    name: 'CC Range',
    key: 'CC_RANGE_NODE',
    description: `Filter the range of values sent for a given CC.`,
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
            let range = map[cc];
            if (range) { 
                //If a mapping exists, only send if the message is within the range
                if (Util.Controlchange.inRange(message, range)){
                    send(message, 'out');
                }
                return;
            }

            //If no mapping exists, send the message unmodified
            send(message, 'out');
        })
    }
};

class CCRangeNode extends MidiplexNodeInstance<CCRangeNodeTypeDef> {
    constructor(key: string, config: NodeConfig<CCRangeNodeTypeDef> = {}){
        super(key, CCRangeNodeDef, config);
    }
}

export { CCRangeNodeTypeDef, CCRangeNodeDef, CCRangeNode };