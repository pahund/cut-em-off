import createScoreBoard from './createScoreBoard.js';
import { pubsub, USERS_POSSIBLY_OFFLINE, INFECTED } from '../pubsub/index.js';

export default function initScoreBoard(props) {
    const scoreBoard = createScoreBoard();
    renderScoreBoard(scoreBoard, props.users);
    pubsub.subscribe(USERS_POSSIBLY_OFFLINE, () => {
        setTimeout(() => renderScoreBoard(scoreBoard, props.users), 0);
    });
    pubsub.subscribe(INFECTED, () => {
        setTimeout(() => renderScoreBoard(scoreBoard, props.users), 0);
    });
}

function renderScoreBoard(scoreBoard, users) {
    const { infected, online, offline } = users.getStats();

    scoreBoard.innerHTML = `${online} online |  ${offline} offline | ${infected} infected`;
}

/*
 * TODO
 *
 * ☐ score points for events
 * ☐ listen to blast virus event
 * ☐ save highscore
 * ☐ display highscore
 * ☐ display score on game over
 *
 */
