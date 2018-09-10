import { N, E, S, W } from './index.js';

export default direction => {
    switch (direction) {
        case N:
            return S;
        case E:
            return W;
        case S:
            return N;
        case W:
            return W;
        default:
            return null;
    }
};
