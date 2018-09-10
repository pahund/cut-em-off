/* global kontra */

import { FUSE_BURNING, EXPLODING, EXPLODED } from './index.js';
import { createShrapnel } from './index.js';
import { transformMapCoordinates } from '../utils/index.js';
import { mapPaddingX, mapPaddingY } from '../config.js';
import { pubsub, MAP_CHANGED, USERS_POSSIBLY_OFFLINE, BOMB_EXPLODES } from '../pubsub/index.js';

export default sprite => {
    let { status, fuseLength, explosionDuration, x, y } = sprite;
    const { shrapnel, map, mapX, mapY, row, col } = sprite;

    ({ x, y } = transformMapCoordinates(map, { x: mapX, y: mapY }));
    switch (status) {
        case FUSE_BURNING:
            fuseLength -= 1;
            if (fuseLength < 0) {
                status = EXPLODING;
                pubsub.publish(BOMB_EXPLODES);
                for (let i = 0; i < 50; i++) {
                    shrapnel.push(createShrapnel({ x, y }));
                }
                const tile = map.tileAtLayer('main', { row: row + mapPaddingY - 1, col: col + mapPaddingX - 1 });
                map.changeTile('main', { row: row + mapPaddingY - 1, col: col + mapPaddingX - 1 }, tile + 24);
                pubsub.publish(MAP_CHANGED, map);
                pubsub.publish(USERS_POSSIBLY_OFFLINE);
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
