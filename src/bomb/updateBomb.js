/* global kontra */

import { FUSE_BURNING, EXPLODING, EXPLODED } from './index.js';
import { createShrapnel } from './index.js';
import { pubsub, MAP_CHANGED, USERS_POSSIBLY_OFFLINE, BOMB_EXPLODES } from '../pubsub/index.js';
import { servers } from '../server/index.js';

export default sprite => {
    let { status, fuseLength, explosionDuration, x, y } = sprite;
    const { shrapnel, map, mapX, mapY, row, col } = sprite;

    ({ x, y } = map.getXAndY({ mapX, mapY }));
    switch (status) {
        case FUSE_BURNING:
            fuseLength -= 1;
            if (fuseLength < 0) {
                status = EXPLODING;
                pubsub.publish(BOMB_EXPLODES);
                for (let i = 0; i < 50; i++) {
                    shrapnel.push(createShrapnel({ x, y }));
                }
                if (servers.find({ row, col })) {
                    servers.destroy({ row, col });
                } else {
                    const tile = map.tileAtLayer('main', { row, col });
                    map.changeTile('main', { row, col }, tile + 16);
                    pubsub.publish(MAP_CHANGED, map);
                    pubsub.publish(USERS_POSSIBLY_OFFLINE);
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
        explosionDuration,
        x,
        y
    };
};
