import { N, E, S, W } from '../../directions/index.js';

export default ({ mapX, mapY, direction, speed }) => {
    switch (direction) {
        case N:
            return { mapX, mapY: mapY - speed };
        case E:
            return { mapX: mapX + speed, mapY };
        case S:
            return { mapX, mapY: mapY + speed };
        case W:
            return { mapX: mapX - speed, mapY };
        default:
            return { mapX, mapY };
    }
};
