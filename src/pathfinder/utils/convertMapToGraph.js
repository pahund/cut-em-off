import { directionSwitchMap, N, S, W, E } from '../../directions';

function initGraphAndAllowed(layerData, width) {
    const graph = new Map();
    const allowed = new Map();
    let row = 1;
    let col = 1;
    let index = 0;
    for (const tile of layerData) {
        if (tile !== 0) {
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
}

function getNodeByCoords(graph, { row, col }) {
    for (const [node] of graph) {
        if (row === node.row && col === node.col) {
            return node;
        }
    }
    return null;
}

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
