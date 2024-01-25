import { expect, test } from '@jest/globals';
import { MessageTypeFilterNode } from './message-type-filter-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let pass = new MessageTypeFilterNode('message-type-filter-node', {
    'messageTypes': ['noteon', 'noteoff'],
    'mode': 'pass'
});

let filter = new MessageTypeFilterNode('message-type-filter-node', {
    'messageTypes': ['noteon', 'noteoff'],
    'mode': 'filter'
});

pass.connect('out', debug.getInputEdge('in'));

describe('MessageTypeFilterNode - "pass" mode', () => {
    test('Only "noteon" or "noteoff" message types are passed through to the "out" edge', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.type).toBe('noteon');
            done();
        });
        
        let noteon = Util.Generate.noteon('C#1', 127);
        let programchange = Util.Generate.programchange(0);
        let cc = Util.Generate.controlchange(74, 127);

        pass.receive(programchange, 'in'); //Should not be received by debug node
        pass.receive(cc, 'in');
        pass.receive(noteon, 'in'); //Should not be received by debug node
    });
});



