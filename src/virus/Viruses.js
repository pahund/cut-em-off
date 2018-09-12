import { createVirus } from './index.js';
import { servers } from '../server/index.js';
import { GAME_OVER, pubsub } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';

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
        this.viruses = this.viruses.filter(virus => {
            try {
                virus.update();
                return true;
            } catch ({ message }) {
                if (message === 'dropped') {
                    setTimeout(this.spawn, 3000);
                    messageBox.flash('Nice one! Virus dropped');
                }
            }
            return false;
        });
    }
    render() {
        this.viruses.forEach(virus => virus.render());
    }
    spawn() {
        const { row, col } = servers.getRandom();
        const { speed, max } = this.virusConfig;
        if (this.viruses.length < max) {
            this.viruses.push(createVirus({ map: this.map, row, col, speed }));
        }
    }
    getAll() {
        return this.viruses;
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
