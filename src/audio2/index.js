import Sound from './Sound';

export default function play() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const note = new Sound(audioContext);
    const now = audioContext.currentTime;

    note.play(100, 'sawtooth', 0.5, now, now + 1);
    note.play(1056, 'square', 0.5, now, now + 1);
}
