import { pubsub, USERS_POSSIBLY_OFFLINE, INFECTED, GAME_OVER, LEVEL_COMPLETED } from '../pubsub/index.js';
import { users } from '../user/index.js';

export default function initScoreBoard(scoreBoard) {
    updateScoreBoard(scoreBoard);
    // permanent subscriptions OK here
    pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => updateScoreBoard(scoreBoard), true);
    pubsub.subscribe(INFECTED, () => updateScoreBoard(scoreBoard), true);
    pubsub.subscribe(GAME_OVER, () => updateScoreBoard(scoreBoard, true), true);
    pubsub.subscribe(LEVEL_COMPLETED, () => updateScoreBoard(scoreBoard), true);
}

function updateScoreBoard(scoreBoard, gameOver = false) {
    const { infected, online, offline } = users.getStats();

    const score = calculateScore({ infected, online, offline });

    let highScore = localStorage.getItem('CUT_EM_ALL__HIGHSCORE') || 0;

    if (gameOver) {
        highScore = Math.max(score, highScore);
        localStorage.setItem('CUT_EM_ALL__HIGHSCORE', highScore);
    }

    // eslint-disable-next-line no-param-reassign
    scoreBoard.innerHTML = `
        ${online} online |  
        ${offline} offline | 
        ${infected} infected | 
        Score: ${score} | 
        Highscore: ${highScore}
    `;
}

export function calculateScore({ infected, online, offline }) {
    return offline * 100 + (online === 0 && infected === 0 ? 300 : 0);
}
