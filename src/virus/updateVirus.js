import { switchDirection, isIntersection, directionSwitchMap, getOppositeDirection } from '../directions';
import { transformMapCoordinates, getRandomInt } from '../utils';
import { isInTheMiddle, moveVirus } from './utils';

export default sprite => {
    let { direction, x, y } = sprite;
    const { map } = sprite;
    const { mapX, mapY } = moveVirus(sprite);
    if (isInTheMiddle({ mapX, mapY })) {
        const tile = map.tileAtLayer('main', { x, y });
        if (isIntersection(tile)) {
            const { allowed } = directionSwitchMap[tile];
            const viable = allowed.filter(dir => dir !== getOppositeDirection(direction));
            direction = viable[getRandomInt(0, viable.length - 1)];
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
