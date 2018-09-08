import { pubsub, DROP_BOMB } from '../pubsub';
import { EXPLODED } from './constants';
import { createBomb } from '.';

export default class {
    constructor(map) {
        this.map = map;
        this.bombs = [];
        pubsub.subscribe(DROP_BOMB, mapCoords => this.dropBomb(mapCoords));
    }
    dropBomb(mapCoords) {
        if (
            this.bombs.length > 0 &&
            this.bombs.find(({ col, row }) => col === mapCoords.col && row === mapCoords.row)
        ) {
            // don't drop a bomb where there already is one waiting to explode
            return;
        }
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
