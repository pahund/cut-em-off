import { ONLINE, OFFLINE } from './index.js';
import { createUser, INFECTED } from './index.js';
import { multiCollides } from '../utils/index.js';
import { pubsub, GAME_OVER } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { pathfinder } from '../pathfinder/index.js';
import { calculateScore } from '../scoreBoard/index.js';
import { viruses } from '../virus/index.js';

export default class {
    constructor({ map }) {
        this.map = map;
        this.users = [];
        this.gameOver = false;
        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                const tile = map.tileAtLayer('main', { row, col });
                if (tile === 7 || tile === 8 || tile === 15 || tile === 16) {
                    this.users.push(createUser({ map, row, col }));
                }
            }
        }
        pubsub.subscribe(GAME_OVER, () => (this.gameOver = true));
    }

    updateOnlineStatus() {
        const allViruses = viruses.getAll();
        if (allViruses.length === 0) {
            return;
        }

        const virusesWithRowAndCol = allViruses.map(virus => ({
            ...virus,
            ...this.map.getRowAndCol({ x: virus.x, y: virus.y })
        }));
        let goneOffline = 0;
        for (const user of this.users.filter(({ status }) => status === ONLINE)) {
            if (virusesWithRowAndCol.filter(virus => pathfinder.isReachable(user, virus)).length === 0) {
                goneOffline++;
                user.status = OFFLINE;
            }
        }
        if (goneOffline > 0) {
            const { online, offline, infected } = this.getStats();
            if (online === 0) {
                messageBox.show(`
                  level completed<br>
                  offline users: ${offline}<br>
                  infected users: ${infected}<br>
                  score: ${calculateScore({ online, offline, infected })}
            `);
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

    infect() {
        const allViruses = viruses.getAll();
        const { users, gameOver } = this;
        const userVirusCollisions = multiCollides(users, allViruses).filter(([user]) => user.status !== INFECTED);
        if (userVirusCollisions.length === 0) {
            return;
        }
        userVirusCollisions.forEach(([user]) => user.infect());
        if (gameOver) {
            return;
        }
        const { online, offline, infected } = this.getStats();
        if (online === 0) {
            messageBox.show(`
              level completed<br>
              offline users: ${offline}<br>
              infected users: ${infected}<br>
              score: ${calculateScore({ online, offline, infected })}
            `);
            pubsub.publish(GAME_OVER);
            return;
        }
        messageBox.flash('user infected!');
    }
}
