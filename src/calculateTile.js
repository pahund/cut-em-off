import calculateGridCoordinates from './calculateGridCoordinates';
import calculateGridIndex from './calculateGridIndex';
import map from './map';

export default (sx, sy) => {
    const { x, y } = calculateGridCoordinates(sx, sy);
    const index = calculateGridIndex(x, y);
    return map[index];
};
