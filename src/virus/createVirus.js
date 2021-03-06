/* global kontra */

import { tileWidth, tileHeight, collisionRadius } from '../config.js';
import { drawVirus, updateVirus, Blips } from './index.js';
import { switchDirection } from '../directions/index.js';

export default ({ map, col, row, speed }) => {
    const { x, y } = map.getXAndY({ row, col });
    const blips = new Blips();
    const virus = {
        context: kontra.context,
        visits: Array(map.height)
            .fill()
            .map(() => Array(map.width).fill(0)),
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
                ({ x: this.x, y: this.y, mapX: this.mapX, mapY: this.mapY, direction: this.direction } = updateVirus(
                    this
                ));
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
