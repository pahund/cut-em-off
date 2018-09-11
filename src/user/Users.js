import { ONLINE, OFFLINE } from './index.js';
import { createUser, INFECTED } from './index.js';
import { multiCollides } from '../utils/index.js';
import { pubsub, GAME_OVER } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { pathfinder } from '../pathfinder/index.js';

export default class {
    constructor({ map, positions }) {
        this.map = map;
        this.users = [];
        this.gameOver = false;
        for (const { row, col } of positions) {
            this.users.push(createUser({ map, row, col }));
        }
        pubsub.subscribe(GAME_OVER, () => (this.gameOver = true));
    }

    updateOnlineStatus(...viruses) {
        const virusesWithRowAndCol = viruses.map(virus => ({
            ...virus,
            ...this.map.getRowAndCol({ x: virus.x, y: virus.y })
        }));
        let goneOffline = 0;
        for (const user of this.users.filter(({ status }) => status === ONLINE)) {
            for (const virus of virusesWithRowAndCol) {
                const isReachable = pathfinder.isReachable(user, virus);
                if (!isReachable) {
                    goneOffline++;
                    user.status = OFFLINE;
                }
            }
        }
        if (goneOffline > 0) {
            const { online, offline, infected } = this.getStats();
            if (online === 0) {
                messageBox.show(`level completed<br>offline users: ${offline}<br>infected users: ${infected}`);
                pubsub.publish(GAME_OVER);
            } else {
                messageBox.flash(`${offline} users went offline<br>good job!`);
            }
        }
    }

    getStats() {
        return this.users.reduce(
            (acc, { status }) => ({
                online: acc.online + (status === ONLINE ? 1 : 0),
                offline: acc.offline + (status === OFFLINE ? 1 : 0),
                infected: acc.infected + (status === INFECTED ? 1 : 0)
            }),
            { online: 0, offline: 0, infected: 0 }
        );
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
        const { online, offline, infected } = this.getStats();
        if (online === 0) {
            messageBox.show(`level completed<br>offline users: ${offline}<br>infected users: ${infected}`);
            pubsub.publish(GAME_OVER);
            return;
        }
        messageBox.flash('user infected!');
    }
}
