import { lightRed, darkRed } from '../config';
import { getRandomInt as ri } from '../utils';

export default sprite => {
    const { context: ctx, x, y } = sprite;
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = lightRed;
    ctx.fillStyle = darkRed;
    ctx.beginPath();
    ctx.moveTo(ri(-5, 5), ri(-5, -25)); // 1
    ctx.lineTo(ri(5, 50), ri(-5, -50)); // 2
    ctx.lineTo(ri(5, 25), ri(-5, 5)); // 3
    ctx.lineTo(ri(5, 50), ri(5, 50)); // 4
    ctx.lineTo(ri(-5, 5), ri(5, 25)); // 5
    ctx.lineTo(ri(-5, -50), ri(5, 50)); // 6
    ctx.lineTo(ri(-5, -25), ri(-5, 5)); // 7
    ctx.lineTo(ri(-5, -50), ri(-5, -50)); // 8
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
};
