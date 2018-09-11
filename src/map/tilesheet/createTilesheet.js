import { tileHeight, tileWidth } from '../../config.js';
import { drawCurve, drawStraight, drawTSection, drawCrossing, drawTerminus } from './index.js';

// will be removed by tree shaking
import drawDebugGrid from './drawDebugGrid.js';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = 8 * tileWidth;
    canvas.height = 8 * tileHeight;
    const ctx = canvas.getContext('2d');
    drawCurve({ ctx, row: 1, col: 1, deg: 0 });
    drawCurve({ ctx, row: 1, col: 2, deg: 90 });
    drawCurve({ ctx, row: 2, col: 1, deg: 270 });
    drawCurve({ ctx, row: 2, col: 2, deg: 180 });
    drawStraight({ ctx, row: 1, col: 3, deg: 0 });
    drawStraight({ ctx, row: 2, col: 3, deg: 90 });
    drawTSection({ ctx, row: 1, col: 4, deg: 0 });
    drawTSection({ ctx, row: 1, col: 5, deg: 90 });
    drawTSection({ ctx, row: 1, col: 6, deg: 180 });
    drawTSection({ ctx, row: 2, col: 5, deg: 270 });
    drawCrossing({ ctx, row: 2, col: 4 });
    drawTerminus({ ctx, row: 3, col: 1, deg: 0 });
    drawTerminus({ ctx, row: 3, col: 2, deg: 90 });
    drawTerminus({ ctx, row: 3, col: 3, deg: 180 });
    drawTerminus({ ctx, row: 3, col: 4, deg: 270 });
    drawCurve({ ctx, row: 4, col: 1, deg: 0, broken: true });
    drawCurve({ ctx, row: 4, col: 2, deg: 90, broken: true });
    drawCurve({ ctx, row: 5, col: 1, deg: 270, broken: true });
    drawCurve({ ctx, row: 5, col: 2, deg: 180, broken: true });
    drawStraight({ ctx, row: 4, col: 3, deg: 0, broken: true });
    drawStraight({ ctx, row: 5, col: 3, deg: 90, broken: true });
    drawTSection({ ctx, row: 4, col: 4, deg: 0, broken: true });
    drawTSection({ ctx, row: 4, col: 5, deg: 90, broken: true });
    drawTSection({ ctx, row: 4, col: 6, deg: 180, broken: true });
    drawTSection({ ctx, row: 5, col: 5, deg: 270, broken: true });
    drawCrossing({ ctx, row: 5, col: 4, broken: true });
    drawTerminus({ ctx, row: 6, col: 1, deg: 0, broken: true });
    drawTerminus({ ctx, row: 6, col: 2, deg: 90, broken: true });
    drawTerminus({ ctx, row: 6, col: 3, deg: 180, broken: true });
    drawTerminus({ ctx, row: 6, col: 4, deg: 270, broken: true });

    if (process.env.NODE_ENV === 'development') {
        drawDebugGrid({ ctx, row: 1, col: 8 });
    }

    const image = new Image();
    image.src = canvas.toDataURL('image/png');
    // document.getElementById('wrapper').appendChild(image);
    return new Promise(resolve => setTimeout(() => resolve(image), 100));
};
