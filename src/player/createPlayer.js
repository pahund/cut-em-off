/* global kontra */

import { canvasHeight, canvasWidth, playerStartDirection } from '../config';
import { drawPlayer } from '.';
import { isInTheMiddle, getNewDirectionFromKeyboard } from './utils';
import { directionIsAllowed, switchDirection } from '../directions';

export default map =>
    kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        map,
        direction: playerStartDirection,
        nextDirection: null,
        update() {
            this.nextDirection = getNewDirectionFromKeyboard() || this.nextDirection;
            if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
                return;
            }
            const tile = map.tileAtLayer('main', { x: this.x, y: this.y });
            if (this.nextDirection && directionIsAllowed(tile, this.nextDirection)) {
                this.direction = this.nextDirection;
                this.nextDirection = null;
            } else {
                this.direction = switchDirection(tile, this.direction);
            }
        },
        render() {
            drawPlayer(this);
        }
    });
