import { expect, test } from '@jest/globals';
import { NoteVelocityRangeNode } from './note-velocity-range-node';
import { DebugNode } from '../general/debug-node';
import { MidiplexMessage } from '../../midiplex-message';
import { Util } from '../../util/util';

let debug = new DebugNode('debug');
let filter = new NoteVelocityRangeNode('filter', { 
    mode: 'filter',
    range: {
        min: 50, 
        max: 100
    }
});

let pass = new NoteVelocityRangeNode('pass', { 
    mode: 'pass',
    range: {
        min: 50, 
        max: 100
    }
});

let clamp = new NoteVelocityRangeNode('clamp', { 
    mode: 'clamp',
    range: {
        min: 50, 
        max: 100
    }
});

let scale = new NoteVelocityRangeNode('scale', { 
    mode: 'scale',
    range: {
        min: 50, 
        max: 100
    }
});


filter.connect('out', debug.getInputEdge('in'));
pass.connect('out', debug.getInputEdge('in'));
clamp.connect('out', debug.getInputEdge('in'));
scale.connect('out', debug.getInputEdge('in'));

//Each filter mode should handle these somewhat differently
let min = Util.Generate.noteon(74, 0);
let belowRange = Util.Generate.noteon(74, 40);
let inRange = Util.Generate.noteon(74, 60);
let aboveRange = Util.Generate.noteon(74, 120);
let max = Util.Generate.noteon(74, 127);

//filter mode
describe('NoteVelocityRangeNode - "filter" mode', () => {
    test('Velocity value below range is sent, Velocity value within range is NOT sent', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 40).toBe(true);
            done();
        });

        filter.receive(inRange, 'in');
        filter.receive(belowRange, 'in');
    });
});

//pass mode
describe('NoteVelocityRangeNode - "pass" mode', () => {
    test('Velocity value above range is NOT sent, Velocity value within range is sent', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 60).toBe(true);
            done();
        });

        pass.receive(belowRange, 'in');
        pass.receive(aboveRange, 'in');
        pass.receive(inRange, 'in');
    });
})

//clamp mode
describe('NoteVelocityRangeNode - "clamp" mode', () => {
    test('Velocity value below range is clamped to MIN value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 50).toBe(true);
            done();
        });

        clamp.receive(belowRange, 'in');
    });

    test('Velocity value above range is clamped to MAX value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 100).toBe(true);
            done();
        });

        clamp.receive(aboveRange, 'in');
    });

    test('Velocity value within range is NOT clamped', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 60).toBe(true);
            done();
        });

        clamp.receive(inRange, 'in');
    });
});



//scale mode
describe('NoteVelocityRangeNode - "scale" mode', () => {
    test('Velocity value is scaled to MIN value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 50).toBe(true);
            done();
        });

        scale.receive(min, 'in');
    });

    test('Velocity value is scaled within the given range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] >= 50 && m.data[2] <= 100 && m.data[2] !== 60).toBe(true);
            done();
        });

        scale.receive(inRange, 'in');
    });

    test('Velocity value is scaled to MAX value specified by range', (done) => {
        debug.setProp('callback', (m: MidiplexMessage) => {
            expect(m.data[2] === 100).toBe(true);
            done();
        });

        scale.receive(max, 'in');
    });
});