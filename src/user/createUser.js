/* global kontra */

import { drawUser, INFECTED } from '.';
import { tileWidth, tileHeight, collisionRadius } from '../config';
import { transformMapCoordinates } from '../utils';
import { ONLINE } from '.';

export default ({ map, row, col }) => {
    const { x, y } = transformMapCoordinates(map, { row, col });
    return kontra.sprite({
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
        }
    });
};
