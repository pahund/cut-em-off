/* global kontra */

import { createCanvas } from './canvas';
import { createLoop } from './loop';
import { createMap } from './map';
import { createMessageBox } from './messageBox';
import { createPlayer } from './player';
import { Users } from './user';
import { createVirus } from './virus';
import { Bombs } from './bomb';

if (process.env.NODE_ENV === 'development') {
    require('./devbox/createDevbox').default();
}

(async () => {
    createCanvas();
    kontra.init();
    const map = await createMap();
    const player = createPlayer(map);
    const virus = createVirus(map);
    const bombs = new Bombs(map);
    const users = new Users(map);
    const messageBox = createMessageBox();
    const loop = createLoop({ map, player, virus, users, messageBox, bombs });
    loop.start();
})();
