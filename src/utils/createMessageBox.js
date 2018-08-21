import { canvasHeight, canvasWidth } from '../config';

export default () => {
    const messageBox = document.createElement('div');
    messageBox.width = canvasWidth;
    messageBox.height = canvasHeight;
    messageBox.style.cssText = `
        background-color: rgba(0,0,0,0);
        font-size: 3em;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        display: flex;
        color: rgba(255,255,255,0);
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: 3s;
        pointer-events: none;
        transition: background-color 3s ease-out, color 3s ease-out;
        text-transform: uppercase;
        font-family: monospace;
    `;
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(messageBox);
    return {
        show(message) {
            messageBox.innerHTML = `<div>${message}</div>`;
            messageBox.style.backgroundColor = 'rgba(0,0,0,0.5)';
            messageBox.style.color = 'rgba(255,255,255,1)';
        }
    };
};
