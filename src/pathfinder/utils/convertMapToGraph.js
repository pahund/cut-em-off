import { getNodeByCoords, initGraphAndAllowed } from './index.js';
import { N, S, W, E } from '../../directions/index.js';

export default ({ width, layers }, layer) => {
    const { graph, allowed } = initGraphAndAllowed(layers[layer].data, width);
    for (const [node, adjacent] of graph) {
        const currAllowed = allowed.get(node);
        const { row, col } = node;
        let target;
        for (const dir of currAllowed) {
            switch (dir) {
                case N:
                    target = getNodeByCoords(graph, { row: row - 1, col });
                    if (target) {
                        adjacent.set(target, 1);
                    }
                    break;
                case E:
                    target = getNodeByCoords(graph, { row, col: col + 1 });
                    if (target) {
                        adjacent.set(target, 1);
                    }
                    break;
                case S:
                    target = getNodeByCoords(graph, { row: row + 1, col });
                    if (target) {
                        adjacent.set(target, 1);
                    }
                    break;
                case W:
                    target = getNodeByCoords(graph, { row, col: col - 1 });
                    if (target) {
                        adjacent.set(target, 1);
                    }
                    break;
                default:
            }
        }
    }
    return graph;
};
