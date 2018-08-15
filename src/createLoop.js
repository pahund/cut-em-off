/* global kontra */
import calculateGridIndex from './calculateGridIndex';
import calculateGridCoordinates from './calculateGridCoordinates';
import calculateTile from './calculateTile';
import directionIsAllowed from './directionIsAllowed';
import data from './map';
import isInTheMiddle from './isInTheMiddle';
import directions from './directions';
import switchDirection from './switchDirection';
import { startDirection, speed } from './config';
import { N, E, S, W } from './directions';

let direction = startDirection;
let nextDirection = null;

export default ({ map, player, devbox }) =>
    kontra.gameLoop({
        update() {
            if (kontra.keys.pressed('right')) {
                // eslint-disable-next-line no-param-reassign
                nextDirection = E;
            }
            if (kontra.keys.pressed('left')) {
                // eslint-disable-next-line no-param-reassign
                nextDirection = W;
            }
            if (kontra.keys.pressed('up')) {
                // eslint-disable-next-line no-param-reassign
                nextDirection = N;
            }
            if (kontra.keys.pressed('down')) {
                // eslint-disable-next-line no-param-reassign
                nextDirection = S;
            }
            if (isInTheMiddle(map.sx, map.sy)) {
                const tile = calculateTile(map.sx, map.sy);
                if (nextDirection) {
                    if (directionIsAllowed(tile, nextDirection)) {
                        direction = nextDirection;
                    } else {
                        direction = switchDirection(tile, direction);
                    }
                    nextDirection = null;
                } else {
                    direction = switchDirection(tile, direction);
                }
                // eslint-disable-next-line no-param-reassign
                player.direction = direction;
            }
            switch (direction) {
                case directions.N:
                    // eslint-disable-next-line no-param-reassign
                    map.sy -= speed;
                    break;
                case directions.E:
                    // eslint-disable-next-line no-param-reassign
                    map.sx += speed;
                    break;
                case directions.S:
                    // eslint-disable-next-line no-param-reassign
                    map.sy += speed;
                    break;
                case directions.W:
                    // eslint-disable-next-line no-param-reassign
                    map.sx -= speed;
                    break;
                default:
            }
        },
        render() {
            map.render();
            player.render();
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });
