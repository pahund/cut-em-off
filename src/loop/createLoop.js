/* global kontra */

import { moveCamera } from './utils';

export default ({ map, player, virus, users, messageBox }) =>
    kontra.gameLoop({
        update() {
            virus.update();
            player.update();
            player.infect(virus, messageBox);
            moveCamera(map, player.direction);
            users.update();
            users.infect([virus], messageBox);
        },
        render() {
            map.render();
            users.render();
            player.render();
            virus.render();
        }
    });
