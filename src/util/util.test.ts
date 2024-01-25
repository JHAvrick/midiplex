import { expect, test } from '@jest/globals';
import { Util } from './util';

describe('Util', () => {
    test('Util.Message.create()', (done) => {
        let m = Util.Message.create(new Uint8Array([0x90, 84, 64]), 5);
        expect(m.type).toBe('noteon'); 
        expect(m.channel).toBe(5); //Channel
        expect(m.data[1]).toBe(84); //Note number
        expect(m.data[2]).toBe(64); //Velocity
        done();
    });

    test('Util.Message.matchTrigger(): Match `note`on', (done) => {
        let m = Util.Message.create(new Uint8Array([0x90, 84, 64]), 5);
        let trigger : MidiplexTrigger = { type: 'noteon' };
        let matches = Util.Message.matchTrigger(trigger, m);
        expect(matches).toBe(true);
        done();
    });

    test('Util.Message.matchTrigger(): Match specific note with noteon', (done) => {
        let match = Util.Message.create(new Uint8Array([0x90, 84, 64]), 5);
        let fail = Util.Message.create(new Uint8Array([0x90, 85, 64]), 5);
        let trigger : MidiplexTrigger = { type: 'noteon', note: 84 };

        expect(Util.Message.matchTrigger(trigger, match)).toBe(true);
        expect(Util.Message.matchTrigger(trigger, fail)).toBe(false);
        done();
    });

    test('Util.Message.matchTrigger(): Fail to match noteon', (done) => {
        let m = Util.Message.create(new Uint8Array([0x90, 84, 64]), 5);
        let trigger : MidiplexTrigger = { type: 'controlchange' };
        let matches = Util.Message.matchTrigger(trigger, m);
        expect(matches).toBe(false);
        done();
    });

    test('Util.Message.matchTrigger(): Match controlchange with specific value', (done) => {
        let match = Util.Generate.controlchange(45, 44);
        let fail = Util.Generate.controlchange(45, 45);
        let trigger : MidiplexTrigger = { type: 'controlchange', value: 44 };
        let triggerCC : MidiplexTrigger = { type: 'controlchange', cc: 25, value: 44 };

        expect(Util.Message.matchTrigger(trigger, match)).toBe(true);
        expect(Util.Message.matchTrigger(trigger, fail)).toBe(false);
        expect(Util.Message.matchTrigger(triggerCC, match)).toBe(false);
        done();
    });

    test('Util.Note.equals()', (done) => {
        let n1 = Util.Generate.noteon('D5', 127, 12);
        let n2 = Util.Generate.noteon('D5', 45, 16);
        let equal = Util.Note.equals(n1, n2);
        expect(equal).toBe(true);
        done();
    });

    test('Util.Note.equals(): Different notes', (done) => {
        let n1 = Util.Generate.noteon('D5', 127, 12);
        let n2 = Util.Generate.noteon('C5', 127, 16);
        let equal = Util.Note.equals(n1, n2);
        expect(equal).toBe(false);
        done();
    });

    test('Util.Generate.noteon()', (done) => {
        let m = Util.Generate.noteon('D5', 127, 12);
        expect(m.type).toBe('noteon'); 
        expect(m.channel).toBe(12); 
        expect(m.data[1]).toBe(74); //Note number
        expect(m.data[2]).toBe(127); //Velocity
        done();
    });

    test('Util.Generate.noteoff()', (done) => {
        let m = Util.Generate.noteoff('C6', 127, 16);
        expect(m.type).toBe('noteoff');
        expect(m.channel).toBe(16);
        expect(m.data[1]).toBe(84); //Note number
        expect(m.data[2]).toBe(127); //Velocity
        done();
    });

    test('Util.Generate.controlchange()', (done) => {
        let m = Util.Generate.controlchange(43, 23, 14);
        expect(m.type).toBe('controlchange');
        expect(m.channel).toBe(14);
        expect(m.data[2]).toBe(23);
        done();
    });

    test('Util.Generate.keyaftertouch()', (done) => {
        let m = Util.Generate.keyaftertouch('A2', 23, 3);
        expect(m.type).toBe('keyaftertouch');
        expect(m.channel).toBe(3);
        expect(m.data[1]).toBe(45);
        expect(m.data[2]).toBe(23);
        done();
    });

    test('Util.Generate.programchange()', (done) => {
        let m = Util.Generate.programchange(23, 20);
        expect(m.type).toBe('programchange');
        expect(m.channel).toBe(16); //Channel out or range, expect to clamp to 16
        expect(m.data[1]).toBe(23);
        done();
    });

    test('Util.Generate.pitchbend()', (done) => {
        let m = Util.Generate.pitchbend(150, -15);
        expect(m.type).toBe('pitchbend');
        expect(m.channel).toBe(1); //Channel out or range, expect to clamp to 1
        expect(m.data[1]).toBe(150);
        done();
    });

    test('Util.Generate.channelaftertouch()', (done) => {
        let m = Util.Generate.channelaftertouch(23);
        expect(m.type).toBe('channelaftertouch');
        expect(m.channel).toBe(1);
        expect(m.data[1]).toBe(23);
        done();
    });
})