import { expect, test } from '@jest/globals';
import { CCFilterNode } from './cc-filter-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let filter = new CCFilterNode('cc-filter-node', { 
        controllers: new Set([74, 75]),
        mode: 'filter'
    });
    
let pass = new CCFilterNode('cc-pass-node', { 
    controllers: new Set([74, 75]),
    mode: 'pass'
});

filter.connect('out', debug.getInputEdge('in'));
pass.connect('out', debug.getInputEdge('in'));

let cc1 = Util.Generate.controlchange(80, 127);
let cc2 = Util.Generate.controlchange(74, 127); //should be filtered or passed depending on test
let cc3 = Util.Generate.controlchange(86, 127);
let cc4 = Util.Generate.controlchange(75, 127); //should be filtered or passed depending on test

describe('CCFilterNode - "filter" mode', () => {
    test('CC message for controllers 74 and 75 are filtered out', (done) => {
        let messageCount = 0;
        debug.setProp('callback', (m: MidiplexMessage) => {
            messageCount++;
            expect([74, 75].includes(m.data[1])).toBe(false);
            expect([80, 86].includes(m.data[1])).toBe(true);
            if (messageCount >= 2){
                done();
            }
        });

        filter.receive(cc1, 'in');
        filter.receive(cc2, 'in');
        filter.receive(cc3, 'in');
        filter.receive(cc4, 'in');
    });
})

describe('CCFilterNode - "pass" mode', () => {
    test('All CC messages are filtered out accept for those specified', (done) => {
        let messageCount = 0;
        debug.setProp('callback', (m: MidiplexMessage) => {
            messageCount++;
            expect([74, 75].includes(m.data[1]) && m.data[2] === 127).toBe(true);
            expect(![80, 86].includes(m.data[1])).toBe(true);
            if (messageCount >= 2){
                done();
            }
        });

        pass.receive(cc1, 'in');
        pass.receive(cc2, 'in');
        pass.receive(cc3, 'in');
        pass.receive(cc4, 'in');
    });
})