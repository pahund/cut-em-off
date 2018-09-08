import { directionIsAllowed, switchDirection } from '../directions';
import { pubsub, DROP_BOMB, DROP_SHIP, GAME_OVER } from '../pubsub';
import { getKey, isInTheMiddle } from './utils';
import { calculateRowAndCol } from '../utils';
import { messageBox } from '../messageBox';
import { bombCooldown } from '../config';

export default sprite => {
    let { nextDirection, direction, dropBomb, scale, bombCoolingDown } = sprite;
    const { dropping } = sprite;
    if (dropping) {
        if (scale > 0) {
            scale -= 0.01;
        } else {
            messageBox.show('You fell into the abyss<br>Game over');
            pubsub.publish(GAME_OVER);
        }
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
    }
    const { map, x, y, gameOver } = sprite;
    if (!gameOver) {
        ({ nextDirection, dropBomb } = getKey(sprite));
        if (bombCoolingDown) {
            dropBomb = false;
        }
    }
    if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
    }
    if (nextDirection && directionIsAllowed(map, { x, y }, nextDirection)) {
        direction = nextDirection;
        nextDirection = null;
    } else {
        try {
            direction = switchDirection(map, { x, y }, direction);
        } catch ({ message }) {
            if (message === 'dropped') {
                pubsub.publish(DROP_SHIP);
            }
        }
    }
    if (dropBomb) {
        pubsub.publish(DROP_BOMB, calculateRowAndCol(map));
        dropBomb = false;
        bombCoolingDown = true;
        setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            sprite.bombCoolingDown = false;
        }, bombCooldown);
    }
    return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
};
