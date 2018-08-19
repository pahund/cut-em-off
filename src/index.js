/* global kontra */

import createCanvas from './createCanvas';
import createDevbox from './createDevbox';
import loadAssets from './loadAssets';
import { createLoop } from './loop';
import { createMap } from './map';
import { createPlayer } from './player';
import { createVirus } from './virus';

(async () => {
    createCanvas();
    kontra.init();
    await loadAssets();
    const map = createMap();
    const player = createPlayer(map);
    const virus = createVirus(map);
    const devbox = createDevbox();
    const loop = createLoop({ map, player, virus, devbox });
    loop.start();
})();
