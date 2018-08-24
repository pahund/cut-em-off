/* global kontra */

import { createLoop } from './loop';
import { createMap } from './map';
import { createPlayer } from './player';
import { createUsers } from './user';
import { createDevbox, createCanvas, loadAssets, createMessageBox } from './utils';
import { createVirus } from './virus';

(async () => {
    createCanvas();
    kontra.init();
    await loadAssets();
    const map = createMap();
    const player = createPlayer(map);
    const virus = createVirus(map);
    const users = createUsers(map);
    const devbox = createDevbox();
    const messageBox = createMessageBox();
    const loop = createLoop({ map, player, virus, users, devbox, messageBox });
    loop.start();
})();
