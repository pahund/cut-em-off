import { createServer } from './index.js';

class Servers {
    constructor() {
        this.servers = [];
    }
    init(map, serverCoordinates = []) {
        this.map = map;
        serverCoordinates.forEach(({ col, row }) => this.servers.push(createServer({ map, row, col })));
        return this;
    }
    update() {
        this.servers.forEach(server => server.update());
    }
    render() {
        this.servers.forEach(server => server.render());
    }
    destroy({ col, row }) {
        const server = this.find({ col, row });
        if (server) {
            server.broken = true;
        }
    }
    find({ col, row }) {
        return this.servers.find(server => server.col === col && server.row === row);
    }
    getRandom() {
        const availableServers = this.servers.filter(server => !server.broken);
        return availableServers[0]; // TODO random
    }
}

export default new Servers();
