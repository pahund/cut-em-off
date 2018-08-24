/* global kontra */

import { createLoop } from './loop';
import { createMap } from './map';
import { createPlayer } from './player';
import { createUser } from './user';
import { createDevbox, createCanvas, loadAssets, createMessageBox } from './utils';
import { createVirus } from './virus';

(async () => {
    createCanvas();
    kontra.init();
    await loadAssets();
    const map = createMap();
    const player = createPlayer(map);
    const virus = createVirus(map);
    const user = createUser({ map, row: 6, col: 5 });
    const devbox = createDevbox();
    const messageBox = createMessageBox();
    const loop = createLoop({ map, player, virus, user, devbox, messageBox });
    loop.start();
})();
