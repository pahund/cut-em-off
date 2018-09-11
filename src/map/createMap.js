/* global kontra */

import {
    tileHeight,
    tileWidth,
    mapHeight as height,
    mapWidth as width,
    mapPadding,
    playerStartCol,
    playerStartRow
} from '../config.js';
import { calculateCameraCoordinates } from '../utils/index.js';
import mapData from './mapData.js';
import { addPadding } from './utils/index.js';
import { createTilesheet } from './tilesheet/index.js';
import { createTileEngine } from '../tileEngine/index.js';

export default async () => {
    const { sx, sy } = calculateCameraCoordinates({ col: playerStartCol, row: playerStartRow });
    const map = createTileEngine({
        // tile size
        tileWidth,
        tileHeight,

        // map size in tiles
        width: width + mapPadding * 2,
        height: height + mapPadding * 2,

        sx,
        sy
    });

    const paddedMap = addPadding(mapData, width, height, mapPadding);
    const image = await createTilesheet();
    map.addTilesets({ image });
    // map.addTilesets({ image: kontra.assets.images.tilesheet });
    map.addLayers([
        {
            name: 'main',
            data: paddedMap
        }
        // {
        //     name: 'debug',
        //     data: new Array(paddedMap.length).fill(0)
        // }
        // {
        //     name: 'grid',
        //     data: new Array(paddedMap.length).fill(8)
        // }
    ]);
    return map;
};
