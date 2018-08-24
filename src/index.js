/* global kontra */

import { createCanvas } from './canvas';
import { createDevbox } from './devbox';
import { createLoop } from './loop';
import { createMap } from './map';
import { createMessageBox } from './messageBox';
import { createPlayer } from './player';
import { Pubsub } from './pubsub';
import { Users } from './user';
import { loadAssets } from './utils';
import { createVirus } from './virus';

(async () => {
    const pubsub = new Pubsub();
    createCanvas();
    kontra.init();
    await loadAssets();
    const map = createMap();
    const player = createPlayer(map, pubsub);
    const virus = createVirus(map);
    const users = new Users(map, pubsub);
    const devbox = createDevbox();
    const messageBox = createMessageBox();
    const loop = createLoop({ map, player, virus, users, devbox, messageBox });
    loop.start();
})();
