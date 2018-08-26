import { lightRed, lightBlue, darkBlue } from '../config';
import { getRandomInt as ri } from '../utils';
import { degreesToRadians as deg2rad } from '../utils';

export default sprite => {
    const { context: ctx, x, y, fuseLength } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg2rad(-45));

    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.fillStyle = darkBlue;

    /* bomb */
    ctx.beginPath();
    ctx.moveTo(23, -10);
    ctx.lineTo(40, -10);
    ctx.lineTo(40, 10);
    ctx.lineTo(23, 10);
    ctx.arc(0, 0, 25, deg2rad(19), deg2rad(341));
    ctx.fill();
    ctx.stroke();

    /* fuse */
    const fuseRad = 25; // radius of the fuse arc
    const fuseDeg = (fuseLength / 100) * 90; // length of the fuse arc in degrees
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.arc(40, 25, fuseRad, deg2rad(270), deg2rad(270 + fuseDeg));
    ctx.stroke();

    /* sparks */
    const sparkCX = Math.cos(deg2rad(fuseDeg - 90)) * fuseRad + 40; // X-coord of sparks center
    const sparkCY = Math.sin(deg2rad(fuseDeg - 90)) * fuseRad + 25; // Y-coord of sparks centers
    const sparkRad = 15; // radius of the sparks circle
    ctx.fillStyle = lightRed;
    for (let i = 0; i < 10; i++) {
        const sparkX = Math.cos(deg2rad(ri(0, 360))) * ri(0, sparkRad) + sparkCX;
        const sparkY = Math.sin(deg2rad(ri(0, 360))) * ri(0, sparkRad) + sparkCY;
        ctx.fillRect(sparkX - 1, sparkY - 1, 3, 3);
    }

    ctx.restore();
};
