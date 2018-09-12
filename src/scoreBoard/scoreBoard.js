import { users } from '../user/index.js';
import { pubsub, SCORE, INFECTED } from '../pubsub/index.js';

const LSKEY = 'KATAMOV';
class ScoreBoard {
    constructor() {
        this.div = document.createElement('div');
        this.div.setAttribute('id', 'scb');
        const wrapper = document.getElementById('wrapper');
        wrapper.appendChild(this.div);
        this.score = 0;
        this.highScore = localStorage.getItem(LSKEY) || 0;
        pubsub.subscribe(SCORE, points => this.winPoints(points), true);
        pubsub.subscribe(INFECTED, () => this.render());
    }

    startGame() {
        this.score = 0;
        this.render();
    }

    /* called at the beginning of every level */
    initLevel() {
        this.render();
    }

    winPoints(points) {
        this.score += points;
        this.highScore = Math.max(this.score, this.highScore);
        localStorage.setItem(LSKEY, this.highScore);
        this.render();
    }
    render() {
        const { infected, online, offline } = users.getStats();
        this.div.innerHTML =
            `${online} online |  ` +
            `${offline} offline | ` +
            `${infected} infected | ` +
            `Score: ${this.score} | ` +
            `Highscore: ${this.highScore}`;
    }
}

export default new ScoreBoard();
