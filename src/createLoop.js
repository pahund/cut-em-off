/* global kontra */
import calculateGridIndex from './calculateGridIndex';
import calculateGridCoordinates from './calculateGridCoordinates';
import data from './map';

const sx = 10;
const sy = 10;
const directions = {
    N: 'N',
    E: 'E',
    S: 'S',
    W: 'W'
};

let direction = directions.N;

const dirSwitchMap = {
    // curve from S to E
    1: {
        [directions.N]: directions.E,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.S
    },
    // curve from W to S
    2: {
        [directions.N]: directions.W,
        [directions.E]: directions.S,
        [directions.S]: null,
        [directions.W]: null
    },
    // straight from N to S
    3: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // T section W, N, E
    4: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.N,
        [directions.W]: null
    },
    // T section N, E, S
    5: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.E
    },
    // T section W, E, S
    6: {
        [directions.N]: directions.S,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // curve from N to E
    9: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.E,
        [directions.W]: directions.N
    },
    // curve from W to N
    10: {
        [directions.N]: null,
        [directions.E]: directions.N,
        [directions.S]: directions.W,
        [directions.W]: null
    },
    // straight from W to E
    11: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // crossing
    12: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // T section N, S, W
    13: {
        [directions.N]: null,
        [directions.E]: directions.W,
        [directions.S]: null,
        [directions.W]: null
    },
    // player start
    14: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus S
    17: {
        [directions.N]: directions.S,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus W
    18: {
        [directions.N]: null,
        [directions.E]: directions.W,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus N
    19: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.N,
        [directions.W]: null
    },
    // terminus E
    20: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.E
    }
};

function switchDirection(tile, curr) {
    return dirSwitchMap[tile][curr] || curr;
}

export default ({ map, sprites, devbox }) =>
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
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            direction = switchDirection(data[idx], direction);
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
            sprites.map(sprite => sprite.render());
            const { x, y } = calculateGridCoordinates(map.sx, map.sy);
            const idx = calculateGridIndex(x, y);
            // eslint-disable-next-line no-param-reassign
            devbox.innerHTML = `sx = ${map.sx}; sy: ${map.sy}; x: ${x}; y: ${y}; idx: ${idx}; tile: ${data[idx]}`;
        }
    });
