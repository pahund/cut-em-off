/* eslint-disable no-param-reassign */
import { degreesToRadians as deg2rad } from '../../utils';
import { tileHeight, tileWidth, lightBlue } from '../../config';

export default ctx => {
    ctx.save();
    ctx.translate(tileWidth, tileHeight);
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.arc(0, 0, 30, deg2rad(0), deg2rad(360));
    ctx.moveTo(70, 0);
    ctx.arc(0, 0, 70, deg2rad(0), deg2rad(360));
    ctx.stroke();
    ctx.restore();
};
