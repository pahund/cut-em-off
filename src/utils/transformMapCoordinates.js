import { canvasHeight, canvasWidth } from '../config';

/**
 * Transforms coordinates relative to the map (either row/col or x/y)
 * to coordinates on the canvas.
 *
 * @param map The map to calculate the coordinates from
 * @param row The row on the map (use either this or y)
 * @param col The column on the map (use either this x)
 * @param x The X coordinate on the map (use either this or col)
 * @param y The Y coordinate on the map (use either this or row)
 * @return {{x: number, y: number}}
 */
export default (map, { row, col, x, y }) => {
    const { tileWidth, tileHeight, sx, sy } = map;
    const calcX = x || (col - 1) * tileWidth;
    const calcY = y || (row - 1) * tileHeight;
    const nextX = calcX - sx + canvasWidth / 2 + tileWidth / 2;
    const nextY = calcY - sy + canvasHeight / 2 + tileHeight / 2;
    return { x: nextX, y: nextY };
};
