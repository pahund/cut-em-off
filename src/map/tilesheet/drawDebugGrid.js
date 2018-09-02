/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight } from '../../config';

export default ({ ctx, row, col }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-49, -49);
    ctx.lineTo(50, -49);
    ctx.lineTo(50, 50);
    ctx.lineTo(-49, 50);
    ctx.lineTo(-49, -49);
    ctx.stroke();
    ctx.restore();
};
