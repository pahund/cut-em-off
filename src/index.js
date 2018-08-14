/* global kontra */

import createMap from './createMap';
import createPlayer from './createPlayer';
import createCanvas from './createCanvas';
import createLoop from './createLoop';
import createDevbox from './createDevbox';

const sprites = [];
const devbox = createDevbox();

(async () => {
    createCanvas();
    kontra.init();
    sprites.push(createPlayer());
    const map = await createMap();
    const loop = createLoop({ map, sprites, devbox });
    loop.start();
})();
