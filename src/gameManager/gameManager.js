/* global kontra */

import { initAudio } from '../audio/index.js';
import { Bombs } from '../bomb/index.js';
import { createLoop } from '../loop/index.js';
import { createMap } from '../map/index.js';
import { createPlayer } from '../player/index.js';
import { users } from '../user/index.js';
import { viruses } from '../virus/index.js';
import { createCanvas } from '../canvas/index.js';
import { initPathfinder, pathfinder } from '../pathfinder/index.js';
import { pubsub, USERS_POSSIBLY_OFFLINE, LEVEL_COMPLETED } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { servers } from '../server/index.js';
import getLevel from '../level/getLevel.js';
import createScoreBoard from '../scoreBoard/createScoreBoard.js';
import initScoreBoard from '../scoreBoard/index.js';
import showStartScreen from './showStartScreen.js';
import pressAnyKey from './pressAnyKey.js';

class GameManager {
    constructor() {
        createCanvas();
        kontra.init();
        initPathfinder();
        initAudio();
        this.scoreBoard = createScoreBoard();
        pubsub.subscribe(
            LEVEL_COMPLETED,
            async () => {
                pubsub.reset();
                this.loop.stop();
                await pressAnyKey();
                messageBox.clear();
                this.levelIndex++;
                await this.initLevel();
                this.startLevel();
            },
            true
        );
    }
    async startGame() {
        this.levelIndex = 0;
        await this.initLevel();
        await showStartScreen();
        this.startLevel();
    }

    async initLevel() {
        const level = getLevel(this.levelIndex);
        const map = await createMap({ ...level.map, col: level.player.col, row: level.player.row });
        this.player = createPlayer({ map, ...level.player });
        const bombs = new Bombs(map);
        viruses.init(map, level.virus);
        pathfinder.setDataFromMap(map, 'main');
        users.init(map);
        servers.init(map, level.servers);
        this.loop = createLoop({ map, player: this.player, bombs });
        pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => users.updateOnlineStatus());
        initScoreBoard(this.scoreBoard);

        map.render();
        users.render();
        servers.render();
        bombs.render();
        this.player.render();
    }

    startLevel() {
        this.loop.start();
        viruses.startSpawning();
        setTimeout(() => this.player.enableControls(), 500);
    }
}

export default new GameManager();
