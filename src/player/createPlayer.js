/* global kontra */

import { drawPlayer, updatePlayer } from './index.js';
import { canvasHeight, canvasWidth, playerStartDirection, collisionRadius } from '../config.js';
import { pubsub, GAME_OVER, DROP_SHIP } from '../pubsub/index.js';
import { collides } from '../utils/index.js';
import { messageBox } from '../messageBox/index.js';

export default map => {
    const player = {
        context: kontra.context,
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        collisionRadius,
        map,
        infected: false,
        gameOver: true,
        direction: playerStartDirection,
        nextDirection: null,
        dropBomb: false,
        scale: 1,
        dropping: false,
        bombCoolingDown: false,

        update() {
            ({
                nextDirection: this.nextDirection,
                direction: this.direction,
                dropBomb: this.dropBomb,
                scale: this.scale,
                bombCoolingDown: this.bombCoolingDown
            } = updatePlayer(this, pubsub, messageBox));
        },

        render() {
            drawPlayer(this);
        },

        infect(virus) {
            if (collides(virus, this)) {
                // eslint-disable-next-line no-param-reassign
                this.infected = true;
                if (!this.gameOver) {
                    messageBox.show('player infected<br>game over');
                    pubsub.publish(GAME_OVER);
                }
            }
        },

        enableControls() {
            this.gameOver = false;
        }
    };

    pubsub.subscribe(GAME_OVER, () => (player.gameOver = true));
    pubsub.subscribe(DROP_SHIP, () => (player.dropping = true));

    return player;
};
