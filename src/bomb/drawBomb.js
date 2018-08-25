import { EXPLODING, FUSE_BURNING } from './constants';
import { drawBombWithFuse } from '.';

export default sprite => {
    const { status, shrapnel } = sprite;
    switch (status) {
        case FUSE_BURNING:
            drawBombWithFuse(sprite);
            break;
        case EXPLODING:
            shrapnel.forEach(s => s.render());
            break;
        default:
    }
};
