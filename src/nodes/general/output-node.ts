import { MidiplexNodeInstance } from "@/node-instance";
import { AllMessageTypes } from "@/util/util";
import { WebMidi, Output } from "webmidi";

type OutputNodeTypeDef = {
    inputs: {
        in: MidiMessageType
    },
    outputs: {},
    props: {
        outputId: string | null
    },
    state: {}
}

const OutputNodeDefinition : MidiplexNodeDefinition<OutputNodeTypeDef> = {
    name: 'Input',
    key: 'INPUT_NODE',
    description: 'A node that onMessages MIDI messages from a MIDI device. Messages are immediately sent to the node\'s output.',
    inputs: {
        in: {
            name: 'Out',
            messageTypes: AllMessageTypes
        }
    },
    outputs: {},
    props: {
        outputId: {
            name: 'Output',
            value: null
        }
    },
    node: ({ prop, send, onUpdate, onMessage }) => {
        let outputId = prop('outputId');
        let output : Output | undefined;
        if (outputId){
            output = WebMidi.getOutputById(outputId);
            if (!output){
                console.warn(`Output ${outputId} not found`);
            }
        }

        onMessage((message, edge) => {
            if (output){
                output.send(message.data);
            }
        });
        
        onUpdate(() => {
            outputId = prop('outputId');
            if (outputId){
                output = WebMidi.getOutputById(outputId);
                if (!output){
                    console.warn(`Output ${outputId} not found`);
                }
            }
        })
    }
};

class OutputNode extends MidiplexNodeInstance<OutputNodeTypeDef> {
    constructor(key: string){
        super(key, OutputNodeDefinition);
    }
}

export { OutputNodeTypeDef, OutputNodeDefinition, OutputNode };