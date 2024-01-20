import { expect, test } from '@jest/globals';
import { MessageTypePassNode } from './message-type-pass-node';
import { DebugNode } from './debug-node';
import { MidiplexMessage } from '../midiplex-message';
import { Util } from '../util';

let debug = new DebugNode('debug');
let node = new MessageTypePassNode('message-type-split-node', {
    props: {
        'messageTypes': ['noteon', 'noteoff']
    }
});

node.connect('out', debug.getInputEdge('in'));

describe('MessageTypePassNode', () => {
    test('Only "noteon" or "noteoff" message type is passed through to the "out" edge', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.type).toBe('noteon');
            done();
        });
        
        let noteon = Util.Generate.noteon('C#1', 127);
        let programchange = Util.Generate.programchange(0);
        let cc = Util.Generate.controlchange(74, 127);

        node.receive(programchange, 'in'); //Should not be received by debug node
        node.receive(cc, 'in');
        node.receive(noteon, 'in'); //Should not be received by debug node
    });
});



