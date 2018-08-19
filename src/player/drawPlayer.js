import { lightGreen, darkGreen } from '../config';
import { calculateRotation } from '../utils';

export default sprite => {
    const { context: ctx, x, y, direction } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(calculateRotation(direction));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightGreen;
    ctx.fillStyle = darkGreen;
    ctx.beginPath();
    ctx.moveTo(-15, 25);
    ctx.lineTo(0, -25);
    ctx.lineTo(15, 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
