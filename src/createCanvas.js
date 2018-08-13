import { canvasHeight, canvasWidth } from './config';

export default () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(canvas);
};
