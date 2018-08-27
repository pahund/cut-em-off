/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';

export default ({ ctx, row, col, broken }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    if (broken) {
        ctx.moveTo(-20, 50);
        ctx.lineTo(-20, 40);
        ctx.lineTo(-10, 30);
        ctx.lineTo(0, 40);
        ctx.lineTo(10, 20);
        ctx.lineTo(20, 30);
        ctx.lineTo(20, 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(30, 20);
        ctx.lineTo(40, 10);
        ctx.lineTo(30, -10);
        ctx.lineTo(40, -20);
        ctx.lineTo(50, -20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, -50);
        ctx.lineTo(20, -20);
        ctx.lineTo(10, -30);
        ctx.lineTo(0, -10);
        ctx.lineTo(-10, -30);
        ctx.lineTo(-20, -20);
        ctx.lineTo(-20, -50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-50, -20);
        ctx.lineTo(-30, -20);
        ctx.lineTo(-20, -10);
        ctx.lineTo(-40, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-20, 20);
        ctx.lineTo(-50, 20);
    } else {
        ctx.moveTo(-20, -50);
        ctx.lineTo(-20, -20);
        ctx.lineTo(-50, -20);
        ctx.moveTo(20, -50);
        ctx.lineTo(20, -20);
        ctx.lineTo(50, -20);
        ctx.moveTo(-50, 20);
        ctx.lineTo(-20, 20);
        ctx.lineTo(-20, 50);
        ctx.moveTo(50, 20);
        ctx.lineTo(20, 20);
        ctx.lineTo(20, 50);
    }
    ctx.stroke();
    ctx.restore();
};
