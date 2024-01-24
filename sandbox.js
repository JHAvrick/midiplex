// import { WebMidi, Nodes, Util } from './src/midiplex';

const { WebMidi, Nodes, Util } = require('./dist/midiplex.min.js');

// Nodes.CustomFilterNode

// Util.Generate.controlchange(1, 2, 3);

// const { Nodes } = require('./dist/midiplex.min.js')

// console.log(Nodes);

// async function init(){
//     await WebMidi.enable();

//     console.log(WebMidi.inputs, WebMidi.outputs);
// }

// init();


(async () => {
    await WebMidi.enable();
    
    //WebMidi.sendAllNotesOff();

    WebMidi.inputs.forEach(input => {
        console.log(input.name, input.id);
    })

    WebMidi.outputs.forEach(output => {
        console.log(output.name, output.id);
        output.sendAllNotesOff();
    })

    // WebMidi.inputs[0].on('clock', (e) => {
    //     console.log('????', e.type);
    // })

    let input = new Nodes.InputNode('input', {
        props: {
            inputId: 'VI49 Out'
        }
    });

    input.setProp('inputId', 'IAC Driver Bus 1');

    let output = new Nodes.OutputNode('output', {
        props: {
            outputId: 'MIDI 8x8 Port 4'
        }
    });

    output.setProp('outputId', 'MIDI 8x8 Port 4');

    //input.connect('out', output.getInputEdge('in'));

    // input.setProp('inputId', WebMidi.inputs[0].id);

    let debug = new Nodes.DebugNode('debug', {
        props: {
            logToConsole: false
        }
    });

    let latch = new Nodes.NotePolyLatchNode();
        latch.setProp('maxNotes', 1);

    //input.connect('out', debug.getInputEdge('in'));
    input.connect('clock', debug.getInputEdge('clock'));
    //latch.connect('out', output.getInputEdge('in'));
    debug.connect('out', output.getInputEdge('in'));

    

    // input.connect('clock', debug.getInputEdge('clock'));
})();
