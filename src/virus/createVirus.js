/* global kontra */

import {
    virusStartDirection,
    virusStartCol,
    virusStartRow,
    tileWidth,
    tileHeight,
    collisionRadius
} from '../config.js';
import { transformMapCoordinates } from '../utils/index.js';
import { drawVirus, updateVirus, Blips } from './index.js';

export default map => {
    const { x, y } = transformMapCoordinates(map, { row: virusStartRow, col: virusStartCol });
    const blips = new Blips();
    const virus = {
        context: kontra.context,
        x,
        y,
        collisionRadius,
        map,
        mapX: (virusStartCol - 1) * tileWidth,
        mapY: (virusStartRow - 1) * tileHeight,
        direction: virusStartDirection,
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
