/* global kontra */

import { virusStartDirection, virusStartCol, virusStartRow, tileWidth, tileHeight } from '../config';
import { transformMapCoordinates } from '../utils';
import { drawVirus, updateVirus } from '.';

export default map => {
    const { x, y } = transformMapCoordinates(map, { row: virusStartRow, col: virusStartCol });
    return kontra.sprite({
        x,
        y,
        map,
        mapX: (virusStartCol - 1) * tileWidth,
        mapY: (virusStartRow - 1) * tileHeight,
        direction: virusStartDirection,
        update() {
            ({ x: this.x, y: this.y, mapX: this.mapX, mapY: this.mapY, direction: this.direction } = updateVirus(this));
        },
        render() {
            drawVirus(this);
        }
    });
};
