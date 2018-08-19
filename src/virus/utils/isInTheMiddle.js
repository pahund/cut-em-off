import { tileHeight, tileWidth } from '../../config';

export default ({ mapX, mapY }) => mapX % tileWidth === 0 && mapY % tileHeight === 0;
