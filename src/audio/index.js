import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, GAME_OVER } from '../pubsub';
import sfxr from '../../vendor/sfxr';
const { SoundEffect, Params } = sfxr;

const sounds = {};

generate('jump');
generate('explosion');
generate('hitHurt');

function generate(fx) {
    const PARAMS = new Params();
    PARAMS[fx]();
    const audio = new Audio();
    const SOUND = new SoundEffect(PARAMS).generate();
    audio.src = SOUND.dataURI;
    sounds[fx] = audio;
}

export function initAudio() {
    console.log('init audio');
    pubsub.subscribe(DROP_BOMB, () => sounds.jump.play());
    pubsub.subscribe(BOMB_EXPLODES, () => sounds.explosion.play());
    pubsub.subscribe(INFECTED, () => sounds.mutate.play());
    pubsub.subscribe(GAME_OVER, () => sounds.hitHurt.play());
}
