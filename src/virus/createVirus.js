/* global kontra */

import { virusStartDirection, virusStartCol, virusStartRow, tileWidth, tileHeight, virusSpeed } from '../config';
import { N, E, S, W, switchDirection } from '../directions';
import { transformMapCoordinates } from '../utils';
import drawVirus from './drawVirus';

export default map => {
    const { x, y } = transformMapCoordinates(map, { row: virusStartRow, col: virusStartCol });
    return kontra.sprite({
        x,
        y,
        mapX: (virusStartCol - 1) * tileWidth,
        mapY: (virusStartRow - 1) * tileHeight,
        direction: virusStartDirection,
        update() {
            switch (this.direction) {
                case N:
                    // eslint-disable-next-line no-param-reassign
                    this.mapY -= virusSpeed;
                    break;
                case E:
                    // eslint-disable-next-line no-param-reassign
                    this.mapX += virusSpeed;
                    break;
                case S:
                    // eslint-disable-next-line no-param-reassign
                    this.mapY += virusSpeed;
                    break;
                case W:
                    // eslint-disable-next-line no-param-reassign
                    this.mapX -= virusSpeed;
                    break;
                default:
            }
            if (this.mapX % tileWidth === 0 && this.mapY % tileHeight === 0) {
                const tile = map.tileAtLayer('main', { x: this.x, y: this.y });
                // eslint-disable-next-line no-param-reassign
                this.direction = switchDirection(tile, this.direction);
            }
            const { x: newX, y: newY } = transformMapCoordinates(map, { x: this.mapX, y: this.mapY });
            this.x = newX;
            this.y = newY;
        },
        render() {
            drawVirus(this);
        }
    });
};
