import { degreesToRadians } from './index.js';
import { N, E, S, W } from '../directions/index.js';

export default direction => {
    switch (direction) {
        case N:
            return degreesToRadians(0);
        case E:
            return degreesToRadians(90);
        case S:
            return degreesToRadians(180);
        case W:
            return degreesToRadians(270);
        default:
            return null;
    }
};
