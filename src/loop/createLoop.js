/* global kontra */

import { moveCamera } from './utils';

export default ({ map, player, virus, users, messageBox, bomb, devbox }) => {
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
            bomb.update();
        },
        render() {
            map.render();
            users.render();
            player.render();
            virus.render();
            bomb.render();
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;

            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `${fps} fps`;
        }
    });
};
