/* global kontra */

import { moveCamera, collides } from './utils';

export default ({ map, player, virus, messageBox }) =>
    kontra.gameLoop({
        update() {
            player.update();
            virus.update();
            if (collides(virus, player)) {
                // eslint-disable-next-line no-param-reassign
                player.infected = true;
                messageBox.show('player infected<br>game over');
            }

            moveCamera(map, player.direction);
        },
        render() {
            map.render();
            player.render();
            virus.render();
        }
    });
