import { tileHeight, tileWidth } from './config';

export default (sx, sy) => (sx - tileWidth / 2) % tileWidth === 0 && (sy - tileHeight / 2) % tileHeight === 0;
