import { canvasHeight, canvasWidth, lightBlue } from '../config';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.cssText = `
        border: 4px solid ${lightBlue};
    `;
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(canvas);
};
