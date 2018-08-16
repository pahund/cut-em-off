import { speed } from './config';
import { N, E, S, W } from './directions';

export default (map, direction) => {
    switch (direction) {
        case N:
            // eslint-disable-next-line no-param-reassign
            map.sy -= speed;
            break;
        case E:
            // eslint-disable-next-line no-param-reassign
            map.sx += speed;
            break;
        case S:
            // eslint-disable-next-line no-param-reassign
            map.sy += speed;
            break;
        case W:
            // eslint-disable-next-line no-param-reassign
            map.sx -= speed;
            break;
        default:
    }
};
