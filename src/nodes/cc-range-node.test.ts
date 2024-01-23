import { expect, test } from '@jest/globals';
import { CCRangeNode } from './cc-range-node';
import { DebugNode } from './debug-node';
import { MidiplexMessage } from '../midiplex-message';
import { Util } from '../util';

let debug = new DebugNode('debug');
let node = new CCRangeNode('cc-range-node', { 
        props: {
            mapping: {
                74: { min: 0, max: 64 }
            }
        }
    });
    
node.connect('out', debug.getInputEdge('in'));

// let ccFalsy = Util.Generate.controlchange(0, 0); //CC 0 is falsy - is this even a valid CC message?
// let ccMin = Util.Generate.controlchange(74, 0); //Too low
// let ccInRange = Util.Generate.controlchange(74, 75); //In range, will be rescaled
// let ccMax = Util.Generate.controlchange(74, 127); //Too high

let ccInRange = Util.Generate.controlchange(74, 52); 
let ccOutOfRange = Util.Generate.controlchange(74, 65);


describe('CCRangeNode', () => {
    test('CC value above range is not sent, CC value within range is sent', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 52).toBe(true);
            done();
        });

        node.receive(ccOutOfRange, 'in');
        node.receive(ccInRange, 'in');
    });

    // test('CC value is scaled within the given range', (done) => {
    //     debug.setProp('callback', (m: MidiplexMessage) => {
    //         expect(m.data[2] >= 64 && m.data[2] <= 100).toBe(true);
    //         done();
    //     });

    //     node.receive(ccInRange, 'in');
    // });

    // test('CC value is scaled to max value specified by range', (done) => {
    //     debug.setProp('callback', (m: MidiplexMessage) => {
    //         expect(m.data[2] === 100).toBe(true);
    //         done();
    //     });

    //     node.receive(ccMax, 'in');
    // });
})