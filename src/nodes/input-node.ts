import { MidiplexNodeInstance } from "@/node-instance";
import { MidiplexMessage } from "@/midiplex-message";
import { WebMidi, MessageEvent } from "webmidi";
import { AllMessageTypes } from "@/util";
import { MidiClock } from '../clock';
 
type InputNodeTypeDef = {
    inputs: {},
    outputs: {
        out: MidiMessageType,
        clock: MidiClockMessageType
    },
    props: {
        inputId: string | null,
        timeSignature: [number, number]
    },
    state: {}
}

const InputNodeDefinition : MidiplexNodeDefinition<InputNodeTypeDef> = {
    name: 'Input',
    key: 'INPUT_NODE',
    description: 'A node that receives MIDI messages from a MIDI device. Messages are immediately sent to the node\'s output.',
    inputs: {},
    outputs: {
        out: {
            name: 'Out',
            messageTypes: AllMessageTypes
        },
        clock: {
            name: 'Clock',
            messageTypes: ['clock', 'timecode', 'start', 'stop']
        }
    },
    props: {
        inputId: {
            name: 'Input',
            value: null
        },
        timeSignature: {
            name: 'Time Signature',
            value: [4, 4]
        }
    },
    node: ({ prop, send, update, receive }) => {
        let inputId = prop('inputId');
        let clock = new MidiClock(prop('timeSignature'));

        const handleInputMessage = (event: MessageEvent) => {
            let t = event.message.type;
            if (t === 'clock' || t === 'timecode' || t === 'start' || t === 'stop'){
                let beat = clock.tick( <MidiClockMessageType> event.message.type );
                send(new MidiplexMessage(event.message, { beat }), 'clock');
                return;
            }
            send(new MidiplexMessage(event.message), 'out');
        }

        // const handleClock = (event: MessageEvent) => {
        //     console.log(event.type);
        //     send(new MidiplexMessage(event.message, []), 'clock');
        // }

        const bind = () => {
            if (inputId){
                const input = WebMidi.getInputById(inputId);
                if (input){
                    input.addListener('midimessage', handleInputMessage);
                    //input.addListener('clock', handleClock);
                    return;
                }
                console.warn(`Input ${inputId} not found`);
            }
        }

        const unbind = () => {
            if (inputId){
                const input = WebMidi.getInputById(inputId);
                if (input){
                    input.removeListener('midimessage', handleInputMessage);
                    //input.removeListener('clock', handleClock);
                }
            }
        }

        update(() => {
            unbind();
            inputId = prop('inputId');
            bind();
        })

        bind();
    }
};

class InputNode extends MidiplexNodeInstance<InputNodeTypeDef> {
    constructor(key: string){
        super(key, InputNodeDefinition);
    }
}

export { InputNodeTypeDef, InputNodeDefinition, InputNode };