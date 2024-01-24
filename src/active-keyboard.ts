import { MidiplexMessage } from "./midiplex-message";
import { EventEmitter } from "./event-emitter";
import { Util } from "./util";

/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of the active notes.
 * Events are emitted when notes are added or removed.
 */
class KeyboardPoly {

    private notes: Map<number, MidiplexMessage> = new Map();
    private events: EventEmitter = new EventEmitter();

    on(event: string, listener: (...args: any[]) => void){
        this.events.on(event, listener);
    }

    message(m: MidiplexMessage){
        if (m.type === 'noteon'){
            if (!this.notes.has(m.data[1])){
                this.notes.set(m.data[1], m);
                this.events.emit('noteon', m);
            }
        } else if (m.type === 'noteoff'){
            if (this.notes.has(m.data[1])){
                this.notes.delete(m.data[1]);
                this.events.emit('noteoff', m);
            }
        }
    }

    getActiveNotes(){
        return this.notes.values();
    }

    clear(){
        this.notes.clear();
    }
}

/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of the active notes.
 * Notes are removed when consecutive `noteon` messages are received for the same note, thereby latching
 * notes until pressed again.
 */
class KeyboardPolyLatch {
    private notes: Map<number, MidiplexMessage> = new Map();
    private events: EventEmitter = new EventEmitter();
    private _maxLatch: number = Infinity;
    constructor(maxLatch: number = Infinity){
        this._maxLatch = maxLatch;
    }

    on(event: string, listener: (...args: any[]) => void){
        this.events.on(event, listener);
    }

    message(m: MidiplexMessage){
        if (m.type === 'noteon'){


            // If the note doesn't exist, add it
            if (!this.notes.has(m.data[1])){
                console.log('adding note', m.data[1])

                // Add the new note
                this.notes.set(m.data[1], m);
                this.events.emit('noteon', m);

                // Remove the oldest note if we've reached the max latch
                if (this.notes.size > this._maxLatch){
                    console.log('removing note, too many', this.notes.values().next().value.data[1]);
                    let note = this.notes.values().next().value;
                    this.notes.delete(note.data[1]);
                    this.events.emit('noteoff',  Util.Note.off(note));
                }

            } else {

                // Remove the note if it already exists
                console.log('removing note', m.data[1]);
                this.notes.delete(m.data[1]);
                this.events.emit('noteoff', Util.Note.off(m));
            }
        }
    }

    getActiveNotes(){
        return this.notes.values();
    }
 
    setMaxLatch(maxLatch: number){
        this._maxLatch = maxLatch;
        if (this.notes.size > this._maxLatch){
            //Disable as many notes as necessary to satisfy the max latch
            let notes = this.notes.values();
            for (let i = 0; i < this.notes.size - this._maxLatch; i++){
                let note = notes.next().value;
                this.notes.delete(note.data[1]);
                this.events.emit('noteoff', note);
            }
        }
    }

    clear(){
        this.notes.clear();
    }
}

/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of only a single
 * active note, sending a noteoff for the previous note when a new noteon is received.
 */
class KeyboardMono {
    private note: MidiplexMessage | null = null;
    private events: EventEmitter = new EventEmitter();

    on(event: string, listener: (...args: any[]) => void){
        this.events.on(event, listener);
    }

    message(m: MidiplexMessage){
        if (m.type === 'noteon'){
            if (this.note){
                this.events.emit('noteoff', this.note);
            }
            this.note = m;
            this.events.emit('noteon', m);
        } else if (m.type === 'noteoff'){
            if (this.note){
                this.events.emit('noteoff', this.note);
                this.note = null;
            }
        }
    }

    getActiveNotes(){
        if (this.note){
            return [this.note];
        }
        return [];
    }

    clear(){
        this.note = null;
    }
}

class KeyboardMonoLatch {
    private note: MidiplexMessage | null = null;
    private events: EventEmitter = new EventEmitter();

    on(event: string, listener: (...args: any[]) => void){
        this.events.on(event, listener);
    }

    message(m: MidiplexMessage){
        if (m.type === 'noteon'){
            if (this.note){
                this.events.emit('noteoff', this.note);

                // If the note is the same as the current note, clear it
                if (this.note.data[1] === m.data[1]){
                    this.note = null;
                    return;
                }
            }

            // Set the new note
            this.note = m;
            this.events.emit('noteon', m);

        }
    }

    getActiveNotes(){
        if (this.note){
            return [this.note];
        }
        return [];
    }

    clear(){
        this.note = null;
    }
}

export {
    KeyboardPoly,
    KeyboardPolyLatch,
    KeyboardMono,
    KeyboardMonoLatch
}