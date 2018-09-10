export default class Sound {
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    init(waveType) {
        this.oscillator = this.audioContext.createOscillator();
        this.gain = this.audioContext.createGain();

        this.oscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
        this.oscillator.type = waveType;
    }

    play(freqValue, waveType, volume, startTime, endTime) {
        this.init(waveType);

        this.oscillator.frequency.value = freqValue;
        this.gain.gain.setValueAtTime(volume, this.audioContext.currentTime);

        this.oscillator.start(startTime);

        if (endTime !== undefined) {
            this.stop(endTime);
        }
    }

    stop(time) {
        this.gain.gain.exponentialRampToValueAtTime(0.001, time);
        this.oscillator.stop(time + 1);
    }
}
