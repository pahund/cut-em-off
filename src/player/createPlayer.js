/* global kontra */

import { drawPlayer, updatePlayer } from '.';
import { canvasHeight, canvasWidth, playerStartDirection, collisionRadius } from '../config';
import { GAME_OVER } from '../pubsub';
import { collides } from '../utils';

export default (map, pubsub) => {
    const player = kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        collisionRadius,
        map,
        infected: false,
        gameOver: false,
        direction: playerStartDirection,
        nextDirection: null,
        dropBomb: false,
        update() {
            ({ nextDirection: this.nextDirection, direction: this.direction, dropBomb: this.dropBomb } = updatePlayer(
                this,
                pubsub
            ));
        },
        render() {
            drawPlayer(this);
        },
        infect(virus, messageBox) {
            if (collides(virus, this)) {
                // eslint-disable-next-line no-param-reassign
                this.infected = true;
                if (!this.gameOver) {
                    messageBox.show('player infected<br>game over');
                    pubsub.publish(GAME_OVER);
                }
            }
        }
    });
    pubsub.subscribe(GAME_OVER, () => (player.gameOver = true));
    return player;
};
