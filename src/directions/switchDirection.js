import { directionSwitchMap, directionIsAllowed } from './index.js';
import { isValidTile, getRandomInt } from '../utils/index.js';

export default (map, { x, y }, curr) => {
    const tile = map.tileAtLayer('main', { x, y });
    /* player accidentally stepped onto a broken conduit tile */
    if (!isValidTile(tile)) {
        throw new Error('dropped');
    }
    const nextDirection = directionSwitchMap[tile].change[curr] || curr;
    if (directionIsAllowed(map, { x, y }, nextDirection)) {
        return nextDirection;
    }
    const otherDirections = directionSwitchMap[tile].allowed.filter(dir => directionIsAllowed(map, { x, y }, dir));
    switch (otherDirections.length) {
        case 0:
            /* oh no, player locked themselves in! */
            throw new Error('locked in');
        case 1:
            return otherDirections[0];
        default:
            return otherDirections[getRandomInt(0, otherDirections.length - 1)];
    }
};
