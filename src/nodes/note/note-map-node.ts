import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";

type NoteMapNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff'
    },
    outputs: {
        out: 'noteon' | 'noteoff'
    },
    props: {
        notes: NoteMap
    },
    state: {}
}


const NoteMapNodeDef : MidiplexNodeDefinition<NoteMapNodeTypeDef> = {
    name: 'Note Map',
    key: 'NOTE_MAP_NODE',
    description: 'Map noteon/noteoff messages to other notes.',
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
        notes: {
            name: 'Note Mapping',
            value: {}
        }
    },
    node({ prop, send, onMessage }){
        onMessage((message) => {
            /**
             * Check the CC map to see if one or more remapping was provided.
             * If no mapping is provided, CC messages are passed through unmodified.
             */
            let map = prop('notes');
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

class NoteMapNode extends MidiplexNodeInstance<NoteMapNodeTypeDef> {
    constructor(key: string, config: NodeConfig<NoteMapNodeTypeDef> = {}){
        super(key, NoteMapNodeDef, config);
    }
}

export { NoteMapNodeTypeDef, NoteMapNodeDef, NoteMapNode };