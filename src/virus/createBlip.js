/* global kontra */

import { tileHeight, virusBlipTtl } from '../config';
import { drawBlip } from '.';

export default ({ x, y }) =>
    kontra.sprite({
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
