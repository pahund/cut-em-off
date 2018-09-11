import { N, E, S, W } from '../../directions/index.js';

export default ({ map, direction, speed }) => {
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
