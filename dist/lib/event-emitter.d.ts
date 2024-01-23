type Listener = (...args: any[]) => void;
declare class EventEmitter {
    private events;
    constructor();
    on(event: string, listener: Listener): void;
    emit(event: string, ...args: any[]): void;
    removeListener(event: string, listener: Listener): void;
}
export { EventEmitter, Listener };
