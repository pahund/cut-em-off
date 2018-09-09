export default (predecessors, end) => {
    const nodes = [];
    let u = end;

    while (u !== undefined) {
        nodes.push(u);
        u = predecessors[u];
    }

    nodes.reverse();
    return nodes;
};
