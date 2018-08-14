/* global kontra */

import createMap from './createMap';
import createPlayer from './createPlayer';
import createCanvas from './createCanvas';
import createLoop from './createLoop';
import createDevbox from './createDevbox';


(async () => {
    createCanvas();
    kontra.init();
    const map = await createMap();
    const player = createPlayer();
    const devbox = createDevbox();
    const loop = createLoop({ map, player, devbox });
    loop.start();
})();
