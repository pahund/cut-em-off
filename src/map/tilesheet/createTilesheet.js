import { tileHeight, tileWidth } from '../../config';
import { drawCurves, drawStraight, drawTSection, drawCrossing, drawServer, drawTerminus } from '.';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = 8 * tileWidth;
    canvas.height = 8 * tileHeight;
    const ctx = canvas.getContext('2d');
    drawCurves(ctx);
    drawStraight({ ctx, row: 1, col: 3, deg: 0 });
    drawStraight({ ctx, row: 2, col: 3, deg: 90 });
    drawTSection({ ctx, row: 1, col: 4, deg: 0 });
    drawTSection({ ctx, row: 1, col: 5, deg: 90 });
    drawTSection({ ctx, row: 1, col: 6, deg: 180 });
    drawTSection({ ctx, row: 2, col: 5, deg: 270 });
    drawCrossing({ ctx, row: 2, col: 4 });
    drawServer({ ctx, row: 2, col: 6 });
    drawTerminus({ ctx, row: 3, col: 1, deg: 0 });
    drawTerminus({ ctx, row: 3, col: 2, deg: 90 });
    drawTerminus({ ctx, row: 3, col: 3, deg: 180 });
    drawTerminus({ ctx, row: 3, col: 4, deg: 270 });
    const image = new Image();
    image.src = canvas.toDataURL('image/png');
    return new Promise(resolve => setTimeout(() => resolve(image)));
};
