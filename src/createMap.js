/* global kontra */

import loadImage from './loadImage';
import data from './map';
import {
    tileHeight,
    tileWidth,
    mapHeight as height,
    mapWidth as width,
    mapPaddingX,
    mapPaddingY,
    startX,
    startY
} from './config';
import addPadding from './addPadding';
import calculateCameraCoordinates from './calculateCameraCoordinates';

export default async () => {
    const { sx, sy } = calculateCameraCoordinates(startX, startY);
    const map = kontra.tileEngine({
        // tile size
        tileWidth,
        tileHeight,

        // map size in tiles
        width: width + mapPaddingX * 2,
        height: height + mapPaddingY * 2,

        sx,
        sy
    });

    const image = await loadImage('tilesheet.png');

    map.addTilesets({ image });
    map.addLayers({
        name: 'main',
        data: addPadding(data, width, height, mapPaddingX, mapPaddingY)
    });

    return map;
};
