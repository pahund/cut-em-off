/* global kontra */

import { playerStartDirection } from '../config';
import { getNewDirectionFromKeyboard, directionIsAllowed, switchDirection } from '../directions';
import { moveCamera, isInTheMiddle } from './utils';

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
    return kontra.gameLoop({
        update() {
            nextDirection = getNewDirectionFromKeyboard() || nextDirection;
            updatePlayer();
            virus.update(map);
            moveCamera(map, direction);
        },
        render() {
            map.render();
            player.render();
            virus.render();
            const playerTile = map.tileAtLayer('main', { x: player.x, y: player.y });
            const virusTile = map.tileAtLayer('main', { x: virus.x, y: virus.y });
            const { mapX, mapY } = virus;
            const { sx, sy } = map;
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `
                tile player ${playerTile};
                virus ${virusTile};
                mapXY ${mapX}/${mapY}; sx/sy ${sx}/${sy}`;
        }
    });
};
