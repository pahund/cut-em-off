/* global kontra */

import { drawUser, INFECTED } from './index.js';
import { tileWidth, tileHeight, collisionRadius } from '../config.js';
import { ONLINE } from './index.js';
import { pubsub, INFECTED as INFECTED_EVENT } from '../pubsub/index.js';

export default ({ map, row, col }) => {
    const { x, y } = map.getXAndY({ row, col });
    return {
        context: kontra.context,
        x,
        y,
        collisionRadius,
        infected: false,
        map,
        mapX: col * tileWidth,
        mapY: row * tileHeight,
        row,
        col,
        status: ONLINE,
        update() {
            ({ x: this.x, y: this.y } = map.getXAndY({ mapX: this.mapX, mapY: this.mapY }));
        },
        render() {
            drawUser(this);
        },
        infect() {
            this.status = INFECTED;
            pubsub.publish(INFECTED_EVENT);
        }
    };
};
