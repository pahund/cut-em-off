/* global kontra */

import { collisionRadius, tileHeight, tileWidth } from '../config';
import { transformMapCoordinates } from '../utils';
import { drawBomb, updateBomb } from '.';
import { FUSE_BURNING } from '.';

export default (map, { row, col }) => {
    const { x, y } = transformMapCoordinates(map, { row, col });
    return kontra.sprite({
        x,
        y,
        collisionRadius,
        fuseLength: 100,
        status: FUSE_BURNING,
        shrapnel: [],
        explosionDuration: 0,
        map,
        mapX: (col - 1) * tileWidth,
        mapY: (row - 1) * tileHeight,
        update() {
            ({
                status: this.status,
                fuseLength: this.fuseLength,
                explosionDuration: this.explosionDuration
            } = updateBomb(this));
        },
        render() {
            drawBomb(this);
        }
    });
};