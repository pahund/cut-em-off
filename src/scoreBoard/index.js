import createScoreBoard from './createScoreBoard.js';
import { pubsub, USERS_POSSIBLY_OFFLINE, INFECTED, GAME_OVER } from '../pubsub/index.js';

export default function initScoreBoard(props) {
    const scoreBoard = createScoreBoard();
    updateScoreBoard(scoreBoard, props.users);
    pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard, props.users), 0);
    });
    pubsub.subscribe(INFECTED, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard, props.users), 0);
    });
    pubsub.subscribe(GAME_OVER, () => {
        // using setTimeout here because users are updated too late :(
        setTimeout(() => updateScoreBoard(scoreBoard, props.users), 0);
    });
}

function updateScoreBoard(scoreBoard, users) {
    const { gameOver } = users;
    const { infected, online, offline } = users.getStats();

    const score = calculateScore({ infected, online, offline });

    let highScore = localStorage.getItem('CUT_EM_ALL__HIGHSCORE') || 0;

    if (gameOver) {
        highScore = Math.max(score, highScore);
        localStorage.setItem('CUT_EM_ALL__HIGHSCORE', highScore);
    }

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
