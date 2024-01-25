import { expect, test } from '@jest/globals';
import { CCRangeNode } from './cc-range-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let filter = new CCRangeNode('filter', { 
    mode: 'filter',
    controllers: {
        74: { 
            min: 50, 
            max: 100
        }
    }
});

let pass = new CCRangeNode('pass', { 
    mode: 'pass',
    controllers: {
        74: { 
            min: 50, 
            max: 100
        }
    }
});

let clamp = new CCRangeNode('clamp', { 
    mode: 'clamp',
    controllers: {
        74: {             
            min: 50, 
            max: 100 
        }
    }
});

let scale = new CCRangeNode('scale', { 
    mode: 'scale',
    controllers: {
        74: {             
            min: 50, 
            max: 100 
        }
    }
});
    
filter.connect('out', debug.getInputEdge('in'));
pass.connect('out', debug.getInputEdge('in'));
clamp.connect('out', debug.getInputEdge('in'));
scale.connect('out', debug.getInputEdge('in'));

//Each filter mode should handle these somewhat differently
let ccMin = Util.Generate.controlchange(74, 0);
let ccBelowRange = Util.Generate.controlchange(74, 40);
let ccInRange = Util.Generate.controlchange(74, 60);
let ccAboveRange = Util.Generate.controlchange(74, 120);
let ccMax = Util.Generate.controlchange(74, 127);

//filter mode
describe('CCRangeNode - "filter" mode', () => {
    test('CC value below range is sent, CC value within range is NOT sent', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 40).toBe(true);
            done();
        });

        filter.receive(ccInRange, 'in');
        filter.receive(ccBelowRange, 'in');
    });
});

//pass mode
describe('CCRangeNode - "pass" mode', () => {
    test('CC value above range is NOT sent, CC value within range is sent', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 60).toBe(true);
            done();
        });

        pass.receive(ccBelowRange, 'in');
        pass.receive(ccAboveRange, 'in');
        pass.receive(ccInRange, 'in');
    });
})

//clamp mode
describe('CCRangeNode - "clamp" mode', () => {
    test('CC value below range is clamped to MIN value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 50).toBe(true);
            done();
        });

        clamp.receive(ccBelowRange, 'in');
    });

    test('CC value above range is clamped to MAX value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 100).toBe(true);
            done();
        });

        clamp.receive(ccAboveRange, 'in');
    });

    test('CC value within range is NOT clamped', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 60).toBe(true);
            done();
        });

        clamp.receive(ccInRange, 'in');
    });
});

//scale mode
describe('CCRangeNode - "scale" mode', () => {
    test('CC value is scaled to MIN value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 50).toBe(true);
            done();
        });

        scale.receive(ccMin, 'in');
    });

    test('CC value is scaled within the given range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] >= 50 && m.data[2] <= 100 && m.data[2] !== 60).toBe(true);
            done();
        });

        scale.receive(ccInRange, 'in');
    });

    test('CC value is scaled to MAX value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 100).toBe(true);
            done();
        });

        scale.receive(ccMax, 'in');
    });
})