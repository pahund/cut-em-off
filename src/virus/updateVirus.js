import { tileWidth, tileHeight, virusSpeed } from '../config';
import { N, E, S, W, switchDirection } from '../directions';
import { transformMapCoordinates } from '../utils';

export default sprite => {
    switch (sprite.direction) {
        case N:
            // eslint-disable-next-line no-param-reassign
            sprite.mapY -= virusSpeed;
            break;
        case E:
            // eslint-disable-next-line no-param-reassign
            sprite.mapX += virusSpeed;
            break;
        case S:
            // eslint-disable-next-line no-param-reassign
            sprite.mapY += virusSpeed;
            break;
        case W:
            // eslint-disable-next-line no-param-reassign
            sprite.mapX -= virusSpeed;
            break;
        default:
    }
    if (sprite.mapX % tileWidth === 0 && sprite.mapY % tileHeight === 0) {
        const tile = sprite.map.tileAtLayer('main', { x: sprite.x, y: sprite.y });
        // eslint-disable-next-line no-param-reassign
        sprite.direction = switchDirection(tile, sprite.direction);
    }
    const { x: newX, y: newY } = transformMapCoordinates(sprite.map, { x: sprite.mapX, y: sprite.mapY });
    // eslint-disable-next-line no-param-reassign
    sprite.x = newX;
    // eslint-disable-next-line no-param-reassign
    sprite.y = newY;
};
