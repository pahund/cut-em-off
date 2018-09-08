import { lightRed } from '../config';
import { degreesToRadians as deg2rad } from '../utils';

export default sprite => {
    const { context: ctx, x, y, radius } = sprite;
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = 1;
    ctx.strokeStyle = lightRed;
    ctx.beginPath();
    ctx.arc(0, 0, radius, deg2rad(0), deg2rad(360));
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
};
