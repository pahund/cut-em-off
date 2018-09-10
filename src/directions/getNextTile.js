import { N, E, S, W } from './index.js';
import { tileHeight, tileWidth } from '../config.js';

export default (map, { x, y }, direction) =>
    map.tileAtLayer('main', {
        x: direction === E ? x + tileWidth : direction === W ? x - tileWidth : x,
        y: direction === N ? y - tileHeight : direction === S ? y + tileHeight : y
    });
