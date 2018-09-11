/* global kontra */

import { collisionRadius, tileHeight, tileWidth } from '../config.js';
import { transformMapCoordinates } from '../utils/index.js';
import { drawBomb, updateBomb } from './index.js';
import { FUSE_BURNING } from './index.js';

export default (map, { row, col }) => {
    const { x, y } = transformMapCoordinates(map, { row, col });
    return {
        context: kontra.context,
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
        row,
        col,
        update() {
            ({
                status: this.status,
                fuseLength: this.fuseLength,
                explosionDuration: this.explosionDuration,
                x: this.x,
                y: this.y
            } = updateBomb(this));
        },
        render() {
            drawBomb(this);
        }
    };
};
