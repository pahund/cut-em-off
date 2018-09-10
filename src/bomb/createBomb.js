/* global kontra */

import { collisionRadius, tileHeight, tileWidth } from '../config.js';
import { drawBomb, updateBomb } from './index.js';
import { FUSE_BURNING } from './index.js';

export default (map, { row, col }) => {
    const { x, y } = map.getXAndY({ row, col });
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
        mapX: col * tileWidth,
        mapY: row * tileHeight,
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
