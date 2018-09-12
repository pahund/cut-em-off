import { createVirus } from './index.js';
import { servers } from '../server/index.js';
import { GAME_OVER, LEVEL_COMPLETED, USERS_POSSIBLY_OFFLINE, pubsub } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';

class Viruses {
    constructor() {
        this.viruses = [];
        this.gameInactive = true;
        const cb = () => (this.gameInactive = true);
        pubsub.subscribe(GAME_OVER, cb, true);
        pubsub.subscribe(LEVEL_COMPLETED, cb, true);
    }
    init(map, virusConfig) {
        this.viruses = [];
        this.gameInactive = false;
        this.map = map;
        this.virusConfig = virusConfig;
    }
    update() {
        this.viruses.forEach(virus => virus.update());
        const activeViruses = this.viruses.filter(virus => !virus.dropped);

        // if virus was dropped, remove it and spawn a fresh one
        if (activeViruses.length < this.viruses.length) {
            setTimeout(() => this.spawn(), 3000);
            messageBox.flash('Nice one! Virus dropped');
            this.viruses = activeViruses;
        }
    }
    render() {
        this.viruses.forEach(virus => virus.render());
    }
    spawn() {
        const server = servers.getRandom();
        if (!server) {
            return;
        }
        const { row, col } = server;
        const { speed, max } = this.virusConfig;
        if (this.viruses.length < max) {
            this.viruses.push(createVirus({ map: this.map, row, col, speed }));
        }
        pubsub.publish(USERS_POSSIBLY_OFFLINE);
    }
    getAll() {
        return this.viruses;
    }
    getAllWithRowAndCol() {
        return this.viruses.map(virus => ({
            ...virus,
            ...this.map.getRowAndCol({ x: virus.x, y: virus.y })
        }));
    }
    startSpawning() {
        const { interval, max } = this.virusConfig;

        const id = setInterval(() => {
            if (this.viruses.length < max) {
                this.spawn();
            } else {
                clearInterval(id);
            }
        }, interval);
    }
}

export default new Viruses();
