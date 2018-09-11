export default () => {
    const scoreBoard = document.createElement('div');
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(scoreBoard);

    addCss(scoreBoard);
    return scoreBoard;
};

function addCss(element) {
    element.style.cssText = `
background-color: rgba(0,0,0,0);
font-size: 1.5em;
color: rgba(255,255,255,1);
pointer-events: none;
text-transform: uppercase;
font-family: monospace;
width: 800px;
    `;
    return element;
}
