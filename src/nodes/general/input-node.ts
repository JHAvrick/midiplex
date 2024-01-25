import { MidiplexNodeInstance } from "@/node-instance";
import { MidiplexMessage, MidiplexClockMessage } from "@/midiplex-message";
import { WebMidi, MessageEvent } from "webmidi";
import { AllMessageTypes } from "@/util/util";
import { MidiClock } from '../../util/clock';
 
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
    ignoreUnknownMessageTypes: true,
    outputs: {
        out: {
            name: 'Out',
            type: 'message',
            messageTypes: AllMessageTypes
        },
        clock: {
            name: 'Clock',
            type: 'clock'
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
    node: ({ prop, send, onUpdate }) => {
        let inputId = prop('inputId');
        let clock = new MidiClock(prop('timeSignature'));

        const handleInputMessage = (event: MessageEvent) => {
            let t = event.message.type;
            if (t === 'clock' || t === 'timecode' || t === 'start' || t === 'stop'){
                let beat = clock.tick( <MidiClockMessageType> event.message.type );
                send(new MidiplexClockMessage(event.message, { beat }), 'clock');
                return;
            }
            send(new MidiplexMessage(event.message), 'out');
        }

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

        onUpdate(() => {
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