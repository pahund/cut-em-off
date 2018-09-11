export default () => {
    const scoreBoard = document.createElement('div');
    scoreBoard.setAttribute('id', 'scb');
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(scoreBoard);
    return scoreBoard;
};
