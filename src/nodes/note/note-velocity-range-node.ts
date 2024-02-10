import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util/util";
import { MidiplexMessage } from "@/midiplex-message";

type NoteVelocityRangeNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff'
    },
    outputs: {
        out: 'noteon' | 'noteoff'
    },
    props: {
        range: MidiRange,
        mode: 'filter' | 'pass' | 'clamp' | 'scale'
    },
    state: {}
}

const NoteVelocityRangeNodeDef : MidiplexNodeDefinition<NoteVelocityRangeNodeTypeDef> = {
    name: 'Note Velocity Range',
    key: 'NOTE_VELOCITY_RANGE_NODE',
    description: `Filter, pass, or clamp the velocity of noteon / noteoff messages.`,
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
        range: {
            name: 'Range',
            value: {
                min: 0,
                max: 127
            }
        },
        mode: {
            name: 'Mode',
            value: 'filter'
        }
    },
    node({ prop, send, onMessage }){
        onMessage((message) => {
            let mode = prop('mode');
            let range = prop('range');
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
        })
    }
};

class NoteVelocityRangeNode extends MidiplexNodeInstance<NoteVelocityRangeNodeTypeDef> {
    constructor(key: string, config: NodeConfig<NoteVelocityRangeNodeTypeDef> = {}){
        super(key, NoteVelocityRangeNodeDef, config);
    }
}

export { NoteVelocityRangeNodeTypeDef, NoteVelocityRangeNodeDef, NoteVelocityRangeNode };