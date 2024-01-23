import { Message } from 'webmidi';
declare class MidiplexMessage {
    /**
     * Trace is used to track the path of a message through the network and
     * prevent infinite loops.
     */
    private trace;
    /**
     * The original WebMidi message.
     */
    private message;
    /**
     * Beat can be populated on creation if the data is available
     */
    private _beat?;
    constructor(message: Message | Uint8Array, opts?: {
        trace?: string[];
        beat?: number;
    });
    addTrace(nodeKey: string): void;
    hasTrace(nodeKey: string): boolean;
    /**
     * Set a new channel for this message. This creates a new WebMidi message internally.
     * If this message is not a channel message, this method does nothing and the "channel" value
     * will continue to return `undefined`
     *
     * @param channel  - a number between 1 and 16 inclusive
     */
    setChannel(channel: number): void;
    /**
     * Clone this message and optionally set a new channel.
     *
     * @param channel - A number between 1 and 16 inclusive
     * @returns
     */
    clone(channel?: number): MidiplexMessage;
    get isChannelMessage(): boolean;
    get channel(): number;
    get type(): MidiMessageType;
    get data(): number[];
    get beat(): number | undefined;
}
export { MidiplexMessage };
