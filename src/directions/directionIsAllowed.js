import { directionSwitchMap, getNextTile, isValidTile } from '.';

export default (map, { x, y }, direction) => {
    const tile = map.tileAtLayer('main', { x, y });
    if (!directionSwitchMap[tile].allowed.includes(direction)) {
        return false;
    }
    const nextTile = getNextTile(map, { x, y }, direction);
    return isValidTile(nextTile);
};
