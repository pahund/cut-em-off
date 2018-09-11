import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, DROP_SHIP } from '../pubsub/index.js';
import ArcadeAudio from './ArcadeAudio.js';

const aa = new ArcadeAudio();

export function initAudio() {
    pubsub.subscribe(DROP_BOMB, () => aa.play('drop-bomb'));
    pubsub.subscribe(DROP_BOMB, () => console.log('drop bomb'));
    pubsub.subscribe(BOMB_EXPLODES, () => aa.play('explode'));
    pubsub.subscribe(INFECTED, () => aa.play('infected'));
    pubsub.subscribe(DROP_SHIP, () => aa.play('drop-ship'));

    /*
   * GENERATE NEW SOUNDS ON http://www.superflashbros.net/as3sfxr/
   * CMD + C copies the values
   *
   * */
}
