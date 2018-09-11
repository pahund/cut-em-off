import jsfxr from '../../vendor/sfxr.js';
import generateSounds from './sounds.js';

export default function ArcadeAudio() {
    this.sounds = {};
    generateSounds(this);
}

ArcadeAudio.prototype.add = function(key, count, settings) {
    this.sounds[key] = [];
    settings.forEach(function(elem, index) {
        this.sounds[key].push({
            tick: 0,
            count,
            pool: []
        });
        for (let i = 0; i < count; i++) {
            const audio = new Audio();
            audio.src = jsfxr(elem);
            this.sounds[key][index].pool.push(audio);
        }
    }, this);
};

ArcadeAudio.prototype.play = function(key) {
    const sound = this.sounds[key];
    const soundData = sound.length > 1 ? sound[Math.floor(Math.random() * sound.length)] : sound[0];
    soundData.pool[soundData.tick].play();
    if (soundData.tick < soundData.count - 1) {
        soundData.tick++;
    } else {
        soundData.tick = 0;
    }
};
