/* global kontra */

import { drawPlayer, updatePlayer } from '.';
import { canvasHeight, canvasWidth, playerStartDirection, collisionRadius } from '../config';
import { collides } from '../utils';

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
        },
        infect(virus, messageBox) {
            if (collides(virus, this)) {
                // eslint-disable-next-line no-param-reassign
                this.infected = true;
                messageBox.show('player infected<br>game over');
            }
        }
    });
