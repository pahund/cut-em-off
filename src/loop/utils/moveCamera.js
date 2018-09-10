import { playerSpeed } from '../../config.js';
import { N, E, S, W } from '../../directions/index.js';

export default (map, direction) => {
    switch (direction) {
        case N:
            // eslint-disable-next-line no-param-reassign
            map.sy -= playerSpeed;
            break;
        case E:
            // eslint-disable-next-line no-param-reassign
            map.sx += playerSpeed;
            break;
        case S:
            // eslint-disable-next-line no-param-reassign
            map.sy += playerSpeed;
            break;
        case W:
            // eslint-disable-next-line no-param-reassign
            map.sx -= playerSpeed;
            break;
        default:
    }
};
