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

    findShortestPath(...args) {
        if (process.env.NODE_ENV === 'development' && !this.graph) {
            throw new Error('You forgot to set a graph for the pathfinder before trying to use it to find a path');
        }
        return findShortestPath(this.graph, args);
    }

    isReachable(a, b) {
        const shortestPath = this.findShortestPathByCoords(a, b);
        return shortestPath !== null;
    }

    findShortestPathByCoords(...args) {
        return this.findShortestPath(...args.map(coords => this.getNodeByCoords(coords)));
    }
}

export default new Pathfinder();
