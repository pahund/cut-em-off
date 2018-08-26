/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';
import { degreesToRadians as deg2rad } from '../../utils';

export default ({ ctx, row, col, deg }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.rotate(deg2rad(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    ctx.moveTo(-20, -50);
    ctx.lineTo(-20, -20);
    ctx.lineTo(-50, -20);
    ctx.moveTo(20, -50);
    ctx.lineTo(20, -20);
    ctx.lineTo(50, -20);
    ctx.moveTo(-50, 20);
    ctx.lineTo(50, 20);
    ctx.stroke();
    ctx.restore();
};
