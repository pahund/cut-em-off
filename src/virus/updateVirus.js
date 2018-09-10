import {
    switchDirection,
    isIntersection,
    directionSwitchMap,
    getOppositeDirection,
    directionIsAllowed
} from '../directions/index.js';
import { transformMapCoordinates, getRandomInt } from '../utils/index.js';
import { isInTheMiddle, moveVirus, getBestDirection } from './utils/index.js';
import { mapWidth, mapHeight, tileWidth, tileHeight } from '../config.js';

const visits = Array(mapHeight)
    .fill()
    .map(() => Array(mapWidth).fill(0));

export default sprite => {
    let { direction, x, y } = sprite;
    const { map } = sprite;
    const { mapX, mapY } = moveVirus(sprite);
    if (isInTheMiddle({ mapX, mapY })) {
        const tile = map.tileAtLayer('main', { x, y });
        const col = mapX / tileWidth + 1;
        const row = mapY / tileHeight + 1;
        visits[row - 1][col - 1] = visits[row - 1][col - 1] + 1;
        if (isIntersection(tile)) {
            const { allowed } = directionSwitchMap[tile];
            const viable = allowed.filter(
                dir => dir !== getOppositeDirection(direction) && directionIsAllowed(map, { x, y }, dir)
            );
            const bestDirections = getBestDirection({ viable, visits, row, col });
            direction = bestDirections[getRandomInt(0, bestDirections.length - 1)];
        } else {
            direction = switchDirection(map, { x, y }, direction);
        }
    }
    ({ x, y } = transformMapCoordinates(map, { x: mapX, y: mapY }));
    return {
        direction,
        mapY,
        mapX,
        x,
        y
    };
};
