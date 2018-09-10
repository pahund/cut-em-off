import { directionSwitchMap } from '../../directions/index.js';
import { isValidTile } from '../../utils/index.js';

export default (layerData, width) => {
    const graph = new Map();
    const allowed = new Map();
    let row = 1;
    let col = 1;
    let index = 0;
    for (const tile of layerData) {
        if (isValidTile(tile)) {
            const node = { row, col };
            allowed.set(node, directionSwitchMap[tile].allowed);
            graph.set(node, new Map());
        }
        if (++index % width === 0) {
            row++;
            col = 1;
        } else {
            col++;
        }
    }
    return { graph, allowed };
};
