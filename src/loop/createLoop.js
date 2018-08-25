/* global kontra */

import { moveCamera } from './utils';

export default ({ map, player, virus, users, messageBox, bomb }) =>
    kontra.gameLoop({
        update() {
            virus.update();
            player.update();
            player.infect(virus, messageBox);
            moveCamera(map, player.direction);
            users.update();
            users.infect([virus], messageBox);
            bomb.update();
        },
        render() {
            map.render();
            users.render();
            player.render();
            virus.render();
            bomb.render();
        }
    });
