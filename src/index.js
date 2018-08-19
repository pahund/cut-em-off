/* global kontra */

import { createLoop } from './loop';
import { createMap } from './map';
import { createPlayer } from './player';
import { createDevbox, createCanvas, loadAssets } from './utils';
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
