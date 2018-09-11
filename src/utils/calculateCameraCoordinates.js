import { tileHeight, tileWidth, canvasWidth, canvasHeight } from '../config.js';

export default ({ col, row }) => ({
    sx: col * tileWidth - canvasWidth / 2 + tileWidth / 2,
    sy: row * tileHeight - canvasHeight / 2 + tileHeight / 2
});
