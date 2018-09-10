/* global kontra */

import { moveCamera } from './utils/index.js';
import { pubsub, DROP_SHIP } from '../pubsub/index.js';

export default ({ map, player, virus, users, bombs }) => {
    const times = [];
    let fps;
    let shipMoving = true;
    pubsub.subscribe(DROP_SHIP, () => (shipMoving = false));

    return kontra.gameLoop({
        update() {
            virus.update();
            player.update();
            player.infect(virus);
            if (shipMoving) {
                moveCamera(map, player.direction);
            }
            users.update();
            users.infect(virus);
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
                const { row, col } = map.getRowAndCol({ x: 400, y: 300 });

                // eslint-disable-next-line no-param-reassign
                window.devbox.innerHTML = `${fps} fps – sx=${map.sx}, sy=${map.sy}, row=${row}, col=${col}`;
            }
        }
    });
};
