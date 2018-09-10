import { pubsub, DROP_BOMB, BOMB_EXPLODES, INFECTED, GAME_OVER } from '../pubsub';
import ArcadeAudio from './ArcadeAudio';
import generateSounds from './sounds';

const aa = new ArcadeAudio();
generateSounds(aa);

export function initAudio() {
    pubsub.subscribe(DROP_BOMB, () => aa.play('powerup'));
    pubsub.subscribe(BOMB_EXPLODES, () => aa.play('damage'));
    pubsub.subscribe(INFECTED, () => aa.play('damage'));
    // pubsub.subscribe(GAME_OVER, () => sounds.hitHurt.play()); // game over is published more than once

    /*
   * GENERATE NEW SOUNDS ON http://www.superflashbros.net/as3sfxr/
   * CMD + C copies the values
   *
   * */
}
