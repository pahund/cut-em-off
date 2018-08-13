/* global kontra */

import createMap from './createMap';
import createPlayer from './createPlayer';

const sprites = [];

(async () => {
    kontra.init();
    sprites.push(createPlayer());
    const map = await createMap();

    const sx = 10;
    const sy = 10;

    const loop = kontra.gameLoop({
        update() {
            if (kontra.keys.pressed('right')) {
                map.sx += sx;
            }
            if (kontra.keys.pressed('left')) {
                map.sx -= sx;
            }
            if (kontra.keys.pressed('up')) {
                map.sy -= sy;
            }
            if (kontra.keys.pressed('down')) {
                map.sy += sy;
            }
        },
        render() {
            map.render();
            sprites.map(sprite => sprite.render());
        }
    });

    loop.start();
})();
