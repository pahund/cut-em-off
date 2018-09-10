import { N, E, S, W } from '../../directions/index.js';

export default ({ viable, visits, row, col }) => {
    let minVis = Number.MAX_SAFE_INTEGER;
    return viable
        .map(dir => {
            let vis;
            switch (dir) {
                case N:
                    vis = visits[row - 2][col - 1];
                    break;
                case E:
                    vis = visits[row - 1][col];
                    break;
                case S:
                    vis = visits[row][col - 1];
                    break;
                case W:
                    vis = visits[row - 1][col - 2];
                    break;
                default:
            }
            minVis = vis < minVis ? vis : minVis;
            return { dir, vis };
        })
        .filter(({ vis }) => vis === minVis)
        .map(({ dir }) => dir);
};
