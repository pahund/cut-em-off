/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';
import { degreesToRadians as deg2rad } from '../../utils';

export default ({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.rotate(deg2rad(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    if (broken) {
        ctx.moveTo(-20, 50);
        ctx.lineTo(-20, 30);
        ctx.lineTo(-10, 40);
        ctx.lineTo(0, 25);
        ctx.lineTo(10, 35);
        ctx.lineTo(20, 30);
        ctx.lineTo(20, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-20, -50);
        ctx.lineTo(-20, -40);
        ctx.lineTo(-10, -25);
        ctx.lineTo(0, -35);
        ctx.lineTo(10, -30);
        ctx.lineTo(20, -40);
        ctx.lineTo(20, -50);
    } else {
        ctx.moveTo(-20, -50);
        ctx.lineTo(-20, 50);
        ctx.moveTo(20, -50);
        ctx.lineTo(20, 50);
    }
    ctx.stroke();
    ctx.restore();
};
