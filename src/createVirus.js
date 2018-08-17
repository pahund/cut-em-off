/* global kontra */

import { virusStartDirection, lightRed, darkRed, virusStartCol, virusStartRow, tileWidth, tileHeight } from './config';
import ri from './getRandomInt';
import calculateVirusCoordinates from './transformMapCoordinates';
import { virusSpeed } from './config';
import { N, E, S, W } from './directions';

export default ({ x, y }) =>
    kontra.sprite({
        x,
        y,
        mapX: (virusStartCol - 1) * tileWidth,
        mapY: (virusStartRow - 1) * tileHeight,
        direction: virusStartDirection,
        update(map) {
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
            const { x: newX, y: newY } = calculateVirusCoordinates(map, { x: this.mapX, y: this.mapY });
            this.x = newX;
            this.y = newY;
        },
        render() {
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.lineWidth = 3;
            this.context.strokeStyle = lightRed;
            this.context.fillStyle = darkRed;
            this.context.beginPath();
            this.context.moveTo(ri(-5, 5), ri(-5, -25)); // 1
            this.context.lineTo(ri(5, 50), ri(-5, -50)); // 2
            this.context.lineTo(ri(5, 25), ri(-5, 5)); // 3
            this.context.lineTo(ri(5, 50), ri(5, 50)); // 4
            this.context.lineTo(ri(-5, 5), ri(5, 25)); // 5
            this.context.lineTo(ri(-5, -50), ri(5, 50)); // 6
            this.context.lineTo(ri(-5, -25), ri(-5, 5)); // 7
            this.context.lineTo(ri(-5, -50), ri(-5, -50)); // 8
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.restore();
        }
    });
