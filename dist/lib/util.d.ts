import { MidiplexMessage } from "./midiplex-message";
declare const AllMessageTypes: NonEmptyArray<MidiMessageType>;
declare const ChannelMessageTypes: readonly ["noteoff", "noteon", "controlchange", "keyaftertouch", "programchange", "channelaftertouch", "pitchbend"];
declare const pickMessageTypes: (messageTypesToPick: MidiMessageType[]) => MidiMessageType[];
declare const omitMessageTypes: <T extends MidiMessageType>(messageTypesToOmit: MidiMessageType[]) => MidiMessageType[];
declare const convertRange: (oldVal: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => number;
declare const clamp: (num: number, min: number, max: number) => number;
declare const getProgramChangeMessage: (program: IntRange<0, 128>, channel?: IntRange<0, 17>) => MidiplexMessage;
declare const matchTrigger: (trigger: MidiplexTrigger, m: MidiplexMessage) => boolean;
declare const isChannelMessage: (data: Uint8Array) => boolean;
declare const Util: Readonly<{
    readonly Math: {
        readonly convertRange: (oldVal: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => number;
        readonly clamp: (num: number, min: number, max: number) => number;
    };
    readonly Data: {
        readonly isChannelMessage: (data: Uint8Array) => boolean;
        readonly setChannel: (data: Uint8Array, channel: number) => Uint8Array;
    };
    readonly Message: {
        /**
         * Create a new `MidiplexMessage`, optionally specifying a channel number. If the data given is not a channel
         * message this value will be ignored.
         *
         * @param data - A Uint8Array containing the message data
         * @param channel - An optional channel number between 1 and 16
         * @returns
         */
        readonly create: (data: Uint8Array, channel?: number) => MidiplexMessage;
        readonly matchTrigger: (trigger: MidiplexTrigger, m: MidiplexMessage) => boolean;
    };
    readonly Note: {
        readonly noteToMidi: (note: string) => number;
    };
    readonly Generate: {
        /**
         * Generates a `noteon` midiplex message.
         *
         * @param note - A note midi number or note string (e.g. 'C4')
         * @param velocity - A velocity value between 0 and 127
         * @param channel - An optional channel number between 1 and 16
         * @returns
         */
        readonly noteon: (note: number | NoteWithOctave, velocity: number, channel?: number) => MidiplexMessage;
        /**
         * Generates a `noteoff` midiplex message.
         *
         * @param note - A note midi number or note string (e.g. 'C4')
         * @param velocity - A velocity value between 0 and 127
         * @param channel - An optional channel number between 1 and 16
         * @returns
         */
        readonly noteoff: (note: number | NoteWithOctave, velocity: number, channel?: number) => MidiplexMessage;
        /**
         *
         * @param cc - The controller number
         * @param value - The controller value
         * @param channel - An optional channel number between 1 and 16
         * @returns
         */
        readonly controlchange: (cc: number, value: number, channel?: number) => MidiplexMessage;
        readonly keyaftertouch: (note: number | NoteWithOctave, pressure: number, channel?: number) => MidiplexMessage;
        readonly programchange: (program: number, channel?: number) => MidiplexMessage;
        readonly pitchbend: (value: number, channel?: number) => MidiplexMessage;
        readonly channelaftertouch: (pressure: number, channel?: number) => MidiplexMessage;
    };
}>;
export { AllMessageTypes, ChannelMessageTypes, Util, pickMessageTypes, omitMessageTypes, convertRange, getProgramChangeMessage, clamp, matchTrigger, isChannelMessage };
