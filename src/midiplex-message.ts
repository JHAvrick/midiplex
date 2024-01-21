import { Message, Utilities } from 'webmidi';
import { clamp } from './util';

class MidiplexMessage {
    /**
     * Trace is used to track the path of a message through the network and 
     * prevent infinite loops.
     */
    private trace: string[];

    /**
     * The original WebMidi message.
     */
    private message: Message;
    
    constructor(message: Message | Uint8Array, trace: string[] = []){
        this.message = message instanceof Message ? message : new Message(message);
        this.trace = trace;
    }

    addTrace(nodeKey: string){
        this.trace.push(nodeKey);
    }

    hasTrace(nodeKey: string){
        return this.trace.includes(nodeKey);
    }

    /**
     * Set a new channel for this message. This creates a new WebMidi message internally.
     * If this message is not a channel message, this method does nothing and the "channel" value
     * will continue to return `undefined`
     * 
     * @param channel  - a number between 1 and 16 inclusive
     */
    setChannel(channel: number){
        channel = clamp(channel, 1, 16);
        if (this.message.isChannelMessage){
            const MESSAGE_TYPE = this.message.data[0] & 0xF0;
            this.message = new Message(
                new Uint8Array([
                    MESSAGE_TYPE + channel - 1, 
                    this.message.data[1],
                    this.message.data[2]
                ])
            )
        }
    }

    /**
     * Clone this message and optionally set a new channel.
     * 
     * @param channel - A number between 1 and 16 inclusive
     * @returns 
     */
    clone(channel?: number){
        let m = new MidiplexMessage(new Uint8Array([...this.message.data]), this.trace);
        if (channel) m.setChannel(channel);
        return m;
    }

    get isChannelMessage(){
        return this.message.isChannelMessage;
    }

    get channel(){
        return this.message.channel;
    }

    get type(){
        return <MidiMessageType> this.message.type;
    }

    get data(){
        return this.message.data;
    }
}

export { MidiplexMessage };