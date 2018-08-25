/* global kontra */

import { FUSE_BURNING, EXPLODING, EXPLODED } from '.';
import { getRandomInt as ri } from '../utils';
import { degreesToRadians as deg2rad } from '../utils';
import { drawShrapnel } from '.';

export default sprite => {
    let { status, fuseLength, explosionDuration } = sprite;
    const { shrapnel, x, y } = sprite;
    switch (status) {
        case FUSE_BURNING:
            fuseLength -= 0.5;
            if (fuseLength < 0) {
                status = EXPLODING;
                for (let i = 0; i < 50; i++) {
                    const dir = ri(0, 360);
                    const speed = ri(5, 15);
                    shrapnel.push(
                        kontra.sprite({
                            x,
                            y,
                            dx: Math.cos(deg2rad(dir)) * speed,
                            dy: Math.sin(deg2rad(dir)) * speed,
                            rotation: ri(0, 360),
                            rotationDir: [ri(-10, -1), ri(1, 10)][ri(0, 1)],
                            update() {
                                this.advance();
                                this.rotation += this.rotationDir;
                            },
                            render() {
                                drawShrapnel(this);
                            }
                        })
                    );
                }
            }
            break;
        case EXPLODING:
            shrapnel.forEach(s => s.update());
            explosionDuration++;
            if (explosionDuration === 200) {
                status = EXPLODED;
            }
            break;
        default:
    }
    return {
        status,
        fuseLength,
        explosionDuration
    };
};
