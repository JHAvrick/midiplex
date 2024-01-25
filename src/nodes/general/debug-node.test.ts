import { expect, test } from '@jest/globals';
import { DebugNode } from './debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let cc = Util.Generate.controlchange(74, 127);

describe('DebugNode', () => {
    test('Debug uses callback when a message is received', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[1]).toBe(74);
            done();
        });
        
        debug.receive(cc, 'in'); //Should not be received by debug node
    });
})



