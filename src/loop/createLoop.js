/* global kontra */

import { moveCamera } from './utils';
import { calculateRowAndCol } from '../utils';

export default ({ map, player, virus, users, messageBox, bombs, devbox }) => {
    const times = [];
    let fps;
    return kontra.gameLoop({
        update() {
            virus.update();
            player.update();
            player.infect(virus, messageBox);
            moveCamera(map, player.direction);
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
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
            const { row, col } = calculateRowAndCol(map);

            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `${fps} fps – sx=${map.sx}, sy=${map.sy}, row=${row}, col=${col}`;
        }
    });
};
