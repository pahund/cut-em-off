/* global kontra */

import addPadding from './addPadding';
import calculateCameraCoordinates from './calculateCameraCoordinates';
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
import loadImage from './loadImage';
import data from './map';

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

    const paddedMap = addPadding(data, width, height, mapPaddingX, mapPaddingY);
    map.addTilesets({ image });
    map.addLayers({
        name: 'main',
        data: paddedMap
    });
    return map;
};
