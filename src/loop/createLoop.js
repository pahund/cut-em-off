/* global kontra */

import { moveCamera } from './utils';
import { calculateRowAndCol } from '../utils';
import { DROP_SHIP } from '../pubsub';

export default ({ map, player, virus, users, messageBox, bombs, pubsub }) => {
    const times = [];
    let fps;
    let shipMoving = true;
    pubsub.subscribe(DROP_SHIP, () => (shipMoving = false));

    return kontra.gameLoop({
        update() {
            virus.update();
            player.update(messageBox);
            player.infect(virus, messageBox);
            if (shipMoving) {
                moveCamera(map, player.direction);
            }
            users.update();
            users.infect([virus], messageBox);
            bombs.update();
        },
        render() {
            map.render();
            users.render();
            bombs.render();
            player.render();
            virus.render();
            if (process.env.NODE_ENV === 'development') {
                const now = performance.now();
                while (times.length > 0 && times[0] <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;
                const { row, col } = calculateRowAndCol(map);

                // eslint-disable-next-line no-param-reassign
                window.devbox.innerHTML = `${fps} fps – sx=${map.sx}, sy=${map.sy}, row=${row}, col=${col}`;
            }
        }
    });
};
