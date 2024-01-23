type Listener = (...args: any[]) => void;

class EventEmitter {
    private events: { [key: string]: Listener[] };

    constructor() {
        this.events = {};
    }

    on(event: string, listener: Listener): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event: string, ...args: any[]): void {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach(listener => listener(...args));
    }

    removeListener(event: string, listener: Listener): void {
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
}

export { EventEmitter, Listener };