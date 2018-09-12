import { createVirus } from './index.js';
import { servers } from '../server/index.js';
import { GAME_OVER, pubsub } from '../pubsub/index.js';

class Viruses {
    constructor() {
        this.viruses = [];
        this.gameOver = false;
        pubsub.subscribe(GAME_OVER, () => (this.gameOver = true));
    }
    init(map, virusConfig) {
        this.map = map;
        this.virusConfig = virusConfig;
    }
    update() {
        this.viruses.forEach(virus => virus.update());
    }
    render() {
        this.viruses.forEach(virus => virus.render());
    }
    spawn() {
        const { row, col } = servers.getRandom();
        const { speed } = this.virusConfig;
        this.viruses.push(createVirus({ map: this.map, row, col, speed }));
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
