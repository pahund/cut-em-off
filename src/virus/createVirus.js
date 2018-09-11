/* global kontra */

import { tileWidth, tileHeight, collisionRadius } from '../config.js';
import { drawVirus, updateVirus, Blips } from './index.js';

export default ({ map, col, row, direction, speed }) => {
    const { x, y } = map.getXAndY({ row, col });
    const blips = new Blips();
    const virus = {
        context: kontra.context,
        x,
        y,
        speed,
        collisionRadius,
        map,
        mapX: col * tileWidth,
        mapY: row * tileHeight,
        direction,
        blips,
        update() {
            ({ x: this.x, y: this.y, mapX: this.mapX, mapY: this.mapY, direction: this.direction } = updateVirus(this));
            this.blips.update();
        },
        render() {
            drawVirus(this);
            this.blips.render();
        }
    };
    blips.start(virus);

    return virus;
};
