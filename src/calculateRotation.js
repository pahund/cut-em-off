import degreesToRadians from './degreesToRadians';
import directions from './directions';

export default direction => {
    switch (direction) {
        case directions.N:
            return degreesToRadians(0);
        case directions.E:
            return degreesToRadians(90);
        case directions.S:
            return degreesToRadians(180);
        case directions.W:
            return degreesToRadians(270);
        default:
            return null;
    }
};
