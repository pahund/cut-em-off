/* global kontra */

import { tileHeight, virusBlipTtl } from '../config.js';
import { drawBlip } from './index.js';

export default ({ x, y }) => ({
    context: kontra.context,
    x,
    y,
    ttl: virusBlipTtl,
    radius: tileHeight,
    update() {
        this.radius += 10;
        this.ttl--;
    },
    render() {
        drawBlip(this);
    }
});
