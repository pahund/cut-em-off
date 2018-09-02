let timeoutHandler = null;
export default () => {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
background-color: rgba(0,0,0,0);
font-size: 3em;
font-weight: bold;
align-items: center;
justify-content: center;
display: flex;
color: rgba(255,255,255,0);
position: absolute;
top: 0;
left:0;
width: 100vw;
height: 100vh;
text-align: center;
pointer-events: none;
transition: background-color 3s ease-out, color 3s ease-out;
text-transform: uppercase;
font-family: monospace;
    `;
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(messageBox);
    return {
        show(message) {
            clearTimeout(timeoutHandler);
            messageBox.style.transition = '3s';
            messageBox.innerHTML = `<div>${message}</div>`;
            messageBox.style.backgroundColor = 'rgba(0,0,0,0.5)';
            messageBox.style.color = 'rgba(255,255,255,1)';
        },
        flash(message) {
            clearTimeout(timeoutHandler);
            messageBox.style.transition = '0.5s';
            messageBox.innerHTML = `<div>${message}</div>`;
            messageBox.style.color = 'rgba(255,255,255,1)';
            timeoutHandler = setTimeout(() => {
                messageBox.style.color = 'rgba(255,255,255,0)';
            }, 500);
        }
    };
};
