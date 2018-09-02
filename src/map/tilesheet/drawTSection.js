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
        ctx.moveTo(50, 20);
        ctx.lineTo(40, 20);
        ctx.lineTo(45, 10);
        ctx.lineTo(40, -10);
        ctx.lineTo(45, -20);
        ctx.lineTo(50, -20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, -50);
        ctx.lineTo(20, -35);
        ctx.lineTo(10, -40);
        ctx.lineTo(0, -30);
        ctx.lineTo(-10, -40);
        ctx.lineTo(-20, -35);
        ctx.lineTo(-20, -50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-50, -20);
        ctx.lineTo(-40, -20);
        ctx.lineTo(-35, -10);
        ctx.lineTo(-45, 0);
        ctx.lineTo(-30, 10);
        ctx.lineTo(-35, 20);
        ctx.lineTo(-50, 20);
    } else {
        ctx.moveTo(-20, -50);
        ctx.lineTo(-20, -20);
        ctx.lineTo(-50, -20);
        ctx.moveTo(20, -50);
        ctx.lineTo(20, -20);
        ctx.lineTo(50, -20);
        ctx.moveTo(-50, 20);
        ctx.lineTo(50, 20);
    }
    ctx.stroke();
    ctx.restore();
};
