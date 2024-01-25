import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util/util";

type NotePolyLatchNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff'
    },
    outputs: {
        out: 'noteon' | 'noteoff'
    },
    props: {
        maxNotes: number
    },
    state: {
        lastNoteOn: MidiplexMessage | null
    }
}

const NotePolyLatchNodeDef :  MidiplexNodeDefinition<NotePolyLatchNodeTypeDef> = {
    name: 'Note Poly Latch Node',
    key: 'NOTE_POLY_LATCH_NODE',
    description: 'Latch any number of notes.',
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
        maxNotes: {
            name: 'Max Notes',
            value: Infinity
        }
    },
    node({ send, onMessage, state, prop, onUpdate }){

        //Create poly keyboard with max notes, at least one
        const getMaxNotes = () =>  Util.Math.clamp(prop('maxNotes'), 1, Infinity);
        let keyboard = Util.Note.getPolyLatchKeyboard(getMaxNotes());
        onUpdate(() => keyboard.setMaxLatch(getMaxNotes()));
        
        //Just send notes when the keyboard tells us to
        keyboard.on('noteon', (m: MidiplexMessage) => send(m, 'out'));
        keyboard.on('noteoff', (m: MidiplexMessage) => send(m, 'out'));

        onMessage((message) => {
            //Route notes to keyboard
            keyboard.message(message);
        });
    }
};


class NotePolyLatchNode extends MidiplexNodeInstance<NotePolyLatchNodeTypeDef> {
    constructor(key: string, config: NodeConfig<NotePolyLatchNodeTypeDef> = {}){
        super(key, NotePolyLatchNodeDef, config);
    }
}

export { NotePolyLatchNodeTypeDef, NotePolyLatchNodeDef, NotePolyLatchNode };