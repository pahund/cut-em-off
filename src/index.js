/* global kontra */

import createCanvas from './createCanvas';
import createDevbox from './createDevbox';
import createLoop from './createLoop';
import createMap from './createMap';
import createPlayer from './createPlayer';
import createVirus from './createVirus';

(async () => {
    createCanvas();
    kontra.init();
    const map = await createMap();
    const player = createPlayer();
    const virus = createVirus();
    const devbox = createDevbox();
    const loop = createLoop({ map, player, virus, devbox });
    loop.start();
})();
