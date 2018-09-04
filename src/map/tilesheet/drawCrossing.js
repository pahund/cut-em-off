/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';
import { krakel } from './utils';

export default ({ ctx, row, col, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    if (broken) {
        krakel(ctx, [
            [0, -20, 50],
            [1, -20, 45],
            [1, -10, 40],
            [1, 0, 45],
            [1, 10, 35],
            [1, 20, 40],
            [1, 20, 50],
            [0, 50, 20],
            [1, 40, 20],
            [1, 45, 10],
            [1, 40, -10],
            [1, 45, -20],
            [1, 50, -20],
            [0, 20, -50],
            [1, 20, -35],
            [1, 10, -40],
            [1, 0, -30],
            [1, -10, -40],
            [1, -20, -35],
            [1, -20, -50],
            [0, -50, -20],
            [1, -40, -20],
            [1, -35, -10],
            [1, -45, 0],
            [1, -30, 10],
            [1, -35, 20],
            [1, -50, 20]
        ]);
    } else {
        krakel(ctx, [
            [0, -20, -50],
            [1, -20, -20],
            [1, -50, -20],
            [0, 20, -50],
            [1, 20, -20],
            [1, 50, -20],
            [0, -50, 20],
            [1, -20, 20],
            [1, -20, 50],
            [0, 50, 20],
            [1, 20, 20],
            [1, 20, 50]
        ]);
    }
    ctx.stroke();
    ctx.restore();
};
