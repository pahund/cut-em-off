/* eslint-disable no-param-reassign */
import { degreesToRadians as deg2rad } from '../../utils';
import { tileHeight, tileWidth, lightBlue } from '../../config';

function calculatePointOnArc(deg, r) {
    return [Math.cos(deg2rad(deg)) * r + 50, Math.sin(deg2rad(deg)) * r + 50];
}

export default ({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * tileWidth + tileWidth / 2, (row - 1) * tileHeight + tileHeight / 2);
    ctx.rotate(deg2rad(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    if (broken) {
        ctx.moveTo(20, 50);
        ctx.arc(50, 50, 30, deg2rad(180), deg2rad(200));
        ctx.moveTo(...calculatePointOnArc(200, 30));
        ctx.lineTo(10, 40);
        ctx.lineTo(10, 20);
        ctx.lineTo(-10, 30);
        ctx.lineTo(...calculatePointOnArc(200, 70));
        ctx.arc(50, 50, 70, deg2rad(200), deg2rad(180), true);
        ctx.moveTo(50, 20);
        ctx.arc(50, 50, 30, deg2rad(270), deg2rad(250), true);
        ctx.moveTo(...calculatePointOnArc(250, 30));
        ctx.lineTo(30, 10);
        ctx.lineTo(40, 0);
        ctx.lineTo(20, 0);
        ctx.lineTo(...calculatePointOnArc(250, 70));
        ctx.arc(50, 50, 70, deg2rad(250), deg2rad(270));
    } else {
        ctx.moveTo(20, 50);
        ctx.arc(50, 50, 30, deg2rad(180), deg2rad(270));
        ctx.moveTo(-20, 50);
        ctx.arc(50, 50, 70, deg2rad(180), deg2rad(270));
    }
    ctx.stroke();
    ctx.restore();
};
