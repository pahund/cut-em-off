/* global kontra */

import { canvasHeight, canvasWidth, playerStartDirection, collisionRadius } from '../config';
import { drawPlayer, updatePlayer } from '.';

export default map =>
    kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        collisionRadius,
        map,
        infected: false,
        direction: playerStartDirection,
        nextDirection: null,
        update() {
            ({ nextDirection: this.nextDirection, direction: this.direction } = updatePlayer(this));
        },
        render() {
            drawPlayer(this);
        }
    });
