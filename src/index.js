/* global kontra */

import createMap from './createMap';

(async () => {
    kontra.init();
    const map = await createMap();
    map.render();
})();
