/* eslint-disable no-param-reassign */
import { tileWidth, tileHeight, lightBlue } from '../../config';

export default ({ ctx, row, col }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    ctx.moveTo(30, -48);
    ctx.lineTo(48, -30);
    ctx.lineTo(48, 30);
    ctx.lineTo(30, 48);
    ctx.lineTo(-30, 48);
    ctx.lineTo(-48, 30);
    ctx.lineTo(-48, -30);
    ctx.lineTo(-30, -48);
    ctx.lineTo(30, -48);
    ctx.stroke();
    ctx.restore();
};
