/* global kontra */

import { createCanvas } from './canvas/index.js';
import initScoreBoard from './scoreBoard/index.js';
import { createLoop } from './loop/index.js';
import { createMap } from './map/index.js';
import { createPlayer } from './player/index.js';
import { Users } from './user/index.js';
import { createVirus } from './virus/index.js';
import { Bombs } from './bomb/index.js';
import { initPathfinder } from './pathfinder/index.js';
import { pubsub, USERS_POSSIBLY_OFFLINE } from './pubsub/index.js';
import { initAudio } from './audio/index.js';

// will be removed by tree shaking
import createDevbox from './devbox/createDevbox.js';
if (process.env.NODE_ENV === 'development') {
    createDevbox();
}

(async () => {
    createCanvas();
    kontra.init();
    const map = await createMap();
    initPathfinder(map);
    const player = createPlayer(map);
    const virus = createVirus(map);
    const bombs = new Bombs(map);
    const users = new Users(map);
    initScoreBoard({ users, map });
    pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => users.updateOnlineStatus(virus));
    const loop = createLoop({ map, player, virus, users, bombs });
    initAudio();
    loop.start();
})();
