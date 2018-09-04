/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';
import { degreesToRadians as deg2rad } from '../../utils';
import { krakel } from './utils';

export default ({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.rotate(deg2rad(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    if (broken) {
        krakel(ctx, [
            [0, -20, 50],
            [1, -20, 30],
            [1, -10, 40],
            [1, 0, 25],
            [1, 10, 35],
            [1, 20, 30],
            [1, 20, 50],
            [0, -20, -50],
            [1, -20, -40],
            [1, -10, -25],
            [1, 0, -35],
            [1, 10, -30],
            [1, 20, -40],
            [1, 20, -50]
        ]);
    } else {
        krakel(ctx, [[0, -20, -50], [1, -20, 50], [0, 20, -50], [1, 20, 50]]);
    }
    ctx.stroke();
    ctx.restore();
};
