/* global kontra */
import { tileHeight, tileWidth } from '../config';
import { ONLINE, OFFLINE, INFECTED } from './constants';

const spriteMapping = {
    [ONLINE]: { sx: 600, sy: 0 },
    [OFFLINE]: { sx: 600, sy: 0 },
    [INFECTED]: { sx: 700, sy: 100 }
};

export default sprite => {
    const { context: ctx, x, y, status } = sprite;
    const { sx, sy } = spriteMapping[status];
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(
        kontra.assets.images.tilesheet,
        sx,
        sy,
        tileWidth,
        tileHeight,
        (-1 * tileWidth) / 2,
        (-1 * tileHeight) / 2,
        tileWidth,
        tileHeight
    );
    ctx.restore();
};
