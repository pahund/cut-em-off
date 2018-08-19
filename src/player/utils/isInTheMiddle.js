import { tileHeight, tileWidth } from '../../config';

export default ({ x, y }) => (x - tileWidth / 2) % tileWidth === 0 && (y - tileHeight / 2) % tileHeight === 0;
