import { MidiplexMessage } from "./midiplex-message";

const AllMessageTypes : NonEmptyArray<MidiMessageType> = [
      // MIDI channel message events
      "noteoff",
      "noteon",
      "controlchange",
      "keyaftertouch",
      "programchange",
      "channelaftertouch",
      "pitchbend",

      // MIDI channel mode events
      "allnotesoff",
      "allsoundoff",
      "localcontrol",
      "monomode",
      "omnimode",
      "resetallcontrollers",

      // RPN/NRPN events
      "nrpn",
      "nrpn-dataentrycoarse",
      "nrpn-dataentryfine",
      "nrpn-dataincrement",
      "nrpn-datadecrement",
      "rpn",
      "rpn-dataentrycoarse",
      "rpn-dataentryfine",
      "rpn-dataincrement",
      "rpn-datadecrement"
]

const ChannelMessageTypes = <const> [
    "noteoff",
    "noteon",
    "controlchange",
    "keyaftertouch",
    "programchange",
    "channelaftertouch",
    "pitchbend"
];

const pickMessageTypes = (messageTypesToPick: MidiMessageType[]) : MidiMessageType[] => {
    return AllMessageTypes.filter((type) => messageTypesToPick.includes(type));
}

const omitMessageTypes = <T extends MidiMessageType>(messageTypesToOmit: MidiMessageType[]): MidiMessageType[] => {
    return AllMessageTypes.filter((type: MidiMessageType) => !messageTypesToOmit.includes(type));
}

const convertRange = (oldVal: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => {
    return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

const clamp = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max);
}

const getProgramChangeMessage = (program: IntRange<0, 128>, channel: IntRange<0, 17> = 0) => {
    return new MidiplexMessage(new Uint8Array([0xC0 + channel, program]));
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteToMidi = (note: string): number => {    
    const octave = parseInt(note.slice(-1));
    const key = note.slice(0, -1);
    const semitone = notes.indexOf(key);
    if (semitone === -1 || octave < -1 || octave > 9) {
        throw new Error('Invalid note format');
    }
    return octave * 12 + semitone + 12; // +12 to adjust for MIDI's note number system (C0 is note number 12)
}

const matchTrigger = (trigger: MidiplexTrigger, m: MidiplexMessage) => {
    if ('test' in trigger) return trigger.test(m);
    switch (true) {
        case trigger.type === 'noteon' && m.type === 'noteon':
            return 'note' in trigger ? trigger.note === m.data[1] : true;
        case trigger.type === 'noteoff' && m.type === 'noteoff':
            return 'note' in trigger ? trigger.note === m.data[1] : true;
        case trigger.type === 'controlchange' && m.type === 'controlchange':
            if ('cc' in trigger && 'value' in trigger) {
                return trigger.cc === m.data[1] && trigger.value === m.data[2];
            } else if ('cc' in trigger) {
                return trigger.cc === m.data[1];
            } else if ('value' in trigger) {
                return trigger.value === m.data[2];
            } else {
                return true;
            }
        default: return false;
    }   
}

const isChannelMessage = (data: Uint8Array) => {
    return (data[0] & 0xF0) >= 0x80 && (data[0] & 0xF0) <= 0xEF
}

const setChannel = (data: Uint8Array, channel: number) => {
    if (isChannelMessage(data)){
        channel = clamp(channel, 1, 16);
        let statusByte = data[0] & 0xF0;
        data[0] = statusByte + channel - 1;
    }
    return data;
}

const Util = Object.freeze(<const> {
    Math: {
        convertRange,
        clamp
    },
    Data: {
        isChannelMessage,
        setChannel
    },
    Message: {
        /**
         * Create a new `MidiplexMessage`, optionally specifying a channel number. If the data given is not a channel
         * message this value will be ignored.
         * 
         * @param data - A Uint8Array containing the message data
         * @param channel - An optional channel number between 1 and 16
         * @returns 
         */
        create: (data: Uint8Array, channel?: number) => {
            if (channel){
                setChannel(data, channel);
            }
            return new MidiplexMessage(data);
        },
        matchTrigger
    },
    Note: {
        noteToMidi,
        /**
         * Given a `noteon` or `noteoff` message, returns true if the two messages are the same type
         * and the same note. This method ignores channel and velocity values.
         * 
         * @param note1 - A `MidiplexMessage` with a `noteon` or `noteoff` type
         * @param note2 - A `MidiplexMessage` with a `noteon` or `noteoff` type
         * @returns 
         */
        equals: (note1: MidiplexMessage, note2: MidiplexMessage) => {
            return note1.type === note2.type && note1.data[1] === note2.data[1];
        },
        /**
         * Generates a `noteoff` message for the given `noteon` message.
         * 
         * @param offNote 
         * @param velocity 
         * @returns 
         */
        on: (offNote: MidiplexMessage, velocity: number) => {
            return new MidiplexMessage(new Uint8Array([0x90, offNote.data[1], offNote.data[2]]));
        },
        /**
         * Generates a `noteoff` message for the given `noteon` message.
         * 
         * @param onNote 
         * @returns 
         */
        off: (onNote: MidiplexMessage) => {
            return new MidiplexMessage(new Uint8Array([0x80, onNote.data[1], onNote.data[2]]));
        }
    },
    Generate: {
        /**
         * Generates a `noteon` midiplex message.
         * 
         * @param note - A note midi number or note string (e.g. 'C4')
         * @param velocity - A velocity value between 0 and 127
         * @param channel - An optional channel number between 1 and 16
         * @returns 
         */
        noteon: (note: number | NoteWithOctave, velocity: number, channel?: number) => {
            if (typeof note === 'string') {
                note = noteToMidi(note);
            }

            return Util.Message.create(new Uint8Array([0x90, note, velocity]), channel);
        },
        /**
         * Generates a `noteoff` midiplex message.
         * 
         * @param note - A note midi number or note string (e.g. 'C4')
         * @param velocity - A velocity value between 0 and 127
         * @param channel - An optional channel number between 1 and 16
         * @returns 
         */
        noteoff: (note: number | NoteWithOctave, velocity: number, channel?: number) => {
            if (typeof note === 'string') {
                note = noteToMidi(note);
            }
            return Util.Message.create(new Uint8Array([0x80, note, velocity]), channel);
        },
        /**
         * 
         * @param cc - The controller number
         * @param value - The controller value
         * @param channel - An optional channel number between 1 and 16
         * @returns 
         */
        controlchange: (cc: number, value: number, channel?: number) => {
            return Util.Message.create(new Uint8Array([0xB0, cc, value]), channel);
        },
        keyaftertouch: (note: number | NoteWithOctave, pressure: number, channel?: number) => {
            if (typeof note === 'string') {
                note = noteToMidi(note);
            }
            return Util.Message.create(new Uint8Array([0xA0, note, pressure]), channel);
        },
        programchange: (program: number, channel?: number) => {
            return Util.Message.create(new Uint8Array([0xC0, program]), channel);
        },
        pitchbend: (value: number, channel?: number) => {
            return Util.Message.create(new Uint8Array([0xE0, value]), channel);
        },
        channelaftertouch: (pressure: number, channel?: number) => {
            return Util.Message.create(new Uint8Array([0xD0, pressure]), channel);
        }
    }

});

export {
    AllMessageTypes,
    ChannelMessageTypes,
    Util,
    pickMessageTypes,
    omitMessageTypes,
    convertRange,
    getProgramChangeMessage,
    clamp,
    matchTrigger,
    isChannelMessage
}