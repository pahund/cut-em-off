/* global kontra */

import { drawPlayer, updatePlayer } from './index.js';
import { canvasHeight, canvasWidth, collisionRadius, teleportCooldownTimeout } from '../config.js';
import { pubsub, GAME_OVER, DROP_SHIP } from '../pubsub/index.js';
import { multiCollides } from '../utils/index.js';
import { messageBox } from '../messageBox/index.js';
import { calculateCameraCoordinates } from '../utils/index.js';
import { directionIsAllowed, switchDirection } from '../directions/index.js';
import { servers } from '../server/index.js';

export default ({ map, direction, speed }) => {
    const player = {
        context: kontra.context,
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        collisionRadius,
        map,
        speed,
        infected: false,
        gameOver: true,
        direction,
        nextDirection: null,
        dropBomb: false,
        scale: 1,
        dropping: false,
        bombCoolingDown: false,
        teleportToServer: false,
        teleportCoolingDown: false,

        update() {
            ({
                nextDirection: this.nextDirection,
                direction: this.direction,
                dropBomb: this.dropBomb,
                scale: this.scale,
                bombCoolingDown: this.bombCoolingDown,
                teleportToServer: this.teleportToServer
            } = updatePlayer(this, pubsub, messageBox));
        },

        render() {
            drawPlayer(this);
        },

        infect(virusesOrServers) {
            const collisions = multiCollides(virusesOrServers, [this]);

            if (collisions.length > 0) {
                // eslint-disable-next-line no-param-reassign
                this.infected = true;
                if (!this.gameOver) {
                    messageBox.show('player infected<br>game over');
                    pubsub.publish(GAME_OVER);
                }
            }
        },

        teleport() {
            if (this.teleportToServer && !this.teleportCoolingDown) {
                this.teleportCoolingDown = true;

                const nextServer = servers.getNext();
                if (nextServer) {
                    ({ sx: this.map.sx, sy: this.map.sy } = calculateCameraCoordinates(nextServer));
                    if (!directionIsAllowed(this.map, { x: this.x, y: this.y }, this.direction)) {
                        this.direction = switchDirection(this.map, { x: this.x, y: this.y }, this.direction);
                    }
                } else {
                    messageBox.flash('all servers are destroyed or infected');
                }

                setTimeout(() => {
                    this.teleportCoolingDown = false;
                }, teleportCooldownTimeout);
            }
            this.teleportToServer = false;
        },

        enableControls() {
            this.gameOver = false;
        }
    };

    pubsub.subscribe(GAME_OVER, () => (player.gameOver = true));
    pubsub.subscribe(DROP_SHIP, () => (player.dropping = true));

    return player;
};
