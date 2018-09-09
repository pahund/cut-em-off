import { findShortestPath, convertMapToGraph, getNodeByCoords } from './utils';

export default class {
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
}
