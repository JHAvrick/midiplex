type TimeSignature = [number, number];
declare class MidiClock {
    private timeSignature;
    private ticksPerBeat;
    private tickCount;
    constructor(timeSignature: TimeSignature, ticksPerBeat?: number);
    tick(type?: MidiClockMessageType): number;
    reset(): void;
    setTimeSignature(timeSignature: TimeSignature): void;
    private getBeatDivision;
}
export { MidiClock };
