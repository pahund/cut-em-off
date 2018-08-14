/* global kontra */
import calculateGridIndex from './calculateGridIndex';
import calculateGridCoordinates from './calculateGridCoordinates';
import calculateTile from './calculateTile';
import data from './map';
import isInTheMiddle from './isInTheMiddle';
import directions from './directions';
import switchDirection from './switchDirection';
import { startDirection } from './config';

const sx = 5;
const sy = 5;

let direction = startDirection;

export default ({ map, player, devbox }) =>
    kontra.gameLoop({
        update() {
            /*
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
            */
            if (isInTheMiddle(map.sx, map.sy)) {
                const tile = calculateTile(map.sx, map.sy);
                direction = switchDirection(tile, direction);
                player.direction = direction;
            }
            switch (direction) {
                case directions.N:
                    // eslint-disable-next-line no-param-reassign
                    map.sy -= sy;
                    break;
                case directions.E:
                    // eslint-disable-next-line no-param-reassign
                    map.sx += sx;
                    break;
                case directions.S:
                    // eslint-disable-next-line no-param-reassign
                    map.sy += sy;
                    break;
                case directions.W:
                    // eslint-disable-next-line no-param-reassign
                    map.sx -= sx;
                    break;
                default:
            }
        },
        render() {
            map.render();
            player.render();
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });
