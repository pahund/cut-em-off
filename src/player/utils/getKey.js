/* global kontra */

import { N, E, S, W } from '../../directions/index.js';

export default sprite => {
    let { nextDirection, dropBomb, teleportToServer } = sprite;
    if (kontra.keys.pressed('right')) {
        nextDirection = E;
    }
    if (kontra.keys.pressed('left')) {
        nextDirection = W;
    }
    if (kontra.keys.pressed('up')) {
        nextDirection = N;
    }
    if (kontra.keys.pressed('down')) {
        nextDirection = S;
    }
    if (kontra.keys.pressed('space')) {
        dropBomb = true;
    }
    if (kontra.keys.pressed('enter')) {
        teleportToServer = true;
    }

    return { nextDirection, dropBomb, teleportToServer };
};
