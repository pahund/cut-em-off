import { directionIsAllowed, switchDirection } from '../directions/index.js';
import { pubsub, DROP_BOMB, DROP_SHIP, GAME_OVER } from '../pubsub/index.js';
import { getKey, isInTheMiddle } from './utils/index.js';
import { messageBox } from '../messageBox/index.js';
import { bombCooldown } from '../config.js';

export default sprite => {
    let { nextDirection, direction, dropBomb, scale, bombCoolingDown, teleportToServer } = sprite;
    const { dropping, map, gameInactive, x, y } = sprite;
    if (dropping) {
        if (scale > 0) {
            scale -= 0.01;
        } else {
            messageBox.show('You fell into the abyss<br>Game over');
            pubsub.publish(GAME_OVER);
        }
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown, teleportToServer };
    }
    if (!gameInactive) {
        ({ nextDirection, dropBomb, teleportToServer } = getKey(sprite));
        if (bombCoolingDown) {
            dropBomb = false;
        }
    }
    if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown, teleportToServer };
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
        pubsub.publish(DROP_BOMB, map.getRowAndCol({ x, y }));
        dropBomb = false;
        bombCoolingDown = true;
        setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            sprite.bombCoolingDown = false;
        }, bombCooldown);
    }
    return { direction, nextDirection, dropBomb, scale, bombCoolingDown, teleportToServer };
};
