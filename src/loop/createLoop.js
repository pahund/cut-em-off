/* global kontra */

import { moveCamera, collides } from './utils';

export default ({ map, player, virus, user, messageBox }) =>
    kontra.gameLoop({
        update() {
            player.update();
            moveCamera(map, player.direction);
            virus.update();
            user.update();
            if (collides(virus, player)) {
                // eslint-disable-next-line no-param-reassign
                player.infected = true;
                messageBox.show('player infected<br>game over');
            }
        },
        render() {
            map.render();
            player.render();
            virus.render();
            user.render();
        }
    });
