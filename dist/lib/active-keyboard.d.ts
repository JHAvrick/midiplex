import { MidiplexMessage } from "./midiplex-message";
/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of the active notes.
 * Events are emitted when notes are added or removed.
 */
declare class KeyboardPoly {
    private notes;
    private events;
    on(event: string, listener: (...args: any[]) => void): void;
    message(m: MidiplexMessage): void;
    getActiveNotes(): IterableIterator<MidiplexMessage>;
    clear(): void;
}
/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of the active notes.
 * Notes are removed when consecutive `noteon` messages are received for the same note, thereby latching
 * notes until pressed again.
 */
declare class KeyboardPolyLatch {
    private notes;
    private events;
    private _maxLatch;
    constructor(maxLatch?: number);
    on(event: string, listener: (...args: any[]) => void): void;
    message(m: MidiplexMessage): void;
    getActiveNotes(): IterableIterator<MidiplexMessage>;
    setMaxLatch(maxLatch: number): void;
    clear(): void;
}
/**
 * This class accepts a stream of `noteon` and `noteoff` messages and keeps track of only a single
 * active note, sending a noteoff for the previous note when a new noteon is received.
 */
declare class KeyboardMono {
    private note;
    private events;
    on(event: string, listener: (...args: any[]) => void): void;
    message(m: MidiplexMessage): void;
    getActiveNotes(): MidiplexMessage[];
    clear(): void;
}
declare class KeyboardMonoLatch {
    private note;
    private events;
    on(event: string, listener: (...args: any[]) => void): void;
    message(m: MidiplexMessage): void;
    getActiveNotes(): MidiplexMessage[];
    clear(): void;
}
export { KeyboardPoly, KeyboardPolyLatch, KeyboardMono, KeyboardMonoLatch };
