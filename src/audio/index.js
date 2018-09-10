import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, GAME_OVER } from '../pubsub';
import sfxr from '../../vendor/sfxr';
const { SoundEffect, Params } = sfxr;

const sounds = {};
window.AudioContext = window.AudioContext || window.webkitAudioContext;

generate('jump');
generate('explosion');
generate('hitHurt');

function generate(fx) {
    const PARAMS = new Params();
    PARAMS[fx]();
    const SOUND = new SoundEffect(PARAMS).generate();
    sounds[fx] = toAudioElement(SOUND);
}

function toAudioElement(wave) {
    const audio = new Audio();
    audio.src = wave.dataURI;

    return audio;
}

export function initAudio() {
    pubsub.subscribe(DROP_BOMB, () => sounds.jump.play());
    pubsub.subscribe(BOMB_EXPLODES, () => sounds.explosion.play());
    pubsub.subscribe(INFECTED, () => sounds.hitHurt.play());
    // pubsub.subscribe(GAME_OVER, () => sounds.hitHurt.play()); // game over is published more than once

    /*
  * try to reduce space
  * add some music
  *
  * */
}
