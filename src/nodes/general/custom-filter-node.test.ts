import { expect, test } from '@jest/globals';
import { CustomFilterNode } from './custom-filter-node';
import { DebugNode } from './debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let node = new CustomFilterNode('custom-filter-node', {
        filter: (message: MidiplexMessage) => {
            return message.data[1] === 74;
        }
    });
    
    node.connect('out', debug.getInputEdge('in'));

describe('CustomFilterNode', () => {
    test('Custom filter callback allows message to pass', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[1]).toBe(74);
            done();
        });
        
        let messageFiltered = Util.Generate.controlchange(0, 127);
        let messagePass = Util.Generate.controlchange(74, 127);
        node.receive(messageFiltered, 'in'); //Should not be received by debug node
        node.receive(messagePass, 'in'); //Should be received by debug node
    });

})



