/* global kontra */

import { moveCamera } from './utils';

export default ({ map, player, virus, devbox }) =>
    kontra.gameLoop({
        update() {
            player.update();
            virus.update();
            moveCamera(map, player.direction);
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
