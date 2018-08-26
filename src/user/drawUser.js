/* global kontra */
import { lightBlue, darkBlue, lightGreen, darkGreen, lightRed, darkRed } from '../config';
import { ONLINE, OFFLINE, INFECTED } from './constants';
import { degreesToRadians as deg2rad } from '../utils';

const spriteMapping = {
    [ONLINE]: { fg: lightBlue, bg: darkBlue },
    [OFFLINE]: { fg: lightGreen, bg: darkGreen },
    [INFECTED]: { fg: lightRed, bg: darkRed }
};

export default sprite => {
    const { context: ctx, x, y, status } = sprite;
    const { fg, bg } = spriteMapping[status];
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = fg;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.moveTo(-40, 40);
    ctx.lineTo(-40, 20);
    ctx.arc(-20, 20, 20, deg2rad(180), deg2rad(270));
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.arc(20, 20, 20, deg2rad(270), deg2rad(0));
    ctx.lineTo(40, 40);
    ctx.lineTo(-40, 40);
    ctx.moveTo(-23, 20);
    ctx.lineTo(-23, 40);
    ctx.moveTo(23, 20);
    ctx.lineTo(23, 40);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -15, 25, deg2rad(0), deg2rad(360));
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
