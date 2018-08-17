/* global kontra */
import { startDirection, lightRed, darkRed } from './config';
import ri from './getRandomInt';

export default () =>
    kontra.sprite({
        x: 100,
        y: 100,
        direction: startDirection,
        render() {
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.lineWidth = 3;
            this.context.strokeStyle = lightRed;
            this.context.fillStyle = darkRed;
            this.context.beginPath();
            this.context.moveTo(ri(-5, 5), ri(-5, -25)); // 1
            this.context.lineTo(ri(5, 50), ri(-5, -50)); // 2
            this.context.lineTo(ri(5, 25), ri(-5, 5)); // 3
            this.context.lineTo(ri(5, 50), ri(5, 50)); // 4
            this.context.lineTo(ri(-5, 5), ri(5, 25)); // 5
            this.context.lineTo(ri(-5, -50), ri(5, 50)); // 6
            this.context.lineTo(ri(-5, -25), ri(-5, 5)); // 7
            this.context.lineTo(ri(-5, -50), ri(-5, -50)); // 8
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.restore();
        }
    });