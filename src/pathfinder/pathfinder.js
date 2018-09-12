import { findShortestPath, convertMapToGraph, getNodeByCoords } from './utils/index.js';

export class Pathfinder {
    constructor(graph = null) {
        this.graph = graph;
    }

    setDataFromMap(map, layer) {
        this.graph = convertMapToGraph(map, layer);
    }

    getNodeByCoords(coords) {
        return getNodeByCoords(this.graph, coords);
    }

    isReachable(a, b) {
        return findShortestPath(this.graph, [this.getNodeByCoords(a), this.getNodeByCoords(b)]) !== null;
    }
}

export default new Pathfinder();
