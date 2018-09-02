import { directionIsAllowed, switchDirection } from '../directions';
import { DROP_BOMB } from '../pubsub';
import { getKey, isInTheMiddle } from './utils';
import { calculateRowAndCol } from '../utils';

export default (sprite, pubsub) => {
    let { nextDirection, direction, dropBomb } = sprite;
    const { map, x, y, gameOver } = sprite;
    if (!gameOver) {
        ({ nextDirection, dropBomb } = getKey(sprite));
    }
    if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection, dropBomb };
    }
    if (nextDirection && directionIsAllowed(map, { x, y }, nextDirection)) {
        direction = nextDirection;
        nextDirection = null;
    } else {
        direction = switchDirection(map, { x, y }, direction);
    }
    if (dropBomb) {
        pubsub.publish(DROP_BOMB, calculateRowAndCol(map));
        dropBomb = false;
    }
    return { direction, nextDirection, dropBomb };
};
