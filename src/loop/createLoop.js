/* global kontra */

import { moveCamera } from './utils/index.js';
import { pubsub, DROP_SHIP } from '../pubsub/index.js';
import { servers } from '../server/index.js';
import { viruses } from '../virus/index.js';
import { users } from '../user/index.js';

export default ({ map, player, bombs }) => {
    const times = [];
    let fps;
    let shipMoving = true;
    pubsub.subscribe(DROP_SHIP, () => (shipMoving = false));

    return kontra.gameLoop({
        update() {
            viruses.update();
            player.update();
            player.infect([...servers.getInfectedServers(), ...viruses.getAll()]); // TODO
            player.teleport();
            if (shipMoving) {
                moveCamera({ map, ...player });
            }
            users.update();
            users.infect();
            bombs.update();
            servers.update();
            servers.infect();
        },
        render() {
            map.render();
            users.render();
            servers.render();
            bombs.render();
            player.render();
            viruses.render();
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
