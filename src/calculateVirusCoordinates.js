import { canvasHeight, canvasWidth } from './config';

export default (map, { row, col }) => {
    const { tileWidth, tileHeight, sx, sy } = map;
    const x = (col - 1) * tileWidth - sx + canvasWidth / 2 + tileWidth / 2;
    const y = (row - 1) * tileHeight - sy + canvasHeight / 2 + tileHeight / 2;
    return { x, y };
};
