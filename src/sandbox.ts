import { Nodes } from "./midiplex";

//Our input hardware device
let input = new Nodes.InputNode('input');
    input.setProp('inputId', 'input-0');

//Our output hardware device
let output = new Nodes.OutputNode('output');
    output.setProp('outputId', 'output-0');

//This node will allow only the specified message types to pass
let messagePass = new Nodes.MessageTypePassNode('message-filter', { 
    props: {
        messageTypes: ['noteon', 'noteoff']
    } 
});


// Route our nodes input --> messagePass --> output.
input.connect('out', messagePass.getInputEdge('in'));
messagePass.connect('out', output.getInputEdge('in'));

