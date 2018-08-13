import { tileHeight, tileWidth } from './config';

export default (sx, sy) => ({
    x: Math.floor(sx / tileWidth),
    y: Math.floor(sy / tileHeight)
});
