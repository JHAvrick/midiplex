import { MidiplexMessage } from "@/midiplex-message";
import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes, Util } from "@/util/util";

type DebugNodeTypeDef = {
    inputs: {
        in: MidiMessageType,
        clock: MidiClockMessageType
    },
    outputs: {
        out: MidiMessageType
    },
    props: {
        logToConsole: boolean,
        callback: (message: MidiplexMessage) => void
    },
    state: {}
}

const DebugNodeDef : MidiplexNodeDefinition<DebugNodeTypeDef> = {
    name: 'Debug',
    key: 'DEBUG_NODE',
    description: '',
    inputs: {
        in: {
            name: 'In',
            messageTypes: AllMessageTypes
        },
        clock: {
            name: 'Clock',
            messageTypes: ['clock', 'start', 'stop']
        }
    },
    outputs: {
        out: {
            name: 'Out',
            messageTypes: AllMessageTypes
        }
    },
    props: {
        logToConsole: {
            name: 'Log to console',
            value: false
        },
        callback: {
            name: 'Callback',
            value: () => {}
        }
    },
    node({ send, onMessage, prop }){
        // let quarterNote = Util.Clock.onBeat(4, () => {
        //     console.log('quarter note');
        // })

        // // let eighthNote = Util.Clock.onBeat(8, () => {
        // //     console.log('eighth note');
        // // })

        // let sixteenthNote = Util.Clock.onBeat(16, () => {
        //     console.log('sixteenth note');
        // })

        onMessage((message, edge) => {
            // if (edge === 'clock' && message.type === 'clock'  && message.beat === 32){
            //     //console.log(message.beat);
            //     send(Util.Generate.noteon(75, 64), 'out');
            //     send(Util.Generate.noteon(77, 64), 'out');
            //     setTimeout(() => {
            //         send(Util.Generate.noteoff(75, 64), 'out');
            //         send(Util.Generate.noteoff(77, 64), 'out');
            //     }, 500); 
            //     return;
            // }

            if (prop('logToConsole')) {
                console.log(message);
            }

            prop('callback')(message);

            if (!Util.Clock.isClockMessage(message)){
                send(message, 'out');
                return;
            }

        });
    }
}


class DebugNode extends MidiplexNodeInstance<DebugNodeTypeDef> {
    constructor(key: string, config: NodeConfig<DebugNodeTypeDef> = {}){
        super(key, DebugNodeDef, config);
    }
}

export { DebugNodeTypeDef, DebugNodeDef, DebugNode };