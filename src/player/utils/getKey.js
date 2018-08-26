/* global kontra */

import { N, E, S, W } from '../../directions';

export default sprite => {
    let { nextDirection, dropBomb } = sprite;
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
    return { nextDirection, dropBomb };
};
