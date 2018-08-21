import { directionIsAllowed, switchDirection } from '../directions';
import { getNewDirectionFromKeyboard, isInTheMiddle } from './utils';

export default sprite => {
    let { nextDirection, direction } = sprite;
    const { map, x, y, infected } = sprite;
    if (!infected) {
        nextDirection = getNewDirectionFromKeyboard() || nextDirection;
    }
    if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection };
    }
    const tile = map.tileAtLayer('main', { x, y });
    if (nextDirection && directionIsAllowed(tile, nextDirection)) {
        direction = nextDirection;
        nextDirection = null;
    } else {
        direction = switchDirection(tile, direction);
    }
    return { direction, nextDirection };
};
