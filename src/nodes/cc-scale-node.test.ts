import { expect, test } from '@jest/globals';
import { CCScaleNode } from './cc-scale-node';
import { DebugNode } from './debug-node';
import { MidiplexMessage } from '../midiplex-message';
import { Util } from '../util';

let debug = new DebugNode('debug');
let node = new CCScaleNode('cc-scale-node', { 
        props: {
            mapping: {
                0: { min: 64, max: 100 },
                74: { min: 64, max: 100 }
            }
        }
    });
    
    node.connect('out', debug.getInputEdge('in'));

let ccFalsey = Util.Generate.controlchange(0, 0); //CC 0 is falsey - is this even a valid CC message?
let ccMin = Util.Generate.controlchange(74, 0); //Too low
let ccInRange = Util.Generate.controlchange(74, 75); //In range, will be rescaled
let ccMax = Util.Generate.controlchange(74, 127); //Too high

describe('CCScaleNode', () => {
    test('Falsey CC message is processed correctly', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] >= 64).toBe(true);
            done();
        });

        node.receive(ccFalsey, 'in');
    });

    test('CC value is scaled to min value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] >= 64).toBe(true);
            done();
        });

        node.receive(ccMin, 'in');
    });

    test('CC value is scaled within the given range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] >= 64 && m.data[2] <= 100).toBe(true);
            done();
        });

        node.receive(ccInRange, 'in');
    });

    test('CC value is scaled to max value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 100).toBe(true);
            done();
        });

        node.receive(ccMax, 'in');
    });
})