import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { clamp } from "@/util/util";

type NoteTransposeNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff'
    },
    outputs: {
        out: 'noteon' | 'noteoff',
    },
    props: {
        transpose: number 
    },
    state: {}
}

const NoteTransposeNodeDef = {
    name: 'Transpose',
    key: 'TRANSPOSE_NODE',
    description: '',
    inputs: {
        in: {
            name: 'In',
            messageTypes: ['noteon', 'noteoff']
        }
    },
    outputs: {
        out: {
            name: 'Out',
            messageTypes: ['noteon', 'noteoff']
        }
    },
    props: {
        transpose: {
            name: 'Transpose',
            value: 0
        }
    },
    node({ send, onMessage, prop }){
        onMessage((message, edge) => {
            let transpose = prop('transpose');
            let transposed = clamp(message.data[1] + transpose, 0, 127);
            let data = new Uint8Array([message.data[0], transposed, message.data[2]]);
            send(new MidiplexMessage(data), 'out');
        });
    }
} satisfies MidiplexNodeDefinition<NoteTransposeNodeTypeDef>;


class NoteTransposeNode extends MidiplexNodeInstance<NoteTransposeNodeTypeDef> {
    constructor(key: string, config: NodeConfig<NoteTransposeNodeTypeDef> = {}){
        super(key, NoteTransposeNodeDef, config);
    }
}

export { NoteTransposeNodeTypeDef, NoteTransposeNodeDef, NoteTransposeNode };