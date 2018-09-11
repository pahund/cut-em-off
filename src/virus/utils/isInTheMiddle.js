import { tileHeight, tileWidth } from '../../config.js';

export default ({ mapX, mapY }) => mapX % tileWidth === 0 && mapY % tileHeight === 0;
