/* global kontra */

import loadImage from './loadImage';
import data from './map';

export default async () => {
    const map = kontra.tileEngine({
        // tile size
        tileWidth: 100,
        tileHeight: 100,

        // map size in tiles
        width: 28,
        height: 26,

        sx: 2000,
        sy: 2000
    });

    const image = await loadImage('tilesheet.png');

    map.addTilesets({ image });
    map.addLayers({
        name: 'main',
        data
    });

    return map;
};
