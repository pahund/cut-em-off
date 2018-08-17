/* global kontra */

import { playerStartDirection } from './config';
import directionIsAllowed from './directionIsAllowed';
import getNewDirectionFromKeyboard from './getNewDirectionFromKeyboard';
import isInTheMiddle from './isInTheMiddle';
import moveCamera from './moveCamera';
import switchDirection from './switchDirection';

let direction = playerStartDirection;
let nextDirection = null;

export default ({ map, player, virus, devbox }) => {
    function updatePlayer() {
        if (!isInTheMiddle({ x: map.sx, y: map.sy })) {
            return;
        }
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
    function updateVirus() {
        if (isInTheMiddle({ x: virus.mapX, y: virus.mapY })) {
            const tile = map.tileAtLayer('main', { x: virus.x, y: virus.y });
            // eslint-disable-next-line no-param-reassign
            virus.direction = switchDirection(tile, virus.direction);
        }
        virus.update(map);
    }
    return kontra.gameLoop({
        update() {
            nextDirection = getNewDirectionFromKeyboard() || nextDirection;
            updatePlayer();
            updateVirus();
            virus.update(map);
            moveCamera(map, direction);
        },
        render() {
            map.render();
            player.render();
            virus.render();
            const playerTile = map.tileAtLayer('main', { x: player.x, y: player.y });
            const virusTile = map.tileAtLayer('main', { x: virus.x, y: virus.y });
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `tile player ${playerTile} / virus ${virusTile}`;
        }
    });
};
