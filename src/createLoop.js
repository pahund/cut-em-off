/* global kontra */
import calculateGridIndex from './calculateGridIndex';
import calculateGridCoordinates from './calculateGridCoordinates';
import data from './map';

const sx = 10;
const sy = 10;

export default ({ map, sprites, devbox }) =>
    kontra.gameLoop({
        update() {
            if (kontra.keys.pressed('right')) {
                // eslint-disable-next-line no-param-reassign
                map.sx += sx;
            }
            if (kontra.keys.pressed('left')) {
                // eslint-disable-next-line no-param-reassign
                map.sx -= sx;
            }
            if (kontra.keys.pressed('up')) {
                // eslint-disable-next-line no-param-reassign
                map.sy -= sy;
            }
            if (kontra.keys.pressed('down')) {
                // eslint-disable-next-line no-param-reassign
                map.sy += sy;
            }
        },
        render() {
            map.render();
            sprites.map(sprite => sprite.render());
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });
