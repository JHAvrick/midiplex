type TimeSignature = [number, number];

class MidiClock {
    private timeSignature: TimeSignature;
    private ticksPerBeat: number;
    private tickCount: number;

    constructor(timeSignature: TimeSignature, ticksPerBeat: number = 24) {
        this.timeSignature = timeSignature;
        this.ticksPerBeat = ticksPerBeat;
        this.tickCount = 0;
    }

    tick(type: MidiClockMessageType = 'clock'): number {
        if (type === 'start' || type === 'stop') {
            this.tickCount = 0;
        } else if (type === 'clock') {
            this.tickCount++;
        }
        return this.getBeatDivision();
    }

    reset(): void {
        this.tickCount = 0;
    }

    setTimeSignature(timeSignature: TimeSignature): void {
        this.timeSignature = timeSignature;
    }

    private getBeatDivision(): number {
        // MIDI Clock sends 24 ticks per quarter note
        //const ticksPerBeat = 24;
        const beatsPerMeasure = this.timeSignature[0];
        const ticksPerMeasure = this.ticksPerBeat * beatsPerMeasure;

        if (this.tickCount % (ticksPerMeasure / 1) === 0) return 1;
        if (this.tickCount % (ticksPerMeasure / 2) === 0) return 2;
        if (this.tickCount % (ticksPerMeasure / 4) === 0) return 4;
        if (this.tickCount % (ticksPerMeasure / 8) === 0) return 8;
        if (this.tickCount % (ticksPerMeasure / 16) === 0) return 16;
        if (this.tickCount % (ticksPerMeasure / 32) === 0) return 32;
        //if (this.tickCount % (ticksPerMeasure / 64) === 0) return 64;

        return 0;
    }
}

export { MidiClock };