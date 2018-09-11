import { createServer } from './index.js';
import { multiCollides } from '../utils/index.js';
import { messageBox } from '../messageBox/index.js';
import { GAME_OVER, pubsub } from '../pubsub/index.js';
import { viruses } from '../virus/index.js';

class Servers {
    constructor() {
        this.servers = [];
        this.nextServerPointer = 0;
        this.gameOver = false;
        pubsub.subscribe(GAME_OVER, () => (this.gameOver = true));
    }
    init(map, serverCoordinates = []) {
        this.map = map;
        serverCoordinates.forEach(({ col, row }) => this.servers.push(createServer({ map, row, col })));
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
    infect() {
        const allViruses = viruses.getAll();
        const availableServers = this.getAvailableServers();
        const collisions = multiCollides(availableServers, allViruses);

        if (collisions.length === 0) {
            return;
        }

        collisions.forEach(([server]) => {
            /* eslint-disable no-param-reassign */
            server.infected = true;
        });

        if (this.gameOver) {
            return;
        }

        if (this.getAvailableServers().length === 0) {
            messageBox.flash('all servers destroyed or infected – be careful');
            return;
        }

        messageBox.flash('server infected!');
    }
    find({ col, row }) {
        return this.servers.find(server => server.col === col && server.row === row);
    }
    getAvailableServers() {
        return this.servers.filter(server => !(server.broken || server.infected));
    }
    getRandom() {
        const availableServers = this.getAvailableServers();
        return availableServers[Math.floor(Math.random() * availableServers.length)];
    }
    getNext() {
        const availableServers = this.getAvailableServers();
        const isNextPointerInRange = this.nextServerPointer + 1 < availableServers.length;
        this.nextServerPointer = isNextPointerInRange ? this.nextServerPointer + 1 : 0;
        return availableServers[this.nextServerPointer];
    }
    getInfectedServers() {
        return this.servers.filter(server => server.infected);
    }
}

export default new Servers();
