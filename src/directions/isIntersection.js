import { directionSwitchMap } from './index.js';

const intersectionTiles = [];
for (const [tile, { allowed }] of Object.entries(directionSwitchMap)) {
    if (allowed.length > 2) {
        intersectionTiles.push(Number(tile));
    }
}

export default tile => intersectionTiles.includes(tile);
