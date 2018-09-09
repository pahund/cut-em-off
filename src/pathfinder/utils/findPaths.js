export default (data, start, end) => {
    const costs = new Map([[start, 0]]);
    const open = new Map([[0, [start]]]);
    const predecessors = new Map();

    function addToOpen(cost, vertex) {
        let vertices = open.get(cost);
        if (!vertices) {
            vertices = [];
            open.set(cost, vertices);
        }
        vertices.push(vertex);
    }

    while (open.size > 0) {
        const currentCost = Array.from(open.keys()).sort((a, b) => a - b)[0];

        const bucket = open.get(currentCost);
        const node = bucket.shift();
        const adjacentNodes = data.get(node) || new Map();

        if (bucket.length === 0) {
            open.delete(currentCost);
        }

        for (const [vertex, cost] of adjacentNodes) {
            const totalCost = cost + currentCost;
            const vertexCost = costs.get(vertex);

            if (vertexCost === undefined || vertexCost > totalCost) {
                costs.set(vertex, totalCost);
                addToOpen(totalCost, vertex);
                predecessors.set(vertex, node);
            }
        }
    }

    return costs.get(end) === undefined ? null : predecessors;
};
