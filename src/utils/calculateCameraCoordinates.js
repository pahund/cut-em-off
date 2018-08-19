import { tileHeight, tileWidth } from '../config';

export default ({ col, row }) => ({
    sx: (col - 1) * tileWidth + tileWidth / 2,
    sy: (row - 1) * tileHeight + tileHeight / 2
});
