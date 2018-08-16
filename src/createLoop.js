import calculateGridCoordinates from './calculateGridCoordinates';
/* global kontra */
import calculateGridIndex from './calculateGridIndex';
import calculateTile from './calculateTile';
import { startDirection } from './config';
import directionIsAllowed from './directionIsAllowed';
import getNewDirectionFromKeyboard from './getNewDirectionFromKeyboard';
import isInTheMiddle from './isInTheMiddle';
import data from './map';
import moveCamera from './moveCamera';
import switchDirection from './switchDirection';

let direction = startDirection;
let nextDirection = null;

export default ({ map, player, virus, devbox }) =>
    kontra.gameLoop({
        update() {
            nextDirection = getNewDirectionFromKeyboard() || nextDirection;
            if (isInTheMiddle(map)) {
                const tile = calculateTile(map.sx, map.sy);
                if (nextDirection && directionIsAllowed(tile, nextDirection)) {
                    direction = nextDirection;
                    nextDirection = null;
                } else {
                    direction = switchDirection(tile, direction);
                }
                // eslint-disable-next-line no-param-reassign
                player.direction = direction;
            }
            moveCamera(map, direction);
        },
        render() {
            map.render();
            player.render();
            virus.render();
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });
