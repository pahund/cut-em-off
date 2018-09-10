/* global kontra */
import { getRandomInt as ri } from '../utils';
import { degreesToRadians as deg2rad } from '../utils';
import { drawShrapnel } from '.';

export default ({ x, y }) => {
    const dir = ri(0, 360);
    const speed = ri(5, 15);
    return {
        context: kontra.context,
        x,
        y,
        dx: Math.cos(deg2rad(dir)) * speed,
        dy: Math.sin(deg2rad(dir)) * speed,
        rotation: ri(0, 360),
        rotationDir: [ri(-10, -1), ri(1, 10)][ri(0, 1)],
        update() {
            this.x += this.dx;
            this.y += this.dy;
            this.rotation += this.rotationDir;
        },
        render() {
            drawShrapnel(this);
        }
    };
};
