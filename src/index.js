/* global kontra */

import createMap from './createMap';
import createPlayer from './createPlayer';
import createCanvas from './createCanvas';
import calculateGridIndex from './calculateGridIndex';
import data from './map';
import calculateGridCoordinates from './calculateGridCoordinates';

const sprites = [];
const devbox = document.getElementById('devbox');

(async () => {
    createCanvas();
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
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });

    loop.start();
})();
