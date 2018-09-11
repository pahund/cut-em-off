/* global kontra */

import { initAudio } from '../audio/index.js';
import { Bombs } from '../bomb/index.js';
import { createLoop } from '../loop/index.js';
import { createMap } from '../map/index.js';
import { createPlayer } from '../player/index.js';
import { Users } from '../user/index.js';
import { createVirus } from '../virus/index.js';
import { createCanvas } from '../canvas/index.js';
import { initPathfinder } from '../pathfinder/index.js';
import { pubsub, USERS_POSSIBLY_OFFLINE } from '../pubsub/index.js';
import { messageBox } from '../messageBox/index.js';
import { lightGreen, lightBlue } from '../config.js';

class GameManager {
    async init() {
        createCanvas();
        kontra.init();
        const map = await createMap();
        initPathfinder(map);
        this.player = createPlayer(map);
        const virus = createVirus(map);
        const bombs = new Bombs(map);
        const users = new Users(map);
        pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => users.updateOnlineStatus(virus));
        this.loop = createLoop({ map, player: this.player, virus, users, bombs });
        initAudio();
        map.render();
        users.render();
        bombs.render();
        this.player.render();
        virus.render();
    }

    showStartScreen() {
        messageBox.show(`
            welcome, <span style="color:${lightGreen}; font-size: 150%">captain katamov!</span><br><br>
            Your shift as chief network security officers is about to begin… all users are online and happy. 
            in case of virus intrusion, <span style="color: ${lightGreen}">cut them off</span> from the network
            to make sure they don't get infected!<br><br>
            <table style="font-size: 75%; text-align: left; margin-left: auto; margin-right: auto">
                <tr>
                    <td><span style="color: ${lightGreen}">arrow keys</span></td>
                    <td>…</td><td>change direction</td>
                </tr><tr>
                    <td><span style="color: ${lightGreen}">space bar</span></td>
                    <td>…</td><td>drop bomb</td>
                </tr><tr>
                    <td><span style="color: ${lightGreen}">return</span></td>
                    <td>…</td><td>teleport to server</td>
                </tr>
            </table>
            <br>
            press any key to begin!
        `);
        document.addEventListener(
            'keydown',
            () => {
                messageBox.clear();
                this.startLevel();
                setTimeout(() => this.player.enableControls(), 500);
            },
            { once: true }
        );
    }

    startLevel() {
        this.loop.start();
    }
}

export default new GameManager();
