import { pubsub, DROP_BOMB } from '../pubsub';
import { SoundEffect } from '../../vendor/sfxr';

export function initAudio() {
    console.log('init audio');
    pubsub.subscribe(DROP_BOMB, () => console.log('play sound: DROP_BOMB'));
}
