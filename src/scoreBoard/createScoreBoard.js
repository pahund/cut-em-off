export default () => {
    const scoreBoard = document.createElement('div');
    scoreBoard.innerHTML = 'SCORE BOARD';
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(scoreBoard);

    return scoreBoard;
};
