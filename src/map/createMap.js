/* global kontra */

import {
    tileHeight,
    tileWidth,
    mapHeight as height,
    mapWidth as width,
    mapPaddingX,
    mapPaddingY,
    playerStartCol,
    playerStartRow
} from '../config';
import { calculateCameraCoordinates } from '../utils';
import mapData from './mapData';
import { addPadding } from './utils';
import { createTilesheet } from './tilesheet';
import { createTileEngine } from '../tileEngine';

export default async () => {
    const { sx, sy } = calculateCameraCoordinates({ col: playerStartCol, row: playerStartRow });
    const map = createTileEngine({
        // tile size
        tileWidth,
        tileHeight,

        // map size in tiles
        width: width + mapPaddingX * 2,
        height: height + mapPaddingY * 2,

        sx,
        sy
    });

    const paddedMap = addPadding(mapData, width, height, mapPaddingX, mapPaddingY);
    const image = await createTilesheet();
    map.addTilesets({ image });
    // map.addTilesets({ image: kontra.assets.images.tilesheet });
    map.addLayers([
        {
            name: 'main',
            data: paddedMap
        }
        // {
        //     name: 'grid',
        //     data: new Array(paddedMap.length).fill(15)
        // }
    ]);
    return map;
};
