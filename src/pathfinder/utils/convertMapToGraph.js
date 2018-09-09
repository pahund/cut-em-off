import { getNodeByCoords, initGraphAndAllowed } from '.';
import { N, S, W, E } from '../../directions';

export default ({ width, layers }, layer) => {
    const { graph, allowed } = initGraphAndAllowed(layers[layer].data, width);
    for (const [node, adjacent] of graph) {
        const currAllowed = allowed.get(node);
        const { row, col } = node;
        for (const dir of currAllowed) {
            switch (dir) {
                case N:
                    adjacent.set(getNodeByCoords(graph, { row: row - 1, col }), 1);
                    break;
                case E:
                    adjacent.set(getNodeByCoords(graph, { row, col: col + 1 }), 1);
                    break;
                case S:
                    adjacent.set(getNodeByCoords(graph, { row: row + 1, col }), 1);
                    break;
                case W:
                    adjacent.set(getNodeByCoords(graph, { row, col: col - 1 }), 1);
                    break;
                default:
            }
        }
    }
    return graph;
};
