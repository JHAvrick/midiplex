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
    WebMidi.inputs.forEach(input => {
        console.log(input.name, input.id);
    })

    // WebMidi.inputs[0].on('clock', (e) => {
    //     console.log('????', e.type);
    // })

    let input = new Nodes.InputNode('input', {
        props: {
            inputId: WebMidi.inputs[0].id
        }
    });

    input.setProp('inputId', WebMidi.inputs[0].id);

    let debug = new Nodes.DebugNode('debug', {
        props: {
            logToConsole: false
        }
    });

    

    input.connect('clock', debug.getInputEdge('clock'));
})();
