/* global kontra */
import { tileHeight, tileWidth } from '../config';

export default sprite => {
    const { context: ctx, x, y } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(
        kontra.assets.images.tilesheet,
        700,
        0,
        tileWidth,
        tileHeight,
        (-1 * tileWidth) / 2,
        (-1 * tileHeight) / 2,
        tileWidth,
        tileHeight
    );
    ctx.restore();
};
