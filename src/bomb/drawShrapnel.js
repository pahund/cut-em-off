import { lightBlue, darkBlue } from '../config';
import { degreesToRadians as deg2rad } from '../utils';

export default sprite => {
    const { context: ctx, x, y, rotation } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg2rad(rotation));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.fillStyle = darkBlue;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(10, 5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
