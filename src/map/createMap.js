/* global kontra */

import { tileHeight, tileWidth, mapPadding } from '../config.js';
import { calculateCameraCoordinates } from '../utils/index.js';
import { addPadding } from './utils/index.js';
import { createTilesheet } from './tilesheet/index.js';
import { createTileEngine } from '../tileEngine/index.js';

export default async ({ data, width, height, col, row }) => {
    const { sx, sy } = calculateCameraCoordinates({ col, row });
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

    const paddedMap = addPadding(data, width, height, mapPadding);
    const image = await createTilesheet();
    map.addTilesets({ image });
    map.addLayers([
        {
            name: 'main',
            data: paddedMap
        }
    ]);
    return map;
};
