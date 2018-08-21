/* global kontra */

import { moveCamera, collides } from './utils';

export default ({ map, player, virus, devbox }) =>
    kontra.gameLoop({
        update() {
            player.update();
            virus.update();
            if (collides(virus, player)) {
                // eslint-disable-next-line no-param-reassign
                devbox.innerHTML = 'COLLISION!!1!';
            } else {
                // eslint-disable-next-line no-param-reassign
                devbox.innerHTML = '&nbsp;';
            }

            moveCamera(map, player.direction);
        },
        render() {
            map.render();
            player.render();
            virus.render();
        }
    });
