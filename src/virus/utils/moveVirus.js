import { N, E, S, W } from '../../directions';
import { virusSpeed } from '../../config';

export default ({ mapX, mapY, direction }) => {
    switch (direction) {
        case N:
            return { mapX, mapY: mapY - virusSpeed };
        case E:
            return { mapX: mapX + virusSpeed, mapY };
        case S:
            return { mapX, mapY: mapY + virusSpeed };
        case W:
            return { mapX: mapX - virusSpeed, mapY };
        default:
            return { mapX, mapY };
    }
};
