import { directionIsAllowed, switchDirection } from '../directions';
import { DROP_BOMB, DROP_SHIP, GAME_OVER } from '../pubsub';
import { getKey, isInTheMiddle } from './utils';
import { calculateRowAndCol } from '../utils';

export default (sprite, pubsub, messageBox) => {
    let { nextDirection, direction, dropBomb, scale } = sprite;
    const { dropping } = sprite;
    if (dropping) {
        if (scale > 0) {
            scale -= 0.01;
        } else {
            messageBox.show('You fell into the abyss<br>Game over');
            pubsub.publish(GAME_OVER);
        }
        return { direction, nextDirection, dropBomb, scale };
    }
    const { map, x, y, gameOver } = sprite;
    if (!gameOver) {
        ({ nextDirection, dropBomb } = getKey(sprite));
    }
    if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection, dropBomb, scale };
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
    }
    return { direction, nextDirection, dropBomb, scale };
};
