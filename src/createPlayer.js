/* global kontra */
import { canvasHeight, canvasWidth, lightGreen, darkGreen } from './config';

export default () =>
    kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        width: 6, // we'll use this later for collision detection
        render() {
            this.context.lineWidth = 3;
            this.context.strokeStyle = lightGreen;
            this.context.fillStyle = darkGreen;
            this.context.beginPath();
            // draw a triangle
            this.context.moveTo(this.x - 15, this.y + 25);
            this.context.lineTo(this.x, this.y - 25);
            this.context.lineTo(this.x + 15, this.y + 25);

            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        }
    });
