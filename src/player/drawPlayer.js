import { lightGreen, darkGreen, lightRed, darkRed } from '../config';
import { calculateRotation } from '../utils';

export default sprite => {
    const { context: ctx, x, y, direction, infected, scale } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(calculateRotation(direction));
    ctx.lineWidth = 3;
    ctx.strokeStyle = infected ? lightRed : lightGreen;
    ctx.fillStyle = infected ? darkRed : darkGreen;
    ctx.beginPath();
    ctx.moveTo(-15, 25);
    ctx.lineTo(0, -25);
    ctx.lineTo(15, 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
