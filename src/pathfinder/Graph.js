import { findShortestPath } from './utils';

export default class {
    constructor(data) {
        this.data = data;
    }

    findShortestPath(...args) {
        return findShortestPath(this.data, args);
    }
}
