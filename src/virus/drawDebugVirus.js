import { lightRed, darkRed } from '../config.js';

// noinspection JSUnusedGlobalSymbols
export default sprite => {
    const { context: ctx, x, y } = sprite;
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = 1;
    ctx.strokeStyle = lightRed;
    ctx.fillStyle = darkRed;
    ctx.beginPath();
    ctx.moveTo(-49, -49);
    ctx.lineTo(50, -49);
    ctx.lineTo(50, 50);
    ctx.lineTo(-49, 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-49, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -49);
    ctx.lineTo(0, 50);
    ctx.stroke();

    ctx.restore();
};
