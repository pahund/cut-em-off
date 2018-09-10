import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, GAME_OVER, DROP_SHIP } from '../pubsub';
import ArcadeAudio from './ArcadeAudio';
import generateSounds from './sounds';

const aa = new ArcadeAudio();
generateSounds(aa);

export function initAudio() {
    pubsub.subscribe(DROP_BOMB, () => aa.play('drop-bomb'));
    pubsub.subscribe(BOMB_EXPLODES, () => aa.play('explode'));
    pubsub.subscribe(INFECTED, () => aa.play('infected'));
    pubsub.subscribe(DROP_SHIP, () => aa.play('drop-ship'));
    // pubsub.subscribe(GAME_OVER, () => sounds.hitHurt.play()); // game over is published more than once

    /*
   * GENERATE NEW SOUNDS ON http://www.superflashbros.net/as3sfxr/
   * CMD + C copies the values
   *
   * */
}
