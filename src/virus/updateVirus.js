import {
    switchDirection,
    isIntersection,
    directionSwitchMap,
    getOppositeDirection,
    directionIsAllowed
} from '../directions/index.js';
import { getRandomInt } from '../utils/index.js';
import { isInTheMiddle, moveVirus, getBestDirection } from './utils/index.js';

export default sprite => {
    let { direction } = sprite;
    const { map, visits } = sprite;
    const { mapX, mapY } = moveVirus(sprite);
    const { x, y } = map.getXAndY({ mapX, mapY });
    if (isInTheMiddle({ mapX, mapY })) {
        const tile = map.tileAtLayer('main', { x, y });
        const { col, row } = map.getRowAndCol({ x, y });
        visits[row][col]++;
        if (isIntersection(tile)) {
            const { allowed } = directionSwitchMap[tile];
            const viable = allowed.filter(
                dir => dir !== getOppositeDirection(direction) && directionIsAllowed(map, { x, y }, dir)
            );
            const bestDirections = getBestDirection({ viable, visits, row, col });
            direction = bestDirections[getRandomInt(0, bestDirections.length - 1)];
        } else {
            try {
                direction = switchDirection(map, { x, y }, direction);
            } catch ({ message }) {
                throw new Error(message);
            }
        }
    }
    return {
        direction,
        mapY,
        mapX,
        x,
        y
    };
};
