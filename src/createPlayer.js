/* global kontra */
import { canvasHeight, canvasWidth, lightGreen, darkGreen, startDirection } from './config';
import calculateRotation from './calculateRotation';

export default () =>
    kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        direction: startDirection,
        render() {
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.rotate(calculateRotation(this.direction));
            this.context.lineWidth = 3;
            this.context.strokeStyle = lightGreen;
            this.context.fillStyle = darkGreen;
            this.context.beginPath();
            this.context.moveTo(-15, 25);
            this.context.lineTo(0, -25);
            this.context.lineTo(15, 25);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.restore();
        }
    });
