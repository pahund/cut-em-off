import { pubsub, USERS_POSSIBLY_OFFLINE, INFECTED, GAME_OVER } from '../pubsub/index.js';
import { users } from '../user/index.js';

export default function initScoreBoard(scoreBoard) {
    updateScoreBoard(scoreBoard);
    pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard), 0);
    });
    pubsub.subscribe(INFECTED, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard), 0);
    });
    pubsub.subscribe(GAME_OVER, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard), 0);
    });
}

function updateScoreBoard(scoreBoard) {
    const { gameOver } = users;
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
