/* global kontra */
import { startDirection } from './config';
import directionIsAllowed from './directionIsAllowed';
import getNewDirectionFromKeyboard from './getNewDirectionFromKeyboard';
import isInTheMiddle from './isInTheMiddle';
import moveCamera from './moveCamera';
import switchDirection from './switchDirection';

let direction = startDirection;
let nextDirection = null;

export default ({ map, player, virus, devbox }) =>
    kontra.gameLoop({
        update() {
            nextDirection = getNewDirectionFromKeyboard() || nextDirection;
            if (isInTheMiddle(map)) {
                const tile = map.tileAtLayer('main', { x: player.x, y: player.y });
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
            const tile = map.tileAtLayer('main', { x: player.x, y: player.y });
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `tile: ${tile}`;
        }
    });
