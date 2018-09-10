import { tileHeight as defaultTileHeight, tileWidth as defaultTileWidth } from '../config';

export default ({ sx, sy, tileWidth = defaultTileWidth, tileHeight = defaultTileHeight }) => ({
    col: Math.floor(sx / tileWidth) + 1,
    row: Math.floor(sy / tileHeight) + 1
});
