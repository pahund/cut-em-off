import { tileHeight, tileWidth } from './config';

export default (x, y) => ({
    sx: x * tileWidth + tileWidth / 2,
    sy: y * tileHeight + tileHeight / 2
});
