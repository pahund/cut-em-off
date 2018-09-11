import { directionSwitchMap, getNextTile } from './index.js';
import { isValidTile } from '../utils/index.js';

export default (map, { x, y }, direction) => {
    const tile = map.tileAtLayer('main', { x, y });
    if (!isValidTile(tile) || !directionSwitchMap[tile].allowed.includes(direction)) {
        return false;
    }
    const nextTile = getNextTile(map, { x, y }, direction);
    return isValidTile(nextTile);
};
