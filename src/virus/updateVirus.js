import { switchDirection, isIntersection, directionSwitchMap, getOppositeDirection } from '../directions';
import { transformMapCoordinates, getRandomInt } from '../utils';
import { isInTheMiddle, moveVirus, getBestDirection } from './utils';
import { mapWidth, mapHeight, tileWidth, tileHeight } from '../config';

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
            const viable = allowed.filter(dir => dir !== getOppositeDirection(direction));
            const bestDirections = getBestDirection({ viable, visits, row, col });
            direction = bestDirections[getRandomInt(0, bestDirections.length - 1)];
        } else {
            direction = switchDirection(tile, direction);
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
