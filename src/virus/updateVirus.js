import { tileWidth, tileHeight, virusSpeed } from '../config';
import { N, E, S, W, switchDirection } from '../directions';
import { transformMapCoordinates } from '../utils';

export default sprite => {
    let { direction, mapY, mapX, x, y } = sprite;
    const { map } = sprite;
    switch (direction) {
        case N:
            mapY -= virusSpeed;
            break;
        case E:
            mapX += virusSpeed;
            break;
        case S:
            mapY += virusSpeed;
            break;
        case W:
            mapX -= virusSpeed;
            break;
        default:
    }
    if (mapX % tileWidth === 0 && mapY % tileHeight === 0) {
        const tile = map.tileAtLayer('main', { x, y });
        direction = switchDirection(tile, direction);
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
