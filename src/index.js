/* global kontra */

import { createCanvas } from './canvas';
import { createLoop } from './loop';
import { createMap } from './map';
import { createMessageBox } from './messageBox';
import { createPlayer } from './player';
import { Pubsub } from './pubsub';
import { Users } from './user';
import { createVirus } from './virus';
import { Bombs } from './bomb';

if (process.env.NODE_ENV === 'development') {
    require('./devbox/createDevbox').default();
}

(async () => {
    const pubsub = new Pubsub();
    createCanvas();
    kontra.init();
    const map = await createMap();
    const player = createPlayer(map, pubsub);
    const virus = createVirus(map);
    const bombs = new Bombs(map, pubsub);
    const users = new Users(map, pubsub);
    const messageBox = createMessageBox(pubsub);
    const loop = createLoop({ map, player, virus, users, messageBox, bombs, pubsub });
    loop.start();
})();
