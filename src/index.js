/* global kontra */

import createCanvas from './createCanvas';
import createDevbox from './createDevbox';
import createLoop from './createLoop';
import createMap from './createMap';
import createPlayer from './createPlayer';
import createVirus from './createVirus';
import loadAssets from './loadAssets';
import calculateVirusCoordinates from './calculateVirusCoordinates';
import { virusStartCol, virusStartRow } from './config';

(async () => {
    createCanvas();
    kontra.init();
    await loadAssets();
    const map = createMap();
    const player = createPlayer();
    const { x, y } = calculateVirusCoordinates(map, { row: virusStartRow, col: virusStartCol });
    const virus = createVirus({ x, y });
    const devbox = createDevbox();
    const loop = createLoop({ map, player, virus, devbox });
    loop.start();
})();
