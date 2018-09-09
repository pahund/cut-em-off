export default (data, start, end) => {
    const costs = {};
    const open = { '0': [start] };
    const predecessors = {};
    let keys;

    function addToOpen(cost, vertex) {
        const key = `${cost}`;
        if (!open[key]) open[key] = [];
        open[key].push(vertex);
    }

    costs[start] = 0;

    while (open) {
        keys = Object.keys(open);
        if (!keys.length) {
            break;
        }

        keys.sort((a, b) => parseFloat(a) - parseFloat(b));

        const key = keys[0];
        const bucket = open[key];
        const node = bucket.shift();
        const currentCost = parseFloat(key);
        const adjacentNodes = data[node] || {};

        if (!bucket.length) delete open[key];

        for (const vertex of Object.keys(adjacentNodes)) {
            const cost = adjacentNodes[vertex];
            const totalCost = cost + currentCost;
            const vertexCost = costs[vertex];

            if (vertexCost === undefined || vertexCost > totalCost) {
                costs[vertex] = totalCost;
                addToOpen(totalCost, vertex);
                predecessors[vertex] = node;
            }
        }
    }

    if (costs[end] === undefined) {
        return null;
    }
    return predecessors;
};
