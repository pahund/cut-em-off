/* global kontra */

import { tileWidth, tileHeight, collisionRadius } from '../config.js';
import { drawVirus, updateVirus, Blips } from './index.js';
import { switchDirection } from '../directions/index.js';

export default ({ map, col, row, speed }) => {
    const { x, y } = map.getXAndY({ row, col });
    const blips = new Blips();
    const virus = {
        context: kontra.context,
        x,
        y,
        speed,
        collisionRadius,
        dropped: false,
        map,
        mapX: col * tileWidth,
        mapY: row * tileHeight,
        direction: switchDirection(map, { x, y }, 'S'),
        blips,
        update() {
            try {
                updateVirus(this);
                this.blips.update();
            } catch ({ message }) {
                if (message === 'dropped') {
                    this.dropped = true;
                }
            }
        },
        render() {
            drawVirus(this);
            this.blips.render();
        }
    };
    blips.start(virus);

    return virus;
};
