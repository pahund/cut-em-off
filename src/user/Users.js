import { ONLINE, OFFLINE } from './index.js';
import { createUser, INFECTED } from './index.js';
import { multiCollides } from '../utils/index.js';
import { pubsub, GAME_OVER, LEVEL_COMPLETED } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { pathfinder } from '../pathfinder/index.js';
import { calculateScore } from '../scoreBoard/index.js';
import { viruses } from '../virus/index.js';

class Users {
    constructor() {
        const cb = () => {
            this.gameInactive = true;
            this.users = [];
        };
        cb();
        pubsub.subscribe(GAME_OVER, cb, true);
        pubsub.subscribe(LEVEL_COMPLETED, cb, true);
    }

    init(map) {
        this.map = map;
        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                const tile = map.tileAtLayer('main', { row, col });
                if (tile === 7 || tile === 8 || tile === 15 || tile === 16) {
                    this.users.push(createUser({ map, row, col }));
                }
            }
        }
    }

    updateOnlineStatus() {
        const virusesWithRowAndCol = viruses.getAllWithRowAndCol();
        if (virusesWithRowAndCol.length === 0) {
            return;
        }

        let goneOffline = 0;
        for (const user of this.getOnlineUsers()) {
            if (virusesWithRowAndCol.filter(virus => pathfinder.isReachable(user, virus)).length === 0) {
                goneOffline++;
                user.status = OFFLINE;
            }
        }
        if (goneOffline > 0) {
            const ended = this.endLevelOrGame();
            if (!ended) {
                messageBox.flash(`${goneOffline} users went offline<br>good job!`);
            }
        }
    }

    endLevelOrGame() {
        const { online, offline, infected } = this.getStats();
        if (online > 0) {
            return false;
        }
        const score = calculateScore({ online, offline, infected });
        if (infected < offline) {
            messageBox.show(
                'level completed<br>' +
                    `offline users: ${offline}<br>` +
                    `infected users: ${infected}<br>` +
                    `score: ${score}`
            );
            pubsub.publish(LEVEL_COMPLETED);
            return true;
        }
        messageBox.show(
            'game over – too many infected users!<br>' +
                `offline users: ${offline}<br>` +
                `infected users: ${infected}<br>` +
                `score: ${score}`
        );
        pubsub.publish(GAME_OVER);
        return true;
    }

    getOnlineUsers() {
        return this.users.filter(({ status }) => status === ONLINE);
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
        const { users, gameInactive } = this;
        const userVirusCollisions = multiCollides(users, allViruses).filter(([user]) => user.status !== INFECTED);
        if (userVirusCollisions.length === 0) {
            return;
        }
        userVirusCollisions.forEach(([user]) => user.infect());
        if (gameInactive) {
            return;
        }
        const ended = this.endLevelOrGame();
        if (!ended) {
            messageBox.flash('user infected!');
        }
    }

    infectAllReachable(someViruses) {
        if (someViruses.length === 0) {
            return;
        }

        const allOnlineUsers = this.getOnlineUsers();

        someViruses.forEach(virus => {
            allOnlineUsers.forEach(user => {
                if (pathfinder.isReachable(user, virus)) {
                    user.infect();
                }
            });
        });

        this.endLevelOrGame();
    }
}

export default new Users();
