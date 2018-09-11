/* global kontra */

import { drawServer } from './index.js';
import { tileWidth, tileHeight } from '../config.js';

export default ({ map, row, col }) => {
    const { x, y } = map.getXAndY({ row, col });
    return {
        context: kontra.context,
        x,
        y,
        row,
        col,
        map,
        mapX: col * tileWidth,
        mapY: row * tileHeight,
        broken: false,
        update() {
            ({ x: this.x, y: this.y } = map.getXAndY({ mapX: this.mapX, mapY: this.mapY }));
        },
        render() {
            drawServer(this);
        }
    };
};
