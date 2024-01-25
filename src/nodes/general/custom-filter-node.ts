import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util/util";

type CustomFilterNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {
        out: MidiMessageType,
    },
    props: {
        filter: (message: MidiplexMessage) => boolean,
    },
    state: {}
}

const CustomFilterNodeDef :  MidiplexNodeDefinition<CustomFilterNodeTypeDef> = {
    name: 'Custom Filter',
    key: 'CUSTOM_FILTER_NODE',
    description: '',
    inputs: {
        in: {
            name: 'In',
            messageTypes: AllMessageTypes
        }
    },
    outputs: {
        out: {
            name: 'Out',
            messageTypes: AllMessageTypes
        }
    },
    props: {
        filter: {
            name: 'Filter Function',
            value: () => true
        }
    },
    node({ send, onMessage, prop }){
        onMessage((message) => {
            if(prop('filter')(message)){
                send(message, 'out');
            }
        });
    }
};


class CustomFilterNode extends MidiplexNodeInstance<CustomFilterNodeTypeDef> {
    constructor(key: string, config: NodeConfig<CustomFilterNodeTypeDef> = {}){
        super(key, CustomFilterNodeDef, config);
    }
}

export { CustomFilterNodeTypeDef, CustomFilterNodeDef, CustomFilterNode };