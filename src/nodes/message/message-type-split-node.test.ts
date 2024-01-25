import { expect, test } from '@jest/globals';
import { MessageTypeSplitNode } from './message-type-split-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let node = new MessageTypeSplitNode('message-type-split-node');
    node.connect('controlchange', debug.getInputEdge('in'));

describe('MessageTypeSplitNode', () => {
    test('Only "controlchange" message is passed through to the "controlchange" edge', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.type).toBe('controlchange');
            done();
        });
        
        let noteon = Util.Generate.noteon('C#1', 127);
        let programchange = Util.Generate.programchange(0);
        let cc = Util.Generate.controlchange(74, 127);
        node.receive(noteon, 'in'); //Should not be received by debug node
        node.receive(programchange, 'in'); //Should not be received by debug node
        node.receive(cc, 'in');
    });
});



