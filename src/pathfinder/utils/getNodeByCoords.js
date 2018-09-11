export default (graph, { row, col }) => {
    for (const [node] of graph) {
        if (row === node.row && col === node.col) {
            return node;
        }
    }
    return null;
};
