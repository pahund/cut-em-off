import { DROP_BOMB } from '../pubsub';
import { EXPLODED } from './constants';
import { createBomb } from '.';

export default class {
    constructor(map, pubsub) {
        this.map = map;
        this.pubsub = pubsub;
        this.bombs = [];
        this.pubsub.subscribe(DROP_BOMB, mapCoords => this.dropBomb(mapCoords));
    }
    dropBomb(mapCoords) {
        this.bombs.push(createBomb(this.map, mapCoords));
    }
    update() {
        this.bombs = this.bombs.filter(bomb => {
            bomb.update();
            return bomb.status !== EXPLODED;
        });
    }
    render() {
        this.bombs.forEach(bomb => bomb.render());
    }
}