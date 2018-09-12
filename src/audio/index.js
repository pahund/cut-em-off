import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, DROP_SHIP } from '../pubsub/index.js';
import ArcadeAudio from './ArcadeAudio.js';

const aa = new ArcadeAudio();

export function initAudio() {
    /* permanent subscribing OK here */
    pubsub.subscribe(DROP_BOMB, () => aa.play('drop-bomb'), true);
    pubsub.subscribe(BOMB_EXPLODES, () => aa.play('explode'), true);
    pubsub.subscribe(INFECTED, () => aa.play('infected'), true);
    pubsub.subscribe(DROP_SHIP, () => aa.play('drop-ship'), true);

    /*
   * GENERATE NEW SOUNDS ON http://www.superflashbros.net/as3sfxr/
   * CMD + C copies the values
   *
   * */
}
