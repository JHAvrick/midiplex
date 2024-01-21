import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { Util } from "@/util";

type MonoLatchNodeTypeDef = {
    inputs: {
        in: 'noteon' | 'noteoff'
    },
    outputs: {
        out: 'noteon' | 'noteoff'
    },
    props: {},
    state: {
        lastNoteOn: MidiplexMessage | null
    }
}

const MonoLatchNodeDef :  MidiplexNodeDefinition<MonoLatchNodeTypeDef> = {
    name: 'Mono Latch Node',
    key: 'MONO_LATCH_NODE',
    description: 'Latch a noteon message until another note is pressed or the same note is pressed again.',
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
    state: {
        lastNoteOn: {
            name: 'Last Note On',
            value: null
        }
    },
    node({ send, receive, state }){
        receive((message) => {
            let lastNoteOn = state('lastNoteOn');
            /**
             * First note, no active noteon 
             */
            if (lastNoteOn === null){
                state('lastNoteOn', message.clone());
                send(message, 'out');
                return;
            }

            /**
             * Same noteon received twice, end latch
             */ 
            if (Util.Note.equals(message, lastNoteOn)){
                state('lastNoteOn', null);
                send(Util.Note.off(message), 'out');
                return;
            }

            /**
             * New noteon received, end last held note and start new latch
             */
            let offNote = Util.Note.off(lastNoteOn);
            send(offNote, 'out');
            send(message, 'out');

            //Track the new noteon
            state('lastNoteOn', message.clone());
        });
    }
};


class MonoLatchNode extends MidiplexNodeInstance<MonoLatchNodeTypeDef> {
    constructor(key: string, config: NodeConfig<MonoLatchNodeTypeDef> = {}){
        super(key, MonoLatchNodeDef, config);
    }
}

export { MonoLatchNodeTypeDef, MonoLatchNodeDef, MonoLatchNode };