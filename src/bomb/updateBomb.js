/* global kontra */

import { FUSE_BURNING, EXPLODING, EXPLODED } from './index.js';
import { createShrapnel } from './index.js';
import { transformMapCoordinates } from '../utils/index.js';
import { mapPaddingX, mapPaddingY } from '../config.js';

export default sprite => {
    let { status, fuseLength, explosionDuration, x, y } = sprite;
    const { shrapnel, map, mapX, mapY, row, col } = sprite;

    ({ x, y } = transformMapCoordinates(map, { x: mapX, y: mapY }));
    switch (status) {
        case FUSE_BURNING:
            fuseLength -= 1;
            if (fuseLength < 0) {
                status = EXPLODING;
                for (let i = 0; i < 50; i++) {
                    shrapnel.push(createShrapnel({ x, y }));
                }
                const tile = map.tileAtLayer('main', { row: row + mapPaddingY - 1, col: col + mapPaddingX - 1 });
                map.changeTile('main', { row: row + mapPaddingY, col: col + mapPaddingX }, tile + 24);
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
        explosionDuration,
        x,
        y
    };
};
