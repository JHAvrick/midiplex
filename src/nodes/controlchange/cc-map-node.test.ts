import { expect, test } from '@jest/globals';
import { CCMapNode } from './cc-map-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let node = new CCMapNode('cc-map-node', { 
        mapping: { 74: [44, 45] } 
    });
    
    node.connect('out', debug.getInputEdge('in'));

describe('CCMapNode', () => {

    test('Map a single CC value to multiple other CC values', (done) => {
        let messageCount = 0;
        debug.setProp('callback', (m: MidiplexMessage) => {
            messageCount++;
            expect([44, 45].includes(m.data[1]) && m.data[2] === 127).toBe(true);
            if (messageCount === 2){
                done();
            }
        });
    
        let cc = Util.Generate.controlchange(74, 127);
        node.receive(cc, 'in');
    });

    test('Pass thru CC values which are not mapped', (done) => {
        let messageCount = 0;
        debug.setProp('callback', (m: MidiplexMessage) => {
            messageCount++;
            expect([80, 86].includes(m.data[1]) && m.data[2] === 127).toBe(true);
            if (messageCount === 2){
                done();
            }
        });
    
        let cc = Util.Generate.controlchange(80, 127);
        let cc2 = Util.Generate.controlchange(86, 127);
        node.receive(cc, 'in');
        node.receive(cc2, 'in');
    });

})



