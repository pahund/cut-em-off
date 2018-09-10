import { createUser, INFECTED } from './index.js';
import { multiCollides, calculateRowAndCol } from '../utils/index.js';
import { allInfected } from './utils/index.js';
import { pubsub, GAME_OVER } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { pathfinder } from '../pathfinder/index.js';
import { mapPaddingX, mapPaddingY } from '../config.js';

export default class {
    constructor(map) {
        this.map = map;
        this.users = [];
        this.gameOver = false;
        for (let row = 1; row <= map.height; row++) {
            for (let col = 1; col <= map.width; col++) {
                const tile = map.tileAtLayer('main', { row, col });
                if (tile >= 17 && tile <= 20) {
                    this.users.push(createUser({ map, row: row - mapPaddingY + 1, col: col - mapPaddingX + 1 }));
                }
            }
        }
        pubsub.subscribe(GAME_OVER, () => (this.gameOver = true));
    }

    updateOnlineStatus(...viruses) {
        const virusesWithRowAndCol = viruses.map(virus => ({
            ...virus,
            ...calculateRowAndCol({ sx: virus.mapX, sy: virus.mapY })
        }));
        for (const user of this.users) {
            for (const virus of virusesWithRowAndCol) {
                const path = pathfinder.findShortestPathByCoords(user, virus);
                console.log(`[PH_LOG] path\n${JSON.stringify(path, null, 4)}`); // PH_TODO
            }
        }
    }

    update() {
        this.users.forEach(user => user.update());
    }
    render() {
        this.users.forEach(user => user.render());
    }
    infect(...viruses) {
        const { users, gameOver } = this;
        const userVirusCollisions = multiCollides(users, viruses).filter(([user]) => user.status !== INFECTED);
        if (userVirusCollisions.length === 0) {
            return;
        }
        userVirusCollisions.forEach(([user]) => user.infect());
        if (gameOver) {
            return;
        }
        if (allInfected(users)) {
            messageBox.show('all users infected<br>game over');
            pubsub.publish(GAME_OVER);
            return;
        }
        messageBox.flash('user infected!');
    }
}
