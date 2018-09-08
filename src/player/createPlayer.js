/* global kontra */

import { drawPlayer, updatePlayer } from '.';
import { canvasHeight, canvasWidth, playerStartDirection, collisionRadius } from '../config';
import { pubsub, GAME_OVER, DROP_SHIP } from '../pubsub';
import { collides } from '../utils';

export default map => {
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
        scale: 1,
        dropping: false,
        update(messageBox) {
            const updated = updatePlayer(this, messageBox);
            ({
                nextDirection: this.nextDirection,
                direction: this.direction,
                dropBomb: this.dropBomb,
                scale: this.scale
            } = updated);
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
    pubsub.subscribe(DROP_SHIP, () => (player.dropping = true));
    return player;
};
