/* eslint-disable no-param-reassign */
import { darkBlue, lightBlue, darkRed, lightRed } from '../config.js';
import { krakel } from '../map/tilesheet/utils/index.js';

export default sprite => {
    const { context: ctx, x, y, broken, infected } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = infected ? lightRed : lightBlue;
    ctx.fillStyle = infected ? darkRed : darkBlue;
    ctx.beginPath();
    krakel(ctx, [
        [0, 30, -48],
        [1, 48, -30],
        [1, 48, 30],
        [1, 30, 48],
        [1, -30, 48],
        [1, -48, 30],
        [1, -48, -30],
        [1, -30, -48],
        [1, 30, -48]
    ]);
    ctx.fill();
    ctx.stroke();
    if (broken) {
        ctx.lineWidth = 2;
        krakel(ctx, [
            [0, 10, -48],
            [1, 0, -40],
            [0, 24, -48],
            [1, 20, -30],
            [0, 48, -27],
            [1, 20, -20],
            [0, -10, -30],
            [1, 10, -30],
            [1, 30, -10],
            [1, 20, 0],
            [1, 10, 0],
            [0, 48, 7],
            [1, 30, 10],
            [0, 20, 0],
            [1, 30, 10],
            [1, 10, 20],
            [0, 30, 48],
            [1, 30, 30],
            [1, 10, 30],
            [0, 20, 20],
            [1, 20, 30],
            [0, -10, 48],
            [1, -10, 20],
            [1, 0, 10],
            [0, -20, 0],
            [1, -20, 20],
            [1, -10, 30],
            [0, -30, 48],
            [1, -20, 40],
            [1, -20, 30],
            [0, -30, 30],
            [1, -20, 40],
            [0, -48, 20],
            [1, -30, 20],
            [0, -40, 20],
            [1, -40, 10],
            [0, -48, 0],
            [1, -30, 0],
            [1, -20, -10],
            [0, -40, 0],
            [1, -30, 10],
            [0, -48, -17],
            [1, -40, -30],
            [1, -30, -20],
            [0, -30, -48],
            [1, -10, -20],
            [1, -10, -10],
            [0, -20, -30],
            [1, -20, -20],
            [1, -30, -10]
        ]);
        ctx.stroke();
    }
    ctx.restore();
};
