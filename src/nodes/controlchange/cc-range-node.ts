import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util/util";
import { MidiplexMessage } from "@/midiplex-message";

type CCRangeNodeTypeDef = {
    inputs: {
        in: 'controlchange'
    },
    outputs: {
        out: 'controlchange'
    },
    props: {
        controllers: CCRangeMap,
        mode: 'filter' | 'pass' | 'clamp' | 'scale'
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
        controllers: {
            name: 'Range Mapping',
            value: {}
        },
        mode: {
            name: 'Mode',
            value: 'pass'
        }
    },
    node({ prop, send, onMessage }){
        onMessage((message) => {
            let mode = prop('mode');
            let range = prop('controllers')?.[message.data[1]];
            if (range){
                switch (mode) {
                    case 'filter':
                        if (!Util.Math.inRange(message.data[2], range)){
                            send(message, 'out');
                        }
                        return;
                    case 'pass':
                        if (Util.Math.inRange(message.data[2], range)){
                            send(message, 'out');
                        }
                        return;
                    case 'clamp':
                        let dataClamp = new Uint8Array([message.data[0], message.data[1],
                            Util.Math.clamp(message.data[2], range.min, range.max)
                        ]);
                        
                        send(new MidiplexMessage(dataClamp), 'out');
                        return;
                    case 'scale':
                        let dataScale = new Uint8Array([
                            message.data[0],
                            message.data[1], 
                            Util.Math.convertRange(message.data[2], 0, 127, range.min, range.max)
                        ]);

                        send(new MidiplexMessage(dataScale), 'out');
                        return;
                }
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