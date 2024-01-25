//This node lets you define which CC controls are not allowed to pass through.

import { MidiplexNodeInstance } from "@/node-instance";

type CCFilterNodeTypeDef = {
    inputs: {
        in: 'controlchange'
    },
    outputs: {
        out: 'controlchange'
    },
    props: {
        controllers: Set<number>,
        mode: 'filter' | 'pass'
    },
    state: {}
}

const CCFilterNodeDef : MidiplexNodeDefinition<CCFilterNodeTypeDef> = {
    name: 'CC Filter',
    key: 'CC_FILTER_NODE',
    description: 'Specify which CC messages are allowed to pass through.',
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
        controllers: {
            name: 'Controllers',
            value: new Set()
        },
        mode: {
            name: 'Mode',
            value: 'filter',
        }
    },
    node({ prop, send, onMessage }){
        onMessage((message) => {
            let filter = prop('controllers');
            if (prop('mode') === 'filter'){
                if (!filter.has(message.data[1])){
                    send(message, 'out');
                }
            } else if (filter.has(message.data[1])){
                send(message, 'out');
            }
        })
    }
};

class CCFilterNode extends MidiplexNodeInstance<CCFilterNodeTypeDef> {
    constructor(key: string, config: NodeConfig<CCFilterNodeTypeDef> = {}){
        super(key, CCFilterNodeDef, config);
    }
}

export { CCFilterNodeTypeDef, CCFilterNodeDef, CCFilterNode };