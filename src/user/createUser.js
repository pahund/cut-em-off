/* global kontra */

import { drawUser, INFECTED } from './index.js';
import { tileWidth, tileHeight, collisionRadius } from '../config.js';
import { transformMapCoordinates } from '../utils/index.js';
import { ONLINE } from './index.js';
import { pubsub, INFECTED as INFECTED_EVENT } from '../pubsub/index.js';

export default ({ map, row, col }) => {
    const { x, y } = transformMapCoordinates(map, { row, col });
    return {
        context: kontra.context,
        x,
        y,
        collisionRadius,
        infected: false,
        map,
        mapX: (col - 1) * tileWidth,
        mapY: (row - 1) * tileHeight,
        status: ONLINE,
        update() {
            ({ x: this.x, y: this.y } = transformMapCoordinates(this.map, { x: this.mapX, y: this.mapY }));
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
