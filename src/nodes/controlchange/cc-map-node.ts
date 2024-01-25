import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";

type CCMapNodeTypeDef = {
    inputs: {
        in: 'controlchange'
    },
    outputs: {
        out: 'controlchange'
    },
    props: {
        mapping: CCMap
    },
    state: {}
}

interface CCMap {
    [key: number]: number[]
}

const CCMapNodeDef : MidiplexNodeDefinition<CCMapNodeTypeDef> = {
    name: 'CC Map',
    key: 'CC_MAP_NODE',
    description: 'Map control change messages to other control change destinations.',
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
            name: 'Mapping',
            value: {}
        }
    },
    node({ prop, send, onMessage }){
        onMessage((message) => {
            /**
             * Check the CC map to see if one or more remapping was provided.
             * If no mapping is provided, CC messages are passed through unmodified.
             */
            let map = prop('mapping');
            let cc = message.data[1];
            if (map[cc]) {
                let mData = message.data;
                map[cc].forEach((cc) => {
                    send(new MidiplexMessage(new Uint8Array([mData[0], cc, mData[2]])), 'out');
                });
                return;
            }

            send(message, 'out');
        })
    }
};

class CCMapNode extends MidiplexNodeInstance<CCMapNodeTypeDef> {
    constructor(key: string, config: NodeConfig<CCMapNodeTypeDef> = {}){
        super(key, CCMapNodeDef, config);
    }
}

export { CCMapNodeTypeDef, CCMapNodeDef, CCMapNode };