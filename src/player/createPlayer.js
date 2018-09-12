/* global kontra */

import { drawPlayer, updatePlayer } from './index.js';
import { canvasHeight, canvasWidth, collisionRadius, teleportCooldownTimeout } from '../config.js';
import { pubsub, GAME_OVER, LEVEL_COMPLETED, DROP_SHIP, MAP_CHANGED } from '../pubsub/index.js';
import { multiCollides } from '../utils/index.js';
import { messageBox } from '../messageBox/index.js';
import { calculateCameraCoordinates } from '../utils/index.js';
import { directionIsAllowed, switchDirection } from '../directions/index.js';
import { servers } from '../server/index.js';
import { pathfinder } from '../pathfinder/index.js';
import { viruses } from '../virus/index.js';

export default ({ map, direction, speed }) => {
    const player = {
        context: kontra.context,
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        collisionRadius,
        map,
        speed,
        infected: false,
        gameInactive: true,
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
                if (!this.gameInactive) {
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
            this.gameInactive = false;
        },

        canReachVirus() {
            // check if player can reach all viruses by path
            const playerWithRowAndCol = {
                ...this,
                ...this.map.getRowAndCol(this)
            };
            const virusesWithRowAndCol = viruses.getAllWithRowAndCol();
            const playerCannotReachTheseVirusesByPath = virusesWithRowAndCol.filter(
                virus => !pathfinder.isReachable(playerWithRowAndCol, virus)
            );

            if (playerCannotReachTheseVirusesByPath.length === 0) {
                return;
            }

            // check if viruses can be reached from servers
            const availableServers = servers.getAvailableServers();
            const playerCannotReachTheseVirusesAtAll = [];

            availableServers.forEach(server => {
                playerCannotReachTheseVirusesByPath.forEach(virus => {
                    if (!pathfinder.isReachable(server, virus)) {
                        playerCannotReachTheseVirusesAtAll.push(virus);
                    }
                });
            });

            if (playerCannotReachTheseVirusesAtAll.length === 0) {
                return;
            }

            // if there are any viruses not reachable, then infect all users the virus can reach
        }
    };

    pubsub.subscribe(GAME_OVER, () => (player.gameInactive = true));
    pubsub.subscribe(LEVEL_COMPLETED, () => (player.gameInactive = true));
    pubsub.subscribe(DROP_SHIP, () => (player.dropping = true));
    pubsub.subscribe(MAP_CHANGED, () => player.canReachVirus());

    return player;
};
