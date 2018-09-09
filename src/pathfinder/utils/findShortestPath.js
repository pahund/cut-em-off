import { findPaths, extractShortest } from '.';

export default (data, nodes) => {
    let start = nodes.shift();
    const path = [];
    let end, predecessors, shortest;

    while (nodes.length) {
        end = nodes.shift();
        predecessors = findPaths(data, start, end);

        if (predecessors) {
            shortest = extractShortest(predecessors, end);
            if (nodes.length) {
                path.push.apply(path, shortest.slice(0, -1));
            } else {
                return path.concat(shortest);
            }
        } else {
            return null;
        }

        start = end;
    }
    return null;
};
